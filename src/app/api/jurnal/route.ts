import { Jurnal, JurnalData } from "@/db/db";
import exceljs from 'exceljs';

/*eslint-disable*/

type JurnalRow = {
    id: number,
    name: string
}

type JurnalDataRow = {
    id: number,
    nama: string,
    no_hp: string,
    zis: string,
    via: string
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

        const expected_header = ['no', 'tanggal', 'tahun', 'zis', 'via', 'sumber dana', 'nama', 'nominal', 'no_hp'];
        let is_header_missing = false;

        let header = data[1] as string[];
        for (let i = 0; i < header.length; i++) {
            header[i] = header[i].toLowerCase();

            if (header[i] != expected_header[i]) {
                is_header_missing = true;
                break;
            }
        }

        if (is_header_missing) {
            return new Response(JSON.stringify({
                status: 'error',
                message: 'Invalid excel header'
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        let header_index: { [key: string]: number } = {};
        for (let i = 0; i < header.length; i++) {
            let header_name = header[i].toLowerCase();
            if (expected_header.includes(header_name)) {
                header_index[header_name] = i;
            }
        }

        for (let i = 2; i < data.length; i++) {
            let data_iter = data[i] as string[];

            await JurnalData.create({
                jurnal_id: res_jurnal.id,
                tanggal: data_iter[header_index['tanggal']],
                tahun: data_iter[header_index['tahun']],
                zis: data_iter[header_index['zis']],
                via: data_iter[header_index['via']],
                sumber_dana: data_iter[header_index['sumber dana']],
                nama: data_iter[header_index['nama']],
                nominal: data_iter[header_index['nominal']],
                no_hp: data_iter[header_index['no_hp']]
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
        return new Response(JSON.stringify({
            status: 'error',
            message: 'Failed to delete data'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}