import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useLoginModal from 'src/hooks/useLoginModal'
import useRegisterModal from 'src/hooks/useRegisterModal'
import Button from '../Button'
import { AppContext } from 'src/contexts/app.context'
import Avatar from '../Avatar'
import { TweetAudience, TweetBody, TweetType } from 'src/types/tweet.type'
import InputFile from '../InputFile'
import mediaApi from 'src/apis/media.api'
import tweetApi from 'src/apis/tweet.api'
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5'
import { useDebounce } from 'src/hooks/useDebounce'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
  parentId?: string
  hiddenBtn?: boolean
  refreshFeed?: () => void
}

export default function Form({ placeholder, isComment, postId, parentId, hiddenBtn, refreshFeed }: FormProps) {
  const { isAuthenticated, profile } = useContext(AppContext)

  const [file, setFile] = useState<File>()
  const [hashtags, setHashtags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState(isComment ? TweetType.Comment : TweetType.Tweet)
  const [tweetParentId, setTweetParentId] = useState<string | null>(parentId ? parentId : null)
  const initialBody = {
    type,
    audience: TweetAudience.Everyone,
    content: '',
    parent_id: tweetParentId as string | null,
    hashtags: [],
    mentions: [],
    medias: []
  }
  const [body, setBody] = useState<TweetBody>(initialBody)

  const videoRef = useRef(null)
  const toastId = useRef(null)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const debouncedContent = useDebounce(body.content)

  useEffect(() => {
    const isWhitespace = /^\s*$/.test(debouncedContent)
    if (!debouncedContent || debouncedContent.trim() === '') return
    if (isWhitespace) return

    // setHashtags((body.content.match(/#[^\s#]+/g) || []).map((tag) => tag.substring(1)))
    const uniqueHashtags = new Set<string>()
    const matches = body.content.match(/#[^\s#]+/g) || []
    matches.forEach((tag) => uniqueHashtags.add(tag.substring(1)))

    setHashtags(Array.from(uniqueHashtags))
  }, [debouncedContent])

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
      setBody(initialBody)
      if (refreshFeed) {
        refreshFeed()
      }
    })

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

  useEffect(() => {
    if (file) createTweet()
  }, [body.medias])

  const handleHashtag = (value: string) => {
    const uniqueHashtags = new Set<string>()
    value.split(' ').forEach((str) => {
      if (str.startsWith('#')) {
        uniqueHashtags.add(str)
      }
    })

    return Array.from(uniqueHashtags).map((tag) => (
      <a key={tag} href={`/${tag}`} className='text-blue-500 font-bold'>
        {tag}{' '}
      </a>
    ))
  }

  return (
    <div className='border-b px-5 p-2'>
      {isAuthenticated ? (
        <div className='flex flex-row gap-4'>
          <Avatar url={profile?.avatar} />
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody({ ...body, content: e.target.value, hashtags: hashtags })}
              value={body.content}
              placeholder={placeholder}
              className='disabled:opacity-80 peer mt-3 w-full right-0 resize-none outline-none text-lg placeholder-neutral-400 text-black'
            ></textarea>
            {hashtags.length > 0 && <p className='ml-1'>Hashtag: {handleHashtag(body.content)}</p>}
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
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-500 transition mb-2' />
            <div className='flex justify-start items-center mt-1'>
              <p className='text-base text-blue-500 font-semibold p-2 hover:bg-blue-50 hover:cursor-pointer rounded-3xl'>
                Every one??
              </p>
            </div>
            <div className='my-1.5 flex flex-row justify-between'>
              <div className='flex justify-center items-center'>
                <InputFile isImageFile onChange={handleChangeFile as any} Icon={IoImageOutline} />
                <InputFile isVideoFile onChange={handleChangeFile as any} Icon={IoVideocamOutline} />
              </div>
              {!hiddenBtn && (
                <Button disabled={isLoading || body.content === ''} onClick={onSubmit} label='Tweet' secondary />
              )}
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
