export type CallType = 'voice' | 'video'
export type CallStatus = 'incoming' | 'outgoing' | 'missed' | 'active'

export interface Contact {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'busy'
  customStatus?: string
  lastSeen?: string
  phone?: string
  about?: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  type?: 'text' | 'image' | 'voice' | 'file'
  mediaUrl?: string
  voiceDuration?: string
}

export interface ChatThread {
  id: string
  contact: Contact
  lastMessage: Message
  unreadCount: number
  isPinned?: boolean
}

export interface CallRecord {
  id: string
  contact: Contact
  type: CallType
  status: CallStatus
  timestamp: string
  duration?: string
}

export interface ActiveCall {
  id: string
  contact: Contact
  type: CallType
  startTime: string
  isMuted: boolean
  isVideoOff: boolean
  isScreenSharing: boolean
}
