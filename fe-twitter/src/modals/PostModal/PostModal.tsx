import Form from 'src/components/Form'
import Modal from 'src/components/Modal'
import usePostModal from 'src/hooks/usePostModal'

export default function PostModal() {
  const postModal = usePostModal()

  const bodyContent = (
    <div className='flex flex-col gap-4 mb-8'>
      <Form placeholder="What's happening?!" />
    </div>
  )

  return (
    <Modal
      isOpen={postModal.isOpen}
      onClose={postModal.onClose}
      title='Create your tweet'
      actionLabel='Tweet'
      noSubmit={true}
      body={bodyContent}
      // footer={footerContent}
    />
  )
}
