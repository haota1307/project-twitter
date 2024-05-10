import { create } from 'zustand'

interface EditTweetStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useEditTweetModal = create<EditTweetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useEditTweetModal
