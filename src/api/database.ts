export default async function getMuzzaki()
{
    try {
        console.log('1')
        const res = await fetch('http://192.168.1.3:3000/api/muzzaki');
        console.log('2')
        if (!res.ok) {
            throw new Error('Failed to fetch muzzaki data');
        }

        console.log('3')
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}