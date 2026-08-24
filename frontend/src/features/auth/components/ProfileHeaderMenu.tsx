import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useUIStore } from '@/store/useUIStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  ChevronDown, 
  Sparkles,
  Settings,
  UserPlus
} from 'lucide-react'

interface ProfileHeaderMenuProps {
  onOpenAuth: () => void
}

export const ProfileHeaderMenu: React.FC<ProfileHeaderMenuProps> = ({ onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const { user, isAuthenticated, logout } = useAuthStore()
  const { addNotification } = useUIStore()

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    addNotification('info', 'You have been signed out successfully.')
  }

  return (
    <div className="relative z-30" ref={menuRef}>
      {/* Profile Avatar Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center transition-all duration-200 cursor-pointer select-none hover:scale-105 focus:outline-none"
        aria-label="User Profile Menu"
      >
        {isAuthenticated && user ? (
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[hsl(var(--primary))] shadow-md">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[hsl(var(--card))] rounded-full" />
          </div>
        ) : (
          <div className="w-full h-full rounded-full bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] flex items-center justify-center border-2 border-[hsl(var(--primary)/0.4)] shadow-md hover:border-[hsl(var(--primary))] transition-all">
            <User className="w-5 h-5" />
          </div>
        )}
      </button>

      {/* Profile Dropdown Popup Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-72 rounded-2xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-4 shadow-2xl backdrop-blur-xl space-y-4 glow-hover-green overflow-hidden z-50"
          >
            {isAuthenticated && user ? (
              /* Logged In View */
              <div className="space-y-3">
                {/* User Header Info Card */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[hsl(var(--background))/0.7] border border-[hsl(var(--border))]">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-[hsl(var(--primary))]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-[hsl(var(--foreground))]">{user.name}</p>
                    <p className="text-[11px] truncate text-[hsl(var(--muted-foreground))]">{user.email}</p>
                    <Badge variant="secondary" className="mt-1 text-[9px] uppercase font-bold tracking-wider px-2 py-0">
                      {user.role} Account
                    </Badge>
                  </div>
                </div>

                {/* Menu Action Items */}
                <div className="space-y-1 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      onOpenAuth()
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.12)] hover:text-[hsl(var(--primary))] transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-[hsl(var(--primary))]" />
                    <span>Switch or Add Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      addNotification('info', 'Account Settings opened.')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.12)] hover:text-[hsl(var(--primary))] transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    <span>Account Settings</span>
                  </button>

                  <div className="pt-2 border-t border-[hsl(var(--border))]">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Logged Out View */
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[hsl(var(--background))/0.7] border border-[hsl(var(--border))]">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] flex items-center justify-center border border-[hsl(var(--primary)/0.3)] shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[hsl(var(--foreground))]">Guest User</p>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Sign in to access channels</p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false)
                    onOpenAuth()
                  }}
                  className="w-full gap-2 text-xs font-bold shadow-md cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Create Account</span>
                </Button>

                <div className="pt-2 border-t border-[hsl(var(--border))] text-center">
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] flex items-center justify-center gap-1 font-medium">
                    <ShieldCheck className="w-3 h-3 text-[hsl(var(--primary))]" />
                    Encrypted Session Access
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
