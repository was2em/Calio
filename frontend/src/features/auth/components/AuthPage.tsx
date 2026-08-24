import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { ThemeToggleSwitch } from '@/components/ui/ThemeToggleSwitch'
import { ProfileHeaderMenu } from './ProfileHeaderMenu'
import { MessageSquare, ShieldCheck, LayoutDashboard } from 'lucide-react'


interface AuthPageProps {
  onBackToDashboard?: () => void
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBackToDashboard }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const { setTheme, effectiveTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background ambient radial gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {effectiveTheme === 'dark' ? (
          <>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#84ff00]/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38b000]/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#70e000]/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#4b7012]/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#70e000]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#568203]/10 rounded-full blur-3xl" />
          </>
        )}
      </div>

      {/* Header Bar */}
      <header className="relative z-20 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/0.85] backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBackToDashboard}>
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center shadow-lg shadow-[hsl(var(--primary)/0.25)] transition-transform hover:scale-105">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[hsl(var(--foreground))] flex items-center gap-2">
                Calio Chat & Video
              </h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Realtime Messaging Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ProfileHeaderMenu onOpenAuth={() => {}} />
            <ThemeToggleSwitch />

            {onBackToDashboard && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToDashboard}
                className="gap-1.5 text-xs border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))]"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View System Architecture</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-md mx-auto px-4 sm:px-6 py-8 md:py-12 flex-1 w-full flex items-center justify-center">
        <motion.div 
          layout
          className="relative w-full rounded-3xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 glow-hover-green"
          transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        >
          


          {/* Form Content with Framer Motion AnimatePresence */}
          <motion.div layout className="min-h-[430px] flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {authMode === 'login' ? (
                <LoginForm key="login-form" onSwitchToRegister={() => setAuthMode('register')} />
              ) : (
                <RegisterForm key="register-form" onSwitchToLogin={() => setAuthMode('login')} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer Security Note */}
          <div className="pt-4 border-t border-[hsl(var(--border))] text-center">
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
              End-to-End Encrypted Realtime Communications
            </p>
          </div>

        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))/0.9] py-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© Calio Realtime Communications Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="hover:text-[hsl(var(--primary))] transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[hsl(var(--primary))] transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[hsl(var(--primary))] transition-colors cursor-pointer">System Status</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
