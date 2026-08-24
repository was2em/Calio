import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '../store/useChatStore'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  PhoneOff, 
  Sparkles,
  Users,
  ShieldCheck,
  Maximize2
} from 'lucide-react'

export const VideoCallSection: React.FC = () => {
  const { threads, activeCall, startCall, endCall, toggleMuteCall, toggleVideoCall, toggleScreenShare } = useChatStore()
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    let timer: any
    if (activeCall && activeCall.type === 'video') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    } else {
      setCallDuration(0)
    }
    return () => clearInterval(timer)
  }, [activeCall])

  const formatSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[hsl(var(--background))/0.4] relative overflow-hidden p-6">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[hsl(var(--foreground))] flex items-center gap-2">
            <Video className="w-5 h-5 text-[hsl(var(--primary))]" /> 4K Video Call Rooms
          </h2>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Ultra-Low Latency 4K Video Conferencing & Huddles
          </p>
        </div>
      </div>

      {/* Video Huddle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="p-5 rounded-3xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] space-y-4 shadow-sm hover:border-[hsl(var(--primary)/0.4)] transition-all glow-hover-green"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={thread.contact.avatar}
                  alt={thread.contact.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[hsl(var(--primary))]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[hsl(var(--card))] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">{thread.contact.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] font-semibold">
                  4K Video Ready
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startCall(thread.contact, 'video')}
              className="w-full py-2.5 px-4 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              <Video className="w-4 h-4" /> Start 4K Video Call
            </button>
          </div>
        ))}
      </div>

      {/* Active 4K Video Call Room Fullscreen Overlay */}
      <AnimatePresence>
        {activeCall && activeCall.type === 'video' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between text-white z-20">
              <div className="flex items-center space-x-3 bg-black/60 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="font-bold text-xs">{activeCall.contact.name}</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  {formatSeconds(callDuration)}
                </span>
                <span className="text-[9px] bg-[#84ff00] text-black font-black px-1.5 py-0.5 rounded">
                  4K UHD
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-black/60 px-3 py-2 rounded-2xl backdrop-blur-md border border-white/10 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Encrypted 4K Stream</span>
              </div>
            </div>

            {/* Video Streams Canvas Grid */}
            <div className="relative flex-1 my-4 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 flex items-center justify-center">
              {activeCall.isVideoOff ? (
                <div className="text-center space-y-3">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mx-auto border-2 border-white/20">
                    <VideoOff className="w-10 h-10 text-white/50" />
                  </div>
                  <p className="text-sm font-semibold text-white/70">Camera Turned Off</p>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={activeCall.contact.avatar}
                    alt={activeCall.contact.name}
                    className="w-full h-full object-cover opacity-90 blur-sm scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <img
                        src={activeCall.contact.avatar}
                        alt={activeCall.contact.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#84ff00] shadow-2xl mx-auto"
                      />
                      <p className="text-lg font-bold text-white">{activeCall.contact.name}</p>
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        4K Video Stream Active
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Picture-in-Picture Local User Video */}
              <div className="absolute bottom-4 right-4 w-36 h-28 sm:w-48 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#84ff00] shadow-2xl bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  alt="My Feed"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-mono">
                  You (4K)
                </span>
              </div>
            </div>

            {/* Bottom In-Call Control Dock */}
            <div className="flex items-center justify-center gap-4 py-3 bg-zinc-900/90 border border-white/10 rounded-2xl max-w-md mx-auto w-full backdrop-blur-xl z-20">
              <button
                type="button"
                onClick={toggleMuteCall}
                className={`p-3.5 rounded-xl text-white transition-all cursor-pointer ${
                  activeCall.isMuted ? 'bg-amber-500' : 'bg-white/10 hover:bg-white/20'
                }`}
                title={activeCall.isMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={toggleVideoCall}
                className={`p-3.5 rounded-xl text-white transition-all cursor-pointer ${
                  activeCall.isVideoOff ? 'bg-amber-500' : 'bg-white/10 hover:bg-white/20'
                }`}
                title={activeCall.isVideoOff ? 'Turn On Camera' : 'Turn Off Camera'}
              >
                {activeCall.isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={toggleScreenShare}
                className={`p-3.5 rounded-xl text-white transition-all cursor-pointer ${
                  activeCall.isScreenSharing ? 'bg-emerald-500' : 'bg-white/10 hover:bg-white/20'
                }`}
                title="Share Screen"
              >
                <Monitor className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={endCall}
                className="p-3.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer shadow-lg hover:scale-105"
                title="Leave Video Call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
