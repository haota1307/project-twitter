import { create } from 'zustand'

interface ForgotPasswordStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useForgotPasswordModal = create<ForgotPasswordStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useForgotPasswordModal
