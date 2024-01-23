import axios from 'axios'
import { useCallback, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import useLoginModal from 'src/hooks/useLoginModal'
import useRegisterModal from 'src/hooks/useRegisterModal'
import Button from '../Button'
import { AppContext } from 'src/contexts/app.context'
import Avatar from '../Avatar'
import config from 'src/constants/config'
import { Media, TweetAudience, TweetType } from 'src/types/tweet.type'

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
  const [body, setBody] = useState<TweetBody>({
    type: TweetType.Tweet,
    audience: TweetAudience.Everyone,
    content: '',
    parent_id: null,
    hashtags: [],
    mentions: [],
    medias: []
  })
  const [isLoading, setIsLoading] = useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log(body)
      await axios.post(
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
      toast.success('Tweet created')
      // setBody({
      //   type: TweetType.Tweet,
      //   audience: TweetAudience.Everyone,
      //   content: '',
      //   parent_id: null,
      //   hashtags: [],
      //   mentions: [],
      //   medias: []
      // })
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body])

  // console.log(body)
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
              className='disabled:opacity-80 peer mt-3 w-full right-0 resize-none outline-none text-[20px] placeholder-neutral-400 text-black'
            ></textarea>
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-500 transition' />
            <div className='mt-4 flex flex-row justify-end'>
              <Button disabled={isLoading || !body} onClick={onSubmit} label='Tweet' secondary />
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
