import React, { useRef } from 'react'
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
  isImageFile?: boolean
  isVideoFile?: boolean
}

export default function InputFile({ onChange, isImageFile, isVideoFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0] // Lấy ảnh
    console.log(fileFromLocal)

    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadImage || !fileFromLocal.type.includes('image'))) {
      toast.error('File không đúng định dạng quy định', {
        autoClose: 1000,
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        onChange={onFileChange}
        onClick={(e) => ((e.target as any).value = null)}
        ref={fileInputRef}
      />
      <button
        onClick={handleUpload}
        type='button'
        className='p-2 mx-1 rounded-lg hover:cursor-pointer hover:bg-slate-100'
      >
        {isImageFile && <IoImageOutline size={20} />}
        {isVideoFile && <IoVideocamOutline size={20} />}
      </button>
    </>
  )
}
