import axios from 'axios'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import useLoginModal from 'src/hooks/useLoginModal'
import useRegisterModal from 'src/hooks/useRegisterModal'
import Button from '../Button'
import { AppContext } from 'src/contexts/app.context'
import Avatar from '../Avatar'
import config from 'src/constants/config'
import { Media, TweetAudience, TweetType } from 'src/types/tweet.type'
import InputFile from '../InputFile'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
}

interface TweetBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null
  hashtags: string[]
  mentions: string[]
  medias: Media[]
}

export default function Form({ placeholder, isComment, postId }: FormProps) {
  const { isAuthenticated } = useContext(AppContext)

  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false)

  const [body, setBody] = useState<TweetBody>({
    type: TweetType.Tweet,
    audience: TweetAudience.Everyone,
    content: '',
    parent_id: null,
    hashtags: [],
    mentions: [],
    medias: []
  })

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleUploadImg = async () => {
    const fd = new FormData()
    fd.append('image', file as File) //key, value
    axios
      .post('/medias/upload-image', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        baseURL: config.baseUrl
      })
      .then((res) => {
        setBody({
          ...body,
          medias: [{ type: res.data.result[0].type, url: res.data.result[0].url }]
        })
      })
      .catch((err) => {
        toast.error('Upload img failed')
      })
  }

  const createTweet = async () =>
    axios
      .post(
        '/tweets',
        { ...body },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          baseURL: config.baseUrl
        }
      )
      .then(() => {
        toast.success('Tweet created')
      })

  useEffect(() => {
    if (file) createTweet()
  }, [body.medias])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      if (file) {
        await handleUploadImg()
      }
      if (!file) createTweet()
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body, file])

  const handleChangeIMGFile = (file?: File) => {
    setFile(file)
  }

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
            {file && <img src={previewImage} className='rounded-2xl my-2 max-h-80 w-auto' />}
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-500 transition' />
            <div className='flex justify-start items-center mt-1'>
              <p className='text-base text-blue-500 font-semibold p-2 hover:bg-blue-50 hover:cursor-pointer rounded-3xl'>
                Every one??
              </p>
            </div>
            <div className='my-1.5 flex flex-row justify-between'>
              <div className='flex justify-center items-center'>
                <InputFile isImageFile onChange={handleChangeIMGFile as any} />
                <InputFile isVideoFile />
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
