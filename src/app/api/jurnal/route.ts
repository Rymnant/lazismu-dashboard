import { Jurnal, JurnalData } from "./database";

export async function GET(
    request: Request,
) {
    await Jurnal.sync();

    const data = await Jurnal.findAll({
        include: [{
            model: JurnalData
        }]
    });

    return new Response(JSON.stringify({
        data
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}