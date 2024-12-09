import { Jurnal, JurnalData } from "@/db/db";

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
    await JurnalData.sync();

    let sql_res = await JurnalData.findAll();
    let actual_data = [];

    for (let i = 0; i < sql_res.length; i++) {
        let row = sql_res[i].get() as JurnalDataRow;

        let data = {
            id: row.id,
            name: row.nama,
            phoneNumber: row.no_hp,
            gender: 'Unknown',
            age: 0,
            occupation: 'Unknown',
            donationType: row.zis,
            donorType: row.via,
            status: 'Aktif',
            year: 2022
        }

        actual_data.push(data);
    }

    return new Response(JSON.stringify({
        status: 'success',
        data: actual_data
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}