import React from 'react'
import { motion } from 'framer-motion'
import { useChatStore } from '../store/useChatStore'
import { 
  MessageSquare, 
  Phone, 
  Video, 
  Users, 
  Search, 
  Pin, 
  CheckCheck,
  Plus,
  SlidersHorizontal
} from 'lucide-react'

export const ChatSidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    selectedChatId, 
    setSelectedChatId, 
    searchQuery, 
    setSearchQuery, 
    threads 
  } = useChatStore()

  const filteredThreads = threads.filter((t) =>
    t.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-[hsl(var(--card))/0.6] border-r border-[hsl(var(--border))] backdrop-blur-xl shrink-0 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[hsl(var(--border))] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center font-bold text-sm shadow-md">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight text-[hsl(var(--foreground))]">
              Chats & Calls
            </h2>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] flex items-center justify-center hover:bg-[hsl(var(--accent))] transition-colors cursor-pointer"
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search chats, contacts, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[hsl(var(--background))/0.7] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--primary))] transition-all"
          />
        </div>

        {/* Sidebar Nav Tabs with Animated Spring Pill Indicator */}
        <div className="relative flex items-center p-1 rounded-xl bg-[hsl(var(--background))/0.8] border border-[hsl(var(--border))]">
          {[
            { id: 'chats', label: 'Chats', icon: MessageSquare },
            { id: 'calls', label: 'Calls', icon: Phone },
            { id: 'video', label: '4K Video', icon: Video },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer select-none flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'text-[hsl(var(--primary-foreground))] font-black'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-tab-pill"
                    className="absolute inset-0 bg-[hsl(var(--primary))] rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredThreads.map((thread) => {
          const isSelected = selectedChatId === thread.id
          return (
            <button
              key={thread.id}
              type="button"
              onClick={() => setSelectedChatId(thread.id)}
              className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[hsl(var(--primary)/0.15)] border border-[hsl(var(--primary)/0.4)] shadow-sm'
                  : 'hover:bg-[hsl(var(--secondary)/0.6)] border border-transparent'
              }`}
            >
              {/* Avatar with Status Badge */}
              <div className="relative shrink-0">
                <img
                  src={thread.contact.avatar}
                  alt={thread.contact.name}
                  className="w-11 h-11 rounded-full object-cover border border-[hsl(var(--border))]"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[hsl(var(--card))] ${
                    thread.contact.status === 'online'
                      ? 'bg-emerald-400'
                      : thread.contact.status === 'busy'
                      ? 'bg-amber-400'
                      : 'bg-slate-400'
                  }`}
                />
              </div>

              {/* Thread Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[hsl(var(--foreground))] truncate flex items-center gap-1">
                    {thread.contact.name}
                    {thread.isPinned && <Pin className="w-3 h-3 text-[hsl(var(--primary))] fill-current" />}
                  </span>
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))] shrink-0 font-medium">
                    {thread.lastMessage.timestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] truncate flex items-center gap-1">
                    {thread.lastMessage.senderId === 'me' && (
                      <CheckCheck className="w-3.5 h-3.5 text-[hsl(var(--primary))] shrink-0" />
                    )}
                    <span className="truncate">{thread.lastMessage.content}</span>
                  </p>

                  {thread.unreadCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shrink-0">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
