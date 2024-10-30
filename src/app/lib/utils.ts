import { Muzakki } from './types'

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