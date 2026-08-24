import React from 'react'
import { motion } from 'framer-motion'
import { LottiePlayer } from '@/components/ui/lottie-player'
import onlineChatLottie from '@/assets/lottie/Online chat.lottie?url'
import { useTheme } from '@/components/theme-provider'

import { 
  MessageSquare, 
  Video, 
  Lock, 
  Star, 
  Volume2
} from 'lucide-react'


export const AuthHeroSection: React.FC = () => {
  const { effectiveTheme } = useTheme()

  return (
    <div className="relative flex flex-col justify-between p-8 md:p-12 h-full min-h-[580px] rounded-3xl bg-gradient-to-br from-[hsl(var(--card))/0.95] via-[hsl(var(--accent)/0.25)] to-[hsl(var(--card))] border border-[hsl(var(--primary)/0.35)] backdrop-blur-xl overflow-hidden shadow-2xl group">
      
      {/* Background glowing orb graphics */}
      <div className="absolute -top-28 -left-28 w-80 h-80 rounded-full bg-[hsl(var(--primary)/0.18)] blur-3xl pointer-events-none group-hover:bg-[hsl(var(--primary)/0.28)] transition-colors duration-700" />
      <div className="absolute -bottom-28 -right-28 w-80 h-80 rounded-full bg-[hsl(var(--primary)/0.12)] blur-3xl pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.12)] text-xs font-semibold text-[hsl(var(--primary))] shadow-sm">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Calio Realtime Communications</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] leading-tight">
          Realtime Chat, <span className="text-[hsl(var(--primary))] underline decoration-[hsl(var(--primary)/0.4)] underline-offset-8">HD Video & Audio</span>
        </h1>
        
        <p className="text-xs lg:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-md">
          Connect instantly with end-to-end encrypted messaging, 4K video rooms, and spatial audio channels built for teams.
        </p>
      </div>

      {/* Center Lottie Animation (Online chat.lottie) with Theme Color Adaptability */}
      <div className="relative z-10 my-4 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center">
          
          {/* Ambient Glow Backdrop according to theme */}
          <div className="absolute inset-0 bg-[hsl(var(--primary)/0.2)] rounded-full blur-3xl transform scale-110 pointer-events-none transition-all duration-500" />
          
          {/* Lottie Container with CSS theme hue filter adaptation */}
          <div 
            className={`w-full h-full relative z-10 transition-all duration-500 ${
              effectiveTheme === 'dark'
                ? 'drop-shadow-[0_0_25px_rgba(132,255,0,0.35)] filter hue-rotate-[25deg] saturate-125'
                : 'drop-shadow-[0_4px_20px_rgba(75,112,18,0.25)] filter hue-rotate-[-10deg] brightness-95'
            }`}
          >
            <LottiePlayer
              dotLottieSrc={onlineChatLottie}
              width="100%"
              height="100%"
              loop
              autoplay
            />
          </div>
        </div>

        {/* Live Chat Status Indicator Pill */}
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--background))/0.8] border border-[hsl(var(--primary)/0.3)] text-[11px] font-medium text-[hsl(var(--foreground))] backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          <span>Realtime Engine Active • Sub-10ms Latency</span>
        </div>
      </div>

      {/* Bottom Features Grid & Floating Glass Testimonial */}
      <div className="relative z-10 space-y-5">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[hsl(var(--background))/0.6] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-medium">
            <MessageSquare className="w-4 h-4 text-[hsl(var(--primary))] shrink-0" />
            <span>Instant Chat & Sync</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[hsl(var(--background))/0.6] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-medium">
            <Video className="w-4 h-4 text-[hsl(var(--primary))] shrink-0" />
            <span>4K Ultra HD Video</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[hsl(var(--background))/0.6] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-medium">
            <Volume2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0" />
            <span>Spatial Voice Rooms</span>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[hsl(var(--background))/0.6] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-medium">
            <Lock className="w-4 h-4 text-[hsl(var(--primary))] shrink-0" />
            <span>E2E Encrypted Chat</span>
          </div>
        </div>

        {/* Floating Glass Testimonial Snippet */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="p-4 rounded-2xl bg-[hsl(var(--card))/0.85] border border-[hsl(var(--primary)/0.3)] shadow-xl backdrop-blur-md space-y-2 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] font-mono text-[hsl(var(--primary))] font-semibold">CHAT & CALL VERIFIED</span>
          </div>
          <p className="text-xs text-[hsl(var(--foreground))] font-medium leading-relaxed italic">
            "Calio replaced 3 messaging apps for our team. The crystal-clear audio voice rooms and instant chat latency are top-tier."
          </p>
          <div className="flex items-center justify-between text-[10px] text-[hsl(var(--muted-foreground))] pt-1 border-t border-[hsl(var(--border))]">
            <span className="font-semibold text-[hsl(var(--foreground))]">Elena Rostova</span>
            <span>Lead Architect @ StreamChat Inc</span>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
