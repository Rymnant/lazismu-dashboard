'use client'

import React, { useState } from 'react'
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

type FileUploadModalProps = {
  onClose: () => void
}

export default function FileUploadModal({ onClose }: FileUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      // Here you would handle the file import logic
      console.log('Importing file:', selectedFile.name)
      onClose()
    }
  }

  const handleCancelFileSelection = () => {
    setSelectedFile(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4" style={{ color: 'black' }}>
          <h2 className="text-xl font-semibold">Upload File</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4">
          <div className="mt-1 flex justify-between items-center">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-gray-500 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
            >
              <span className="flex items-center space-x-4 mb-4 mt-4">
                <ArrowUpTrayIcon className="h-6 w-6" />
                <p>{selectedFile ? selectedFile.name : 'Pilih file'}</p>
              </span>
            </label>
            {selectedFile && (
              <button
                type="button"
                onClick={handleCancelFileSelection}
                className="ml-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleImport}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}