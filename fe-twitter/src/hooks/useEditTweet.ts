import { Tweet } from 'src/types/tweet.type'
import { create } from 'zustand'

interface EditTweetStore {
  isOpen: boolean
  tweetEdit?: Tweet
  isRefreshData: boolean
  onOpen: () => void
  onClose: () => void
  setTweetEdit: (body: Tweet) => void
  setIsRefreshDataTrue: () => void
  setIsRefreshDataFalse: () => void
}

const useEditTweetModal = create<EditTweetStore>((set) => ({
  isOpen: false,
  tweetEdit: undefined,
  isRefreshData: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setTweetEdit: (body: Tweet) => set({ tweetEdit: body }),
  setIsRefreshDataTrue: () => set({ isRefreshData: true }),
  setIsRefreshDataFalse: () => set({ isRefreshData: false })
}))

export default useEditTweetModal
