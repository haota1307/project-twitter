import { useCallback } from 'react'
import { IoArrowBackOutline, IoCloseOutline } from 'react-icons/io5'
import Button from '../Button'
import { Link } from 'react-router-dom'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit?: () => void
  onBackHome?: boolean
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disable?: boolean
  cancelButton?: boolean
  noSubmit?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  onBackHome,
  title,
  body,
  footer,
  actionLabel,
  disable,
  noSubmit,
  cancelButton
}: ModalProps) {
  const handleClose = useCallback(() => {
    if (disable) {
      return
    }
    onClose()
  }, [disable, onClose])

  const handleSubmit = useCallback(() => {
    // if (disable) {
    //   return
    // }
    if (onSubmit) onSubmit()
  }, [disable, onSubmit])

  const handleCancel = useCallback(() => {
    if (disable) {
      return
    }
    onClose()
  }, [disable, onSubmit])

  if (!isOpen) return null

  return (
    <>
      <div className='flex justify-center items-center overflow-x-hidden overflow-y-scroll fixed inset-0 z-[999] outline-none focus:outline-none bg-neutral-800 bg-opacity-70'>
        <div className='relative w-full lg:w-3/6 h-auto'>
          {/* content */}
          <div className='h-full lg:h-auto border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/* header */}
            <div className='flex items-center justify-center p-10 rounded-t'>
              <h3 className='text-3xl font-semibold text-black'>{title}</h3>
              <button
                onClick={handleClose}
                className={`p-1 ml-auto border-0 hover:opacity-70 hover:text-red-600 transition ${
                  onBackHome && 'hidden'
                }`}
              >
                <IoCloseOutline size={20} />
              </button>
              {onBackHome && (
                <Link
                  to={'/'}
                  className='flex justify-center items-center p-1 ml-auto border-0 hover:opacity-70 hover:text-red-600 transition'
                >
                  <IoArrowBackOutline size={20} /> <span className='ml-2'>Back home</span>
                </Link>
              )}
            </div>
            {/* body */}
            <div className='relative px-10 flex-auto'>{body}</div>
            {/* footer */}
            {!noSubmit && (
              <div className='flex flex-col gap-2 lg:px-10 px-10 py-6'>
                <Button disabled={disable} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
                {cancelButton && <Button disabled={disable} label={'Cancel'} fullWidth large onClick={handleCancel} />}
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
