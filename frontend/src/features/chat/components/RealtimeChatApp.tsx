import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { ChatSidebar } from './ChatSidebar'
import { ConversationView } from './ConversationView'
import { VoiceCallSection } from './VoiceCallSection'
import { VideoCallSection } from './VideoCallSection'

export const RealtimeChatApp: React.FC = () => {
  const { activeTab } = useChatStore()

  return (
    <div className="w-full h-[calc(100vh-80px)] max-w-7xl mx-auto flex flex-col md:flex-row rounded-3xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--card))/0.85] backdrop-blur-2xl shadow-2xl overflow-hidden glow-hover-green transition-all">
      {/* Sidebar Navigation & Thread Selector */}
      <ChatSidebar />

      {/* Main Main Panel based on Active Tab */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {activeTab === 'chats' && <ConversationView />}
        {activeTab === 'calls' && <VoiceCallSection />}
        {activeTab === 'video' && <VideoCallSection />}
      </div>
    </div>
  )
}
