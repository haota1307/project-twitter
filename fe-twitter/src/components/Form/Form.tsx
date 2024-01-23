import axios from 'axios'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import useLoginModal from 'src/hooks/useLoginModal'
import useRegisterModal from 'src/hooks/useRegisterModal'
import Button from '../Button'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
}
export default function Form({ placeholder, isComment, postId }: FormProps) {
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await axios.post('/tweets', { body })
      toast.success('Tweet created')
      setBody('')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body])
  return (
    <div className='border-b px-5 p-2'>
      <div className='py-8'>
        <h1 className='text-black text-2xl text-center mb-4 font-bold'>Wellcom to Twitter</h1>
        <div className='flex flex-row items-center justify-center gap-4'>
          <Button secondary label='Login' onClick={loginModal.onOpen} />
          <Button secondary label='Register' onClick={registerModal.onOpen} />
        </div>
      </div>
    </div>
  )
}
