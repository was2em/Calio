import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useChatStore } from '../store/useChatStore'
import { 
  Phone, 
  Video, 
  Search, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Send, 
  Mic, 
  CheckCheck,
  ShieldCheck,
  Lock,
  Sparkles
} from 'lucide-react'

export const ConversationView: React.FC = () => {
  const [textInput, setTextInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { selectedChatId, threads, messages, sendMessage, startCall } = useChatStore()

  const activeThread = threads.find((t) => t.id === selectedChatId) || threads[0]
  const threadMessages = messages[activeThread?.id || 'c1'] || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [threadMessages])

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!textInput.trim() || !activeThread) return
    sendMessage(activeThread.id, textInput)
    setTextInput('')
  }

  if (!activeThread) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[hsl(var(--background))/0.4]">
        <Sparkles className="w-12 h-12 text-[hsl(var(--primary))] animate-bounce mb-3" />
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Select a Conversation</h3>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Choose a contact from the sidebar to start messaging.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[hsl(var(--background))/0.4] relative overflow-hidden">
      {/* Conversation Header */}
      <div className="p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))/0.7] backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={activeThread.contact.avatar}
              alt={activeThread.contact.name}
              className="w-10 h-10 rounded-full object-cover border border-[hsl(var(--border))]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[hsl(var(--card))] rounded-full" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[hsl(var(--foreground))] flex items-center gap-1.5">
              {activeThread.contact.name}
              <ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
            </h3>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>{activeThread.contact.customStatus || 'Online & Encrypted'}</span>
            </p>
          </div>
        </div>

        {/* Action Controls: Audio Call & 4K Video Call */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => startCall(activeThread.contact, 'voice')}
            className="p-2 rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors cursor-pointer"
            title="Start Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => startCall(activeThread.contact, 'video')}
            className="p-2 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-110 transition-all cursor-pointer shadow-md"
            title="Start 4K Video Call"
          >
            <Video className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-[hsl(var(--border))] mx-1" />
          <button
            type="button"
            className="p-2 rounded-xl text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 rounded-xl text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Encryption Banner */}
      <div className="py-1.5 px-4 bg-[hsl(var(--primary)/0.08)] border-b border-[hsl(var(--primary)/0.15)] text-center text-[10px] text-[hsl(var(--primary))] font-semibold flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3" />
        End-to-End Encrypted Realtime Channel • Messages & Calls Secured
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {threadMessages.map((msg) => {
          const isMe = msg.senderId === 'me'
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[70%] p-3.5 rounded-2xl shadow-sm text-xs space-y-1 ${
                  isMe
                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-tr-none'
                    : 'bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--card-foreground))] rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <div
                  className={`flex items-center justify-end gap-1 text-[9px] ${
                    isMe ? 'opacity-85' : 'text-[hsl(var(--muted-foreground))]'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                </div>
              </div>
            </motion.div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))/0.8] backdrop-blur-md flex items-center gap-2"
      >
        <button
          type="button"
          className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded-xl hover:bg-[hsl(var(--secondary))] transition-colors cursor-pointer"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded-xl hover:bg-[hsl(var(--secondary))] transition-colors cursor-pointer"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="flex-1 py-2.5 px-4 text-xs rounded-xl bg-[hsl(var(--background))/0.8] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--primary))] transition-all"
        />

        {textInput.trim() ? (
          <button
            type="submit"
            className="p-2.5 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl hover:brightness-110 transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            className="p-2.5 bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] rounded-xl hover:bg-[hsl(var(--accent))] transition-colors cursor-pointer"
          >
            <Mic className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  )
}
