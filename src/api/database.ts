export async function getMuzakki() {
    try {
        // Ganti nek wes di deploy
        const res = await fetch('http://192.168.1.16:500/api/muzzaki');
        if (!res.ok) throw new Error('Failed to fetch muzzaki data');
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getJurnal() {
    try {
        // Ganti nek wes di deploy
        const res = await fetch('http://192.168.1.16:500/api/jurnal');
        if (!res.ok) throw new Error('Failed to fetch jurnal data');
        const data = await res.json();
        return data.data;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}