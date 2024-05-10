import { create } from 'zustand'

interface DeleteTweetStore {
  isSuccess: boolean
  isOpen: boolean
  isId?: string
  setTrueSuccess: () => void
  setFalse: () => void
  onOpen: () => void
  onClose: () => void
  setTweetId: (id: string) => void
}

const useDeleteTweetModal = create<DeleteTweetStore>((set) => ({
  isOpen: false,
  isId: undefined,
  isSuccess: false,
  setTrueSuccess: () => set({ isSuccess: true }),
  setFalse: () => set({ isSuccess: false }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setTweetId: (id: string) => set({ isId: id })
}))

export default useDeleteTweetModal
