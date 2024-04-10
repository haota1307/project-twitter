import { create } from 'zustand'

interface ResetPasswordModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useResetPasswordModal = create<ResetPasswordModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useResetPasswordModal
