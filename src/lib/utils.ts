import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Muzakki, JournalEntry } from './types'
import { useMemo } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generic filter function
export const filterData = <T>(data: T[], searchTerm: string, keys: (keyof T)[]): T[] => {
  return data.filter(item =>
    keys.some(key => item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  )
}

// Generic paginate function
export const paginateData = <T>(data: T[], currentPage: number, itemsPerPage: number): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return data.slice(startIndex, endIndex)
}

// Specific filter and paginate functions for Muzakki
export const filterMuzakki = (muzakkiData: Muzakki[], searchTerm: string): Muzakki[] => {
  return filterData(muzakkiData, searchTerm, ['name', 'phoneNumber'])
}

export const paginateMuzakki = (muzakkiData: Muzakki[], currentPage: number, itemsPerPage: number): Muzakki[] => {
  return paginateData(muzakkiData, currentPage, itemsPerPage)
}

// Specific filter and paginate functions for JournalEntry
export const filterJournalEntries = (journalEntries: JournalEntry[], searchTerm: string): JournalEntry[] => {
  return filterData(journalEntries, searchTerm, ['name'])
}

export const paginateJournalEntries = (journalEntries: JournalEntry[], currentPage: number, itemsPerPage: number): JournalEntry[] => {
  return paginateData(journalEntries, currentPage, itemsPerPage)
}

export function useFilteredEntries(entries: JournalEntry[], searchTerm: string, selectedYear: number | null, selectedMonth: number | null) {
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