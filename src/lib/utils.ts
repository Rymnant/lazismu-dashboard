import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Muzakki, JournalEntry } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Muzakki

export const filterMuzakki = (muzakkiData: Muzakki[], searchTerm: string): Muzakki[] => {
  return muzakkiData.filter(muzakki =>
    muzakki.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    muzakki.phoneNumber.includes(searchTerm)
  )
}

export const paginateMuzakki = (muzakkiData: Muzakki[], currentPage: number, itemsPerPage: number): Muzakki[] => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return muzakkiData.slice(startIndex, endIndex)
}

// Journal

export const filterJournalEntries = (journalEntries: JournalEntry[], searchTerm: string): JournalEntry[] => {
  return journalEntries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.month.toString().includes(searchTerm) ||
    entry.year.toString().includes(searchTerm)
  )
}

export const paginateJournalEntries = (journalEntries: JournalEntry[], currentPage: number, itemsPerPage: number): JournalEntry[] => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return journalEntries.slice(startIndex, endIndex)
}