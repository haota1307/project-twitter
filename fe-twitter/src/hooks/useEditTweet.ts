import { Tweet } from 'src/types/tweet.type'
import { create } from 'zustand'

interface EditTweetStore {
  isOpen: boolean
  tweetEdit?: Tweet
  onOpen: () => void
  onClose: () => void
  setTweetEdit: (body: Tweet) => void
}

const useEditTweetModal = create<EditTweetStore>((set) => ({
  isOpen: false,
  tweetEdit: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setTweetEdit: (body: Tweet) => set({ tweetEdit: body })
}))

export default useEditTweetModal
