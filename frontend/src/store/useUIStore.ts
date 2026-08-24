import { create } from 'zustand'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

interface UIState {
  isSidebarOpen: boolean
  isLoginModalOpen: boolean
  notifications: Notification[]
  
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setLoginModalOpen: (open: boolean) => void
  addNotification: (type: Notification['type'], message: string) => void
  removeNotification: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isLoginModalOpen: false,
  notifications: [],

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
  
  setLoginModalOpen: (open: boolean) => set({ isLoginModalOpen: open }),

  addNotification: (type, message) => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({
      notifications: [...state.notifications, { id, type, message }],
    }))

    // Auto remove after 4 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }))
    }, 4000)
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))
