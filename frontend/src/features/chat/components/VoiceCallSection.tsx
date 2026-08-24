import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '../store/useChatStore'
import { 
  Phone, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed, 
  Mic, 
  MicOff, 
  Volume2, 
  PhoneOff,
  Clock
} from 'lucide-react'

export const VoiceCallSection: React.FC = () => {
  const { callLogs, activeCall, startCall, endCall, toggleMuteCall } = useChatStore()
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    let timer: any
    if (activeCall && activeCall.type === 'voice') {
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

  const voiceLogs = callLogs.filter((log) => log.type === 'voice')

  return (
    <div className="flex-1 flex flex-col h-full bg-[hsl(var(--background))/0.4] relative overflow-hidden p-6">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[hsl(var(--foreground))] flex items-center gap-2">
            <Phone className="w-5 h-5 text-[hsl(var(--primary))]" /> Voice Calls Log
          </h2>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            End-to-End Encrypted Audio Calls Log
          </p>
        </div>
      </div>

      {/* Voice Logs List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {voiceLogs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex items-center justify-between shadow-sm hover:border-[hsl(var(--primary)/0.4)] transition-all"
          >
            <div className="flex items-center space-x-3">
              <img
                src={log.contact.avatar}
                alt={log.contact.name}
                className="w-10 h-10 rounded-full object-cover border border-[hsl(var(--border))]"
              />
              <div>
                <h4 className="text-xs font-bold text-[hsl(var(--foreground))]">{log.contact.name}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">
                  {log.status === 'incoming' && <PhoneIncoming className="w-3.5 h-3.5 text-emerald-400" />}
                  {log.status === 'outgoing' && <PhoneOutgoing className="w-3.5 h-3.5 text-blue-400" />}
                  {log.status === 'missed' && <PhoneMissed className="w-3.5 h-3.5 text-red-400" />}
                  <span className="capitalize">{log.status} Call</span>
                  <span>•</span>
                  <span>{log.timestamp}</span>
                  {log.duration && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-[hsl(var(--primary))]">{log.duration}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startCall(log.contact, 'voice')}
              className="p-2.5 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-110 transition-all cursor-pointer shadow-sm"
              title="Call Back"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Active Audio Call Room Overlay Dialog */}
      <AnimatePresence>
        {activeCall && activeCall.type === 'voice' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <div className="w-full max-w-sm rounded-3xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--card))] p-8 text-center space-y-6 shadow-2xl glow-electric">
              {/* Animated Waveform Pulses around Avatar */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[hsl(var(--primary)/0.2)] animate-ping" />
                <div className="absolute inset-2 rounded-full bg-[hsl(var(--primary)/0.3)] animate-pulse" />
                <img
                  src={activeCall.contact.avatar}
                  alt={activeCall.contact.name}
                  className="relative z-10 w-24 h-24 rounded-full object-cover border-4 border-[hsl(var(--primary))] shadow-xl"
                />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[hsl(var(--foreground))]">{activeCall.contact.name}</h3>
                <p className="text-xs text-[hsl(var(--primary))] font-mono font-semibold flex items-center justify-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5" /> {formatSeconds(callDuration)} • Voice Encrypted
                </p>
              </div>

              {/* Call Control Buttons */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-[hsl(var(--border))]">
                <button
                  type="button"
                  onClick={toggleMuteCall}
                  className={`p-3.5 rounded-full transition-all cursor-pointer shadow-md ${
                    activeCall.isMuted
                      ? 'bg-amber-500 text-white'
                      : 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]'
                  }`}
                  title={activeCall.isMuted ? 'Unmute' : 'Mute'}
                >
                  {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  type="button"
                  className="p-3.5 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-all cursor-pointer shadow-md"
                  title="Speaker"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={endCall}
                  className="p-3.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all cursor-pointer shadow-lg hover:scale-105"
                  title="End Call"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
