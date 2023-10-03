import React, { useState } from 'react'
import { useAppContext } from '../../AppContext'
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/solid'

import nitro from '../../functions/nitro'
import u from '../../functions/utils'

import SubmitButton from '../common/SubmitButton'

function ConfirmComponent() {
  const { addToast, setError, setLoading, utr, setUtr, channel, setPage } = useAppContext()

  const [dragging, setDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const isValidFile = (file) => {
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      addToast('error', 'File type not supported', 2000)
      return false
    }

    const maxFileSize = 10 * 1024 * 1024

    if (file.size > maxFileSize) {
      addToast('error', 'File size is too large', 2000)
      return false
    }
    return true
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const [file] = event.dataTransfer.files
    if (file && isValidFile(file)) setSelectedFile(file)
    setDragging(false)
  }

  const handleFileSelect = (event) => {
    const [file] = event.target.files
    if (file && isValidFile(file)) setSelectedFile(file)
  }

  const handleFileClear = () => {
    setSelectedFile(null)
  }

  const submitUpload = async () => {
    try {
      if (!selectedFile) return { file_uploaded: true }

      let { upload_url } = await nitro.getUploadUrl({ setError, setLoading })

      if (!u.isNonEmptyString(upload_url)) throw Error('invalid url')

      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch(upload_url, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw Error('file submission response not ok')

      await u.wait(4000)
      return { file_uploaded: true }
    } catch (error) {
      console.error('There was an error uploading the file', error)
      return {}
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!u.isNonEmptyString(utr)) {
        addToast('error', 'Invalid UTR', 2000)
        return
      }

      setLoading(true)

      const [submission, { file_uploaded }] = await Promise.all([
        nitro.submitUtr({ setError, setLoading }, { channel_id: channel.channel_id, utr_number: utr }),
        submitUpload()
      ])

      if (file_uploaded !== true) {
        addToast('error', 'Error uploading file', 3000)
        return
      }

      if (!u.isNonEmptyString(submission?.status)) {
        addToast('error', 'Something went wrong', 3000)
        return
      }

      setPage('done')
    } catch (error) {
      console.log('error with handle submit', error)
      addToast('error', 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col items-center p-4 pt-0 w-full max-w-lg mx-auto">
      <div className="w-full">
        <label htmlFor="price" className="block text-sm mb-2 font-semibold leading-6 text-gray-900">
          UTR Number *
        </label>
        <div className="relative mt-2 rounded-md shadow-sm pb-[24px]">
          <input
            type="text"
            className="w-full rounded-md border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blu sm:leading-6"
            placeholder="Enter UTR"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full text-left">
        <label className="block text-sm mb-2 font-semibold leading-6 text-gray-900">Upload Proof (optional)</label>
      </div>
      <div className="col-span-full w-full">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative mt-1 flex justify-center rounded-lg px-6 py-10 sm:px-20 ${
            dragging ? 'border-blu border-2' : 'border border-dashed border-gray-900/25'
          } cursor-default`} // Ensure the cursor is pointer
        >
          <div className="text-center z-10">
            {selectedFile ? (
              <div className="flex items-center">
                <XCircleIcon
                  className="h-5 w-5 text-red-800 cursor-pointer"
                  onClick={handleFileClear}
                  aria-hidden="true"
                />
                <span className="ml-2 text-gray-600">{selectedFile.name}</span>
              </div>
            ) : (
              <>
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blu focus-within:outline-none focus-within:ring-offset-2 hover:text-blu"
                  >
                    <span className="bg-transparent">Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileSelect}
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP up to 10MB</p>
              </>
            )}
          </div>

          {/* <div className="absolute inset-0" onClick={selectedFile ? handleFileClear : () => {}}></div> */}
        </div>
      </div>
      <SubmitButton onClick={handleSubmit} />
    </div>
  )
}

export default ConfirmComponent
