import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { IoCheckmarkOutline, IoCloseOutline, IoCreateOutline } from 'react-icons/io5'
import { AppContext } from 'src/contexts/app.context'
import InputFile from '../InputFile'
import { toast } from 'react-toastify'
import mediaApi from 'src/apis/media.api'
import userApi from 'src/apis/user.api'

interface AvatarProps {
  isLarge?: boolean
  hasBorder?: boolean
  url?: string
  isMyProfile?: boolean
  edit?: boolean
}

const defaultAvatar =
  'https://img.freepik.com/premium-vector/art-illustration_890735-11.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705363200&semt=ais'

export default function Avatar({ isLarge, hasBorder, url, isMyProfile, edit }: AvatarProps) {
  const { profile, setProfile } = useContext(AppContext)
  const [fileTmp, setFileTmp] = useState<File>()
  const [urlImage, setUrlImage] = useState('')

  const toastId = useRef(null)

  const handleChangeFile = (file?: File) => {
    setFileTmp(file)
  }

  const previewFile = useMemo(() => {
    return fileTmp ? URL.createObjectURL(fileTmp) : ''
  }, [fileTmp])

  const handleUploadImg = async () => {
    const fd = new FormData()
    fd.append('image', fileTmp as File) //key, value
    ;(toastId.current as any) = toast.loading('Avatar uploading...')
    mediaApi
      .uploadImg(fd)
      .then((res) => {
        toast.update(toastId.current as any, {
          type: 'success',
          autoClose: 1000,
          isLoading: false
        })
        setUrlImage(res.data.result[0].url)
      })
      .catch((err) => {
        toast.update(toastId.current as any, {
          render: 'Upload image fail',
          type: 'error',
          autoClose: 1000,
          isLoading: false
        })
      })
  }

  const updateAvatar = () => {
    userApi
      .updateUserProfile({ avatar: urlImage })
      .then((res) => {
        setFileTmp(undefined)
        setUrlImage('')
        setProfile(res.data.result)
        localStorage.setItem('profile', JSON.stringify(res.data.result))
        toast.success('Update avatar success', {
          autoClose: 2000
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (urlImage && urlImage !== '') {
      updateAvatar()
    }
  }, [urlImage])

  return (
    <>
      <div
        className={`
        ${hasBorder ? 'boder-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full
        transition
        flex-shrink-0
        relative
      `}
      >
        <div className='w-full pt-[100%] relative'>
          {isMyProfile ? (
            <img
              src={fileTmp ? previewFile : profile?.avatar || defaultAvatar}
              alt='Avatar'
              className='block object-cover rounded-full h-full w-full absolute top-0 left-0 border-2 cursor-pointer'
            />
          ) : (
            <img
              src={url || defaultAvatar}
              alt='Avatar'
              className='block object-cover rounded-full h-full w-full absolute top-0 left-0 border-2 cursor-pointer'
            />
          )}
          {edit && (
            <button
              className='absolute -bottom-4 left-0 right-0 m-auto w-fit rounded-full bg-gray-50 border cursor-pointer'
              title='Change avatar'
            >
              <div className='hover:opacity-90'>
                <InputFile isImageFile onChange={handleChangeFile as any} Icon={IoCreateOutline} iconSize={20} />
              </div>
            </button>
          )}
          {fileTmp && (
            <div className='absolute left-36 -bottom-3 m-auto w-fit'>
              <div className='flex justify-center items-center gap-4'>
                <button
                  className='flex hover:opacity-80 border bg-green-100 rounded-full p-1.5 cursor-pointer'
                  title='Update'
                  onClick={handleUploadImg}
                >
                  <IoCheckmarkOutline color='#22C55E' size={20} />
                </button>
                <button
                  className='flex hover:opacity-80 border bg-red-100 rounded-full p-1.5 cursor-pointer'
                  title='Cancel'
                  onClick={() => {
                    setFileTmp(undefined)
                  }}
                >
                  <IoCloseOutline color='#EF4444' size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
