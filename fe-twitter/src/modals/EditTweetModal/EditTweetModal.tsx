import Modal from 'src/components/Modal'
import useEditTweetModal from 'src/hooks/useEditTweet'
import EditForm from './EditForm/EditForm'
import { Tweet } from 'src/types/tweet.type'

export default function EditTweetModal() {
  const editTweetModal = useEditTweetModal()

  const bodyContent = (
    <div className='flex flex-col gap-4 mb-8'>
      <EditForm placeholder="What's happening?!" data={editTweetModal.tweetEdit as Tweet} />
    </div>
  )
  return (
    <>
      <Modal
        isOpen={editTweetModal.isOpen}
        onClose={editTweetModal.onClose}
        title='Create your tweet'
        actionLabel='Edit'
        noSubmit={true}
        body={bodyContent}
      />
    </>
  )
}
