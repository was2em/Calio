import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useUIStore } from '@/store/useUIStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HoverScale } from '@/components/ui/motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2
} from 'lucide-react'


interface LoginFormProps {
  onSwitchToRegister: () => void
  onSuccess?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onSuccess }) => {
  const [email, setEmail] = useState('alex.vance@calio.chat')
  const [password, setPassword] = useState('••••••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setUser } = useAuthStore()
  const { addNotification } = useUIStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      addNotification('error', 'Please enter both email and password.')
      return
    }

    setIsSubmitting(true)

    // Simulate login API latency
    setTimeout(() => {
      setUser(
        {
          id: 'usr_' + Math.random().toString(36).substring(2, 7),
          name: email.split('@')[0].replace('.', ' '),
          email: email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'admin',
        },
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.chatToken'
      )
      setIsSubmitting(false)
      addNotification('success', `Welcome back to Calio Chat, ${email.split('@')[0]}!`)
      if (onSuccess) onSuccess()
    }, 1000)
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: -25, filter: 'blur(4px)', scale: 0.98 }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, x: 25, filter: 'blur(4px)', scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="space-y-1.5 text-left">
        <h2 className="text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
          Welcome back to Calio
        </h2>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Enter your credentials to connect to your channels, voice rooms & 4K calls.
        </p>
      </div>

      {/* Social Login Glass Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <HoverScale>
          <button
            type="button"
            onClick={() => addNotification('info', 'Google OAuth sign-in initiated.')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))/0.7] text-xs font-semibold text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--primary)/0.08)] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </button>
        </HoverScale>

        <HoverScale>
          <button
            type="button"
            onClick={() => addNotification('info', 'GitHub OAuth sign-in initiated.')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))/0.7] text-xs font-semibold text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--primary)/0.08)] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-[hsl(var(--foreground))]" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>
        </HoverScale>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-[hsl(var(--border))] w-full"></div>
        <span className="bg-[hsl(var(--card))] px-3 text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold relative z-10 shrink-0">
          or sign in with email
        </span>
      </div>

      {/* Email Input */}
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-semibold text-[hsl(var(--foreground))]">
          Work Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[hsl(var(--muted-foreground))]">
            <Mail className="w-4 h-4" />
          </div>
          <Input
            type="email"
            placeholder="alex.vance@calio.chat"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 h-11 bg-[hsl(var(--background))/0.6] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all text-xs"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[hsl(var(--foreground))]">
            Password
          </label>
          <button
            type="button"
            onClick={() => addNotification('info', 'Password reset instructions sent to your email.')}
            className="text-[11px] font-medium text-[hsl(var(--primary))] hover:underline cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[hsl(var(--muted-foreground))]">
            <Lock className="w-4 h-4" />
          </div>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 pr-10 h-11 bg-[hsl(var(--background))/0.6] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all text-xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center space-x-2 text-left pt-0.5">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] accent-[hsl(var(--primary))] cursor-pointer"
        />
        <label htmlFor="rememberMe" className="text-xs text-[hsl(var(--muted-foreground))] select-none cursor-pointer">
          Stay signed in on this browser
        </label>
      </div>

      {/* Submit Button */}
      <HoverScale className="pt-2">
        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={isSubmitting}
          className="w-full gap-2 text-sm font-bold shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[hsl(var(--primary-foreground))]" /> Connecting to Chat...
            </>
          ) : (
            <>
              Sign In to Chat Room <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </HoverScale>

      {/* Switch to Register */}
      <div className="text-center pt-3">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          No account yet?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-[hsl(var(--primary))] hover:underline cursor-pointer transition-colors"
          >
            Create one
          </button>
        </p>
      </div>
    </motion.form>
  )
}
