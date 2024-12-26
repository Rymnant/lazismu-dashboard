/**
 * Author: TODO
 * Commnet:
 */

export type KeyValue = {
    [key: string]: any;
}

export class DonationClassifier {
    preprocess_data(input: KeyValue[]) {
        const column_must_not_null = ['nama', 'zis', 'nominal', 'tanggal'];
        let data = [];
        for (let i = 0; i < input.length; i++) {
            let row = input[i];
            let is_valid = true;

            for (let j = 0; j < column_must_not_null.length; j++) {
                let field = column_must_not_null[j];
                if (!Object.keys(row).includes(field)) {
                    is_valid = false;
                    break;
                }
            }

            if (is_valid) {
                data.push(row);
            }
        }

        // drop duplicate data
        let unique_data = [];
        let unique_data_map: { [key: string]: boolean } = {};
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            let key = row['nama'] + row['zis'] + row['nominal'] + row['tanggal'];
            if (!unique_data_map[key]) {
                unique_data.push(row);
                unique_data_map[key] = true;
            }
        }

        // add new kategori where zis == 'zakat' else 'infaq'
        for (let i = 0; i < unique_data.length; i++) {
            let row = unique_data[i];
            if (row['zis'] == 'Zakat') {
                row['kategori'] = 'Zakat';
            } else {
                row['kategori'] = 'Infaq';
            }
        }

        return unique_data;
    }

    kategori_muzaki(row: KeyValue): string {
        if (row['kategori'] === 'Zakat') {
            return row['nominal'] >= 1000000 ? 'Besar' : 'Kecil';
        } else if (row['kategori'] === 'Infaq') {
            return row['nominal'] >= 500000 ? 'Besar' : 'Kecil';
        }
        else {
            return 'Tidak Diketahui';
        }
    }

    classify_frequency(data: KeyValue[]): KeyValue[] {
        data.forEach(row => {
            row['c2'] = 'Jarang';
            const date = new Date(row['tanggal']);
            row['month'] = date.getMonth() + 1;
            row['year'] = date.getFullYear();
        });

        const donation_counts: { [key: string]: number } = {};
        data.forEach(row => {
            const key = `${row['nama']}-${row['kategori']}-${row['month']}-${row['year']}`;
            if (!donation_counts[key]) {
                donation_counts[key] = 0;
            }
            donation_counts[key]++;
        });

        data.forEach(row => {
            const key = `${row['nama']}-${row['kategori']}-${row['month']}-${row['year']}`;
            row['count'] = donation_counts[key];
        });

        data.forEach(row => {
            if (row['kategori'] === 'Infaq' && row['count'] >= 3) {
                row['c2'] = 'Sering';
            }
        });

        const yearly_counts: { [key: string]: number } = {};
        data.forEach(row => {
            const key = `${row['nama']}-${row['kategori']}-${row['year']}`;
            if (!yearly_counts[key]) {
                yearly_counts[key] = 0;
            }
            yearly_counts[key]++;
        });

        data.forEach(row => {
            const key = `${row['nama']}-${row['kategori']}-${row['year']}`;
            row['yearlyCount'] = yearly_counts[key];
        });

        data.forEach(row => {
            row['c1'] = this.kategori_muzaki(row);

            if (row['kategori'] === 'Zakat' && row['yearlyCount'] >= 3) {
                row['c2'] = 'Sering';
            }

            row['jenis_donatur'] = row['c1'] + ' ' + row['c2'];
        });

        return data;
    }

    classify(data: KeyValue[]): KeyValue[] {
        data = this.preprocess_data(data);
        console.log(data)
        data = this.classify_frequency(data);

        return data;
    }
}