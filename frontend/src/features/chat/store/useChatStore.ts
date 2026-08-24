import { create } from 'zustand'
import type { Contact, Message, ChatThread, CallRecord, ActiveCall, CallType } from '../types'

interface ChatStore {
  activeTab: 'chats' | 'calls' | 'video' | 'contacts'
  setActiveTab: (tab: 'chats' | 'calls' | 'video' | 'contacts') => void
  
  selectedChatId: string | null
  setSelectedChatId: (id: string | null) => void
  
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  threads: ChatThread[]
  messages: Record<string, Message[]>
  callLogs: CallRecord[]
  activeCall: ActiveCall | null
  
  sendMessage: (threadId: string, content: string, type?: 'text' | 'image' | 'voice') => void
  startCall: (contact: Contact, type: CallType) => void
  endCall: () => void
  toggleMuteCall: () => void
  toggleVideoCall: () => void
  toggleScreenShare: () => void
  markThreadRead: (threadId: string) => void
}

const initialContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Alex Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'online',
    customStatus: 'Coding 4K Audio Engine 🚀',
    phone: '+1 (555) 019-2834',
    about: 'Lead Systems Architect at Calio',
  },
  {
    id: 'c2',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'online',
    customStatus: 'In a 4K Video Huddle',
    phone: '+1 (555) 234-5678',
    about: 'UI/UX Design Director',
  },
  {
    id: 'c3',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'online',
    customStatus: 'Reviewing PR #249',
    phone: '+1 (555) 876-5432',
    about: 'Backend Core Engineer',
  },
  {
    id: 'c4',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    status: 'busy',
    customStatus: 'On Voice Call 🎙️',
    phone: '+1 (555) 998-1122',
    about: 'Security & Encryption Lead',
  },
  {
    id: 'c5',
    name: 'DevOps & Infra Team',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
    status: 'online',
    customStatus: 'Sub-10ms Server Cluster',
    phone: 'Group Channel',
    about: 'Calio High-Availability Cluster',
  },
]

const initialThreads: ChatThread[] = [
  {
    id: 'c1',
    contact: initialContacts[0],
    lastMessage: {
      id: 'm1',
      senderId: 'c1',
      receiverId: 'me',
      content: 'Hey! The new fluid tab animations look awesome. Let’s do a 4K call to demo it.',
      timestamp: '10:42 AM',
      status: 'read',
    },
    unreadCount: 0,
    isPinned: true,
  },
  {
    id: 'c2',
    contact: initialContacts[1],
    lastMessage: {
      id: 'm2',
      senderId: 'me',
      receiverId: 'c2',
      content: 'Sent over the new avocado green design system assets! 🥑',
      timestamp: 'Yesterday',
      status: 'read',
    },
    unreadCount: 0,
    isPinned: true,
  },
  {
    id: 'c3',
    contact: initialContacts[2],
    lastMessage: {
      id: 'm3',
      senderId: 'c3',
      receiverId: 'me',
      content: 'Database indexes are optimized for sub-10ms query latency.',
      timestamp: 'Sunday',
      status: 'delivered',
    },
    unreadCount: 2,
    isPinned: false,
  },
  {
    id: 'c4',
    contact: initialContacts[3],
    lastMessage: {
      id: 'm4',
      senderId: 'c4',
      receiverId: 'me',
      content: 'End-to-End Encryption certificates renewed successfully.',
      timestamp: 'Aug 21',
      status: 'read',
    },
    unreadCount: 0,
    isPinned: false,
  },
]

const initialMessages: Record<string, Message[]> = {
  c1: [
    {
      id: 'm100',
      senderId: 'me',
      receiverId: 'c1',
      content: 'Hi Alex! Just finished updating the Calio auth system.',
      timestamp: '10:35 AM',
      status: 'read',
    },
    {
      id: 'm101',
      senderId: 'c1',
      receiverId: 'me',
      content: 'Awesome! Did you include the spring tab transitions and light avocado mode?',
      timestamp: '10:38 AM',
      status: 'read',
    },
    {
      id: 'm102',
      senderId: 'me',
      receiverId: 'c1',
      content: 'Yes! Both themes and fluid spring tabs are running live on Vite.',
      timestamp: '10:40 AM',
      status: 'read',
    },
    {
      id: 'm103',
      senderId: 'c1',
      receiverId: 'me',
      content: 'Hey! The new fluid tab animations look awesome. Let’s do a 4K call to demo it.',
      timestamp: '10:42 AM',
      status: 'read',
    },
  ],
  c2: [
    {
      id: 'm200',
      senderId: 'c2',
      receiverId: 'me',
      content: 'Can you share the updated color token palette for light mode?',
      timestamp: 'Yesterday 3:15 PM',
      status: 'read',
    },
    {
      id: 'm201',
      senderId: 'me',
      receiverId: 'c2',
      content: 'Sent over the new avocado green design system assets! 🥑',
      timestamp: 'Yesterday 3:20 PM',
      status: 'read',
    },
  ],
  c3: [
    {
      id: 'm300',
      senderId: 'c3',
      receiverId: 'me',
      content: 'Database indexes are optimized for sub-10ms query latency.',
      timestamp: 'Sunday 11:10 AM',
      status: 'delivered',
    },
  ],
}

const initialCallLogs: CallRecord[] = [
  {
    id: 'cl1',
    contact: initialContacts[0],
    type: 'video',
    status: 'outgoing',
    timestamp: 'Today, 10:45 AM',
    duration: '14m 22s',
  },
  {
    id: 'cl2',
    contact: initialContacts[1],
    type: 'voice',
    status: 'incoming',
    timestamp: 'Yesterday, 4:12 PM',
    duration: '08m 05s',
  },
  {
    id: 'cl3',
    contact: initialContacts[2],
    type: 'voice',
    status: 'missed',
    timestamp: 'Sunday, 2:30 PM',
  },
  {
    id: 'cl4',
    contact: initialContacts[3],
    type: 'video',
    status: 'incoming',
    timestamp: 'Aug 20, 6:15 PM',
    duration: '22m 10s',
  },
]

export const useChatStore = create<ChatStore>((set, get) => ({
  activeTab: 'chats',
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedChatId: 'c1',
  setSelectedChatId: (id) => {
    set({ selectedChatId: id })
    if (id) {
      get().markThreadRead(id)
    }
  },

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  threads: initialThreads,
  messages: initialMessages,
  callLogs: initialCallLogs,
  activeCall: null,

  sendMessage: (threadId, content, type = 'text') => {
    const newMessage: Message = {
      id: 'm_' + Date.now(),
      senderId: 'me',
      receiverId: threadId,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type,
    }

    set((state) => {
      const existingMessages = state.messages[threadId] || []
      const updatedMessages = {
        ...state.messages,
        [threadId]: [...existingMessages, newMessage],
      }

      const updatedThreads = state.threads.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: newMessage,
          }
        }
        return t
      })

      return {
        messages: updatedMessages,
        threads: updatedThreads,
      }
    })
  },

  startCall: (contact, type) => {
    set({
      activeCall: {
        id: 'call_' + Date.now(),
        contact,
        type,
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMuted: false,
        isVideoOff: false,
        isScreenSharing: false,
      },
    })
  },

  endCall: () => {
    const { activeCall, callLogs } = get()
    if (activeCall) {
      const newCallRecord: CallRecord = {
        id: 'cl_' + Date.now(),
        contact: activeCall.contact,
        type: activeCall.type,
        status: 'outgoing',
        timestamp: 'Just now',
        duration: '01m 15s',
      }
      set({
        activeCall: null,
        callLogs: [newCallRecord, ...callLogs],
      })
    }
  },

  toggleMuteCall: () => {
    set((state) => ({
      activeCall: state.activeCall
        ? { ...state.activeCall, isMuted: !state.activeCall.isMuted }
        : null,
    }))
  },

  toggleVideoCall: () => {
    set((state) => ({
      activeCall: state.activeCall
        ? { ...state.activeCall, isVideoOff: !state.activeCall.isVideoOff }
        : null,
    }))
  },

  toggleScreenShare: () => {
    set((state) => ({
      activeCall: state.activeCall
        ? { ...state.activeCall, isScreenSharing: !state.activeCall.isScreenSharing }
        : null,
    }))
  },

  markThreadRead: (threadId) => {
    set((state) => ({
      threads: state.threads.map((t) => (t.id === threadId ? { ...t, unreadCount: 0 } : t)),
    }))
  },
}))
