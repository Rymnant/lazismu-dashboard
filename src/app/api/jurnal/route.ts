import { Database, Jurnal, JurnalData } from "@/db/db";
import exceljs from 'exceljs';
import { DonationClassifier, KeyValue } from "./classifikasi";

/*eslint-disable*/

type JurnalRow = {
    id: number,
    name: string
}

export async function GET(
    request: Request,
) {
    await Jurnal.sync();

    const params_id = new URL(request.url).searchParams.get('id');
    let res_jurnal: JurnalRow | JurnalRow[] | null = null;

    if (params_id) {
        const data = await Jurnal.findAll({
            where: {
                id: params_id
            },
            include: [JurnalData]
        });

        if (data.length == 0) {
            res_jurnal = null;
        } else {
            res_jurnal = data[0].get();
        }
    }
    else {
        res_jurnal = await Jurnal.findAll() as any as JurnalRow[];
    }

    if (res_jurnal == null) {
        return new Response(JSON.stringify({
            status: 'error',
            message: 'Data not found'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify({
        status: 'success',
        data: res_jurnal
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const { attachment_name, attachment_base64 } = body;

    // convert base64 to buffer
    let buffer = Buffer.from(attachment_base64, 'base64') as any as ArrayBuffer;
    let exceldata
    try {
        exceldata = new exceljs.Workbook();
        await exceldata.xlsx.load(buffer);
    } catch (error) {
        return new Response(JSON.stringify({
            status: 'error',
            message: 'Invalid excel file'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    if (exceldata.worksheets.length == 0) {
        return new Response(JSON.stringify({
            status: 'error',
            message: 'No worksheet found'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        let res_jurnal = await Jurnal.create({
            'name': attachment_name
        }) as any as JurnalRow;

        let worksheet = exceldata.worksheets[0];
        let data = worksheet.getSheetValues();

        const expected_headers = ['tanggal', 'tahun', 'zis', 'via', 'sumber dana', 'nama', 'donasi', 'no'];
        let is_header_missing = false;
        let missing_headers: string[] = [];

        let header = data[1] as string[];
        let header_index: { [key: string]: number } = {};

        // Normalize and map header positions
        for (let i = 1; i <= header.length; i++) {
            let header_name = header[i];
            if (header_name == undefined) {
                continue;
            }

            header_name = header_name.toLowerCase().trim();
            header_index[header_name] = i;
        }

        // Check for missing headers
        for (let expected_header of expected_headers) {
            if (!(expected_header in header_index)) {
                is_header_missing = true;
                missing_headers.push(expected_header);
            }
        }

        if (is_header_missing) {
            return new Response(JSON.stringify({
                status: 'error',
                message: 'Invalid excel header, missing: ' + missing_headers.join(', ')
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        let row_data: KeyValue[] = [];
        for (let i = 2; i < data.length; i++) {
            let data_iter = data[i] as string[];

            let tahun = parseInt(data_iter[header_index['tahun']]);
            let nominal = parseInt(data_iter[header_index['donasi']]);

            let row: KeyValue = {
                ['nama']: data_iter[header_index['nama']].trim(),
                ['no_hp']: data_iter[header_index['no']],
                ['tanggal']: data_iter[header_index['tanggal']],
                ['tahun']: tahun,
                ['zis']: data_iter[header_index['zis']].trim(),
                ['via']: data_iter[header_index['via']].trim(),
                ['sumber_dana']: data_iter[header_index['sumber dana']].trim(),
                ['nominal']: nominal
            };

            row_data.push(row)
        }

        let classifier = new DonationClassifier();
        let classified_data = classifier.classify(row_data);

        console.log(classified_data);

        // Insert to database
        for (let i = 0; i < classified_data.length; i++) {
            let row = classified_data[i];
            await JurnalData.create({
                jurnal_id: res_jurnal.id,
                nama: row['nama'],
                no_hp: row['no_hp'],
                tanggal: row['tanggal'],
                tahun: row['tahun'],
                zis: row['zis'],
                via: row['via'],
                sumber_dana: row['sumber_dana'],
                nominal: row['nominal'],
                jenis_donatur: row['jenis_donatur']
            });
        }

        return new Response(JSON.stringify({
            status: 'success',
            data: {
                id: res_jurnal.id,
            }
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({
            status: 'error',
            message: 'Failed to upload data'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function DELETE(
    request: Request,
) {
    const params_id = new URL(request.url).searchParams.get('id');
    if (!params_id) {
        return new Response(JSON.stringify({
            status: 'error',
            message: 'Invalid parameter'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        let is_exist = await Jurnal.findOne({
            where: {
                id: params_id
            }
        });

        if (!is_exist) {
            return new Response(JSON.stringify({
                status: 'error',
                message: 'Data not found'
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // delete jurnal, but wtih jurnaldata too
        await Jurnal.destroy({
            where: {
                id: params_id
            }
        });

        await JurnalData.destroy({
            where: {
                jurnal_id: params_id
            }
        });

        return new Response(JSON.stringify({
            status: 'success',
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error)

        return new Response(JSON.stringify({
            status: 'error',
            message: 'Failed to delete data'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}