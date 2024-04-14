import React, { useRef } from 'react'
import { IconType } from 'react-icons'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
  isImageFile?: boolean
  isVideoFile?: boolean
  Icon: IconType
  iconSize?: number
}

export default function InputFile({ onChange, isImageFile, isVideoFile, Icon, iconSize }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0] // Lấy ảnh
    console.log(fileFromLocal)

    if (
      isImageFile &&
      fileFromLocal &&
      (fileFromLocal.size >= config.maxSizeUploadImage || !fileFromLocal.type.includes('image'))
    ) {
      toast.error('The image file is malformed or too large(size < 300kb)', {
        autoClose: 1000,
        position: 'top-center'
      })
    } else if (
      isVideoFile &&
      fileFromLocal &&
      (fileFromLocal.size >= config.maxSizeUploadVideo || !fileFromLocal.type.includes('video'))
    ) {
      toast.error('The video file is malformed or too large(size < 50MB)', {
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
        accept={isImageFile ? '.jpg,.jpeg,.png' : '.mp4'}
        className='hidden'
        onChange={onFileChange}
        onClick={(e) => ((e.target as any).value = null)}
        ref={fileInputRef}
      />
      <button onClick={handleUpload} type='button' className='p-2 rounded-full hover:cursor-pointer hover:bg-slate-100'>
        {Boolean(Icon) && <Icon size={iconSize || 20} />}
      </button>
    </>
  )
}
