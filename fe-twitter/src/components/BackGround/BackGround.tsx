import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Avatar from '../Avatar'
import { AppContext } from 'src/contexts/app.context'
import { useLocation } from 'react-router-dom'
import InputFile from '../InputFile'
import { IoCheckmarkOutline, IoCloseOutline, IoCreateOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import mediaApi from 'src/apis/media.api'

export default function BackGround({ data, edit }: any) {
  const { profile, setProfile } = useContext(AppContext)

  const [fileTmp, setFileTmp] = useState<File>()
  const [urlImage, setUrlImage] = useState('')

  const location = useLocation()
  const isMyProfilePage = location.pathname === '/profile'

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
    ;(toastId.current as any) = toast.loading('Background uploading...')
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
      .updateUserProfile({ cover_photo: urlImage })
      .then((res) => {
        setFileTmp(undefined)
        setUrlImage('')
        setProfile(res.data.result)
        localStorage.setItem('profile', JSON.stringify(res.data.result))
        toast.success('Update background success', {
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
    <div className='relative'>
      {isMyProfilePage ? (
        <div className='bg-slate-200 h-52 relative'>
          {profile?.cover_photo && (
            <img
              src={fileTmp ? previewFile : profile?.cover_photo}
              alt='Back ground cover'
              className='object-cover h-full w-full'
            />
          )}
          <div className='absolute -bottom-16 left-4'>
            <Avatar isLarge hasBorder url={profile?.avatar} isMyProfile edit={edit} />
          </div>
        </div>
      ) : (
        <div className='bg-slate-200 h-52 relative'>
          {data?.cover_photo && (
            <img src={data?.cover_photo} alt='Back ground cover' className='object-cover h-full w-full' />
          )}
          <div className='absolute -bottom-16 left-4'>
            <Avatar isLarge hasBorder url={data?.avatar} />
          </div>
        </div>
      )}
      {edit && (
        <button
          className='absolute bottom-1 right-1 m-auto w-fit rounded-full bg-gray-50 border cursor-pointer opacity-70'
          title='Change background'
        >
          <div className='hover:opacity-90'>
            <InputFile isImageFile onChange={handleChangeFile as any} Icon={IoCreateOutline} iconSize={20} />
          </div>
        </button>
      )}
      {fileTmp && (
        <div className='absolute left-0 right-0 -bottom-3 m-auto w-fit'>
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
  )
}
