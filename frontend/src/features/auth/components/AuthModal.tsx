import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { ShieldCheck, X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode)

  // Sync mode if initialMode changes when modal opens
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode)
    }
  }, [isOpen, initialMode])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-0"
          />

          {/* Modal Container Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            layout
            className="relative z-10 w-full max-w-md rounded-3xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 glow-hover-green overflow-hidden my-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)] transition-all cursor-pointer z-20"
              aria-label="Close Auth Modal"
            >
              <X className="w-4 h-4" />
            </button>



            {/* Form Content with Framer Motion AnimatePresence */}
            <motion.div layout className="min-h-[420px] flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {authMode === 'login' ? (
                  <LoginForm key="login-form" onSwitchToRegister={() => setAuthMode('register')} onSuccess={onClose} />
                ) : (
                  <RegisterForm key="register-form" onSwitchToLogin={() => setAuthMode('login')} onSuccess={onClose} />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Footer Security Note */}
            <div className="pt-4 border-t border-[hsl(var(--border))] text-center relative z-10">
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                End-to-End Encrypted Realtime Communications
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
