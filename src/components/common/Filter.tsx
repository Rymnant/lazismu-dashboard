import { useMemo } from 'react';

export function useFilteredEntries(entries, searchTerm, selectedYear, selectedMonth) {
  return useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase());
      const entryYear = entry.name.match(/\d{4}/)?.[0];
      const entryMonth = new Date(entry.name).getMonth() + 1;
      const matchesYear = selectedYear ? entryYear === String(selectedYear) : true;
      const matchesMonth = selectedMonth ? entryMonth === selectedMonth : true;
      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [entries, searchTerm, selectedYear, selectedMonth]);
}