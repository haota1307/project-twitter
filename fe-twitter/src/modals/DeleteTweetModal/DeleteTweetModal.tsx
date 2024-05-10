import { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'src/components/Modal'
import useDeleteTweetModal from 'src/hooks/useDeleteTweet'
import http from 'src/utils/http'

export default function DeleteTweetModal() {
  const deleteTweetModal = useDeleteTweetModal()

  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteTweet = () => {
    setIsLoading(true)
    http
      .delete(`tweets/delete/${deleteTweetModal.isId}`)
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        deleteTweetModal.setTrueSuccess()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
        deleteTweetModal.onClose()
      })
  }
  return (
    <div>
      <Modal
        disable={isLoading}
        isOpen={deleteTweetModal.isOpen}
        title='Are you sure you want to delete it?'
        actionLabel='Delete'
        onClose={deleteTweetModal.onClose}
        onSubmit={handleDeleteTweet}
        cancelButton={true}
      />
    </div>
  )
}
