import axios from 'axios'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useLoginModal from 'src/hooks/useLoginModal'
import useRegisterModal from 'src/hooks/useRegisterModal'
import Button from '../Button'
import { AppContext } from 'src/contexts/app.context'
import Avatar from '../Avatar'
import config from 'src/constants/config'
import { Media, TweetAudience, TweetBody, TweetType } from 'src/types/tweet.type'
import InputFile from '../InputFile'
import mediaApi from 'src/apis/media.api'
import tweetApi from 'src/apis/tweet.api'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
}

export default function Form({ placeholder, isComment, postId }: FormProps) {
  const { isAuthenticated } = useContext(AppContext)

  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false)

  const videoRef = useRef(null)
  const toastId = useRef(null)

  const initialBody = {
    type: TweetType.Tweet,
    audience: TweetAudience.Everyone,
    content: '',
    parent_id: null,
    hashtags: [],
    mentions: [],
    medias: []
  }

  const [body, setBody] = useState<TweetBody>(initialBody)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const previewFile = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleUploadImg = async () => {
    const fd = new FormData()
    fd.append('image', file as File) //key, value
    ;(toastId.current as any) = toast.loading('Tweet uploading...')
    mediaApi
      .uploadImg(fd)
      .then((res) => {
        toast.update(toastId.current as any, {
          type: 'success',
          autoClose: 1000,
          isLoading: false
        })
        setBody({
          ...body,
          medias: [{ type: res.data.result[0].type, url: res.data.result[0].url }]
        })
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

  const handleUploadVideo = async () => {
    const fd = new FormData()
    fd.append('video', file as File) //key, value
    ;(toastId.current as any) = toast.loading('Tweet uploading...')

    mediaApi
      .uploadVideo(fd)
      .then((res) => {
        toast.update(toastId.current as any, {
          type: 'success',
          autoClose: 1000,
          isLoading: false
        })
        setBody({
          ...body,
          medias: [{ type: res.data.result[0].type, url: res.data.result[0].url }]
        })
      })
      .catch((err) => {
        toast.update(toastId.current as any, {
          render: 'Upload video fail',
          type: 'error',
          autoClose: 1000,
          isLoading: false
        })
      })
  }

  const createTweet = () =>
    tweetApi.createTweet({ ...body }).then(() => {
      toast.success('Create success', { autoClose: 1000 })
    })

  useEffect(() => {
    if (file) createTweet()
  }, [body.medias])

  const onSubmit = useCallback(async () => {
    setIsLoading(true)
    try {
      if (file?.type.startsWith('image/')) {
        await handleUploadImg()
      }
      if (file?.type.startsWith('video/')) {
        await handleUploadVideo()
      }
      if (!file) createTweet()
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body, file, isLoading])

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  useEffect(() => {
    if (videoRef.current) {
      ;(videoRef.current as any).volume = 0.5
    }
  }, [])

  return (
    <div className='border-b px-5 p-2'>
      {isAuthenticated ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar />
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody({ ...body, content: e.target.value })}
              value={body.content}
              placeholder={placeholder}
              className='disabled:opacity-80 peer mt-3 w-full right-0 resize-none outline-none text-lg placeholder-neutral-400 text-black'
            ></textarea>
            {file?.type.startsWith('image/') && (
              <div className='w-full pt-[100%] relative'>
                <img src={previewFile} className='absolute top-0 left-0 bg-white w-full h-full object-cover' />
              </div>
            )}
            {file?.type.startsWith('video/') && (
              <div className='w-full max-h-screen pt-[100%] relative bg-black'>
                <video
                  ref={videoRef}
                  src={previewFile}
                  className='absolute top-0 left-0 bg-white w-full h-full'
                  controls
                />
              </div>
            )}
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-500 transition' />
            <div className='flex justify-start items-center mt-1'>
              <p className='text-base text-blue-500 font-semibold p-2 hover:bg-blue-50 hover:cursor-pointer rounded-3xl'>
                Every one??
              </p>
            </div>
            <div className='my-1.5 flex flex-row justify-between'>
              <div className='flex justify-center items-center'>
                <InputFile isImageFile onChange={handleChangeFile as any} />
                <InputFile isVideoFile onChange={handleChangeFile as any} />
              </div>
              <Button disabled={isLoading || body.content === ''} onClick={onSubmit} label='Tweet' secondary />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='text-black text-2xl text-center mb-4 font-bold'>Wellcom to Twitter</h1>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button secondary label='Login' onClick={loginModal.onOpen} />
            <Button secondary label='Register' onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  )
}
