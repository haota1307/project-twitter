import { create } from 'zustand'

interface ChangeUsernameStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useChangeUsernameModal = create<ChangeUsernameStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useChangeUsernameModal
