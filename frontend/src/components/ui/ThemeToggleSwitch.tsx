import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'
import { Sun, Moon } from 'lucide-react'

export const ThemeToggleSwitch: React.FC = () => {
  const { setTheme, effectiveTheme } = useTheme()
  const isDark = effectiveTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative w-[68px] h-[36px] rounded-full p-[3px] transition-colors duration-300 flex items-center justify-between cursor-pointer select-none border shadow-inner ${
        isDark
          ? 'bg-[#18181b] border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
          : 'bg-[#e4e4e7] border-black/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]'
      }`}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      {/* Sun Icon on Left (Light state) */}
      <div className="absolute left-[10px] flex items-center justify-center pointer-events-none z-0">
        <Sun
          className={`w-[18px] h-[18px] transition-all duration-300 ${
            isDark ? 'opacity-20 text-white scale-75' : 'opacity-100 text-black scale-100'
          }`}
        />
      </div>

      {/* Moon Icon on Right (Dark state) */}
      <div className="absolute right-[10px] flex items-center justify-center pointer-events-none z-0">
        <Moon
          className={`w-[18px] h-[18px] transition-all duration-300 ${
            isDark ? 'opacity-100 text-white scale-100' : 'opacity-20 text-black scale-75'
          }`}
        />
      </div>

      {/* Tactile 3D Circular Knob sliding left/right */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.8 }}
        className={`w-[30px] h-[30px] rounded-full z-10 ${
          isDark
            ? 'bg-gradient-to-b from-white to-zinc-200 shadow-[0_2px_6px_rgba(0,0,0,0.5)] ml-0'
            : 'bg-gradient-to-b from-zinc-800 to-zinc-950 shadow-[0_2px_6px_rgba(0,0,0,0.3)] ml-auto'
        }`}
      />
    </button>
  )
}
