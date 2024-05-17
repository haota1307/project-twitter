import { create } from 'zustand'

interface PostModalStore {
  isOpen: boolean
  isRefreshData: boolean
  onOpen: () => void
  onClose: () => void
  setIsRefreshDataTrue: () => void
  setIsRefreshDataFalse: () => void
}

const usePostModal = create<PostModalStore>((set) => ({
  isOpen: false,
  isRefreshData: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setIsRefreshDataTrue: () => set({ isRefreshData: true }),
  setIsRefreshDataFalse: () => set({ isRefreshData: false })
}))

export default usePostModal
