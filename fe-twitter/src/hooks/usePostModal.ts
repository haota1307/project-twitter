import { create } from 'zustand'

interface PostModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const usePostModal = create<PostModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default usePostModal
