import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useUIStore } from '@/store/useUIStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HoverScale } from '@/components/ui/motion'
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  ShieldCheck
} from 'lucide-react'


interface RegisterFormProps {
  onSwitchToLogin: () => void
  onSuccess?: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onSuccess }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setUser } = useAuthStore()
  const { addNotification } = useUIStore()

  // Calculate simple password strength
  const getPasswordStrength = () => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score += 33
    if (/[A-Z]/.test(password) || /[0-9]/.test(password)) score += 33
    if (/[^A-Za-z0-9]/.test(password)) score += 34
    return score
  }

  const strength = getPasswordStrength()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password || !confirmPassword) {
      addNotification('error', 'Please fill in all registration fields.')
      return
    }

    if (password !== confirmPassword) {
      addNotification('error', 'Passwords do not match. Please check and try again.')
      return
    }

    if (!agreeTerms) {
      addNotification('error', 'Please agree to the Terms of Service to proceed.')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setUser(
        {
          id: 'usr_' + Math.random().toString(36).substring(2, 7),
          name: fullName,
          email: email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'user',
        },
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.chatRegisterToken'
      )
      setIsSubmitting(false)
      addNotification('success', `Account created! Welcome to Calio Chat & Video, ${fullName.split(' ')[0]}.`)
      if (onSuccess) onSuccess()
    }, 1200)
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 25, filter: 'blur(4px)', scale: 0.98 }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, x: -25, filter: 'blur(4px)', scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-1.5 text-left">
        <h2 className="text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
          Create Calio Account
        </h2>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Join your team's encrypted channels & instant voice rooms in seconds.
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-1 text-left">
        <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Display Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[hsl(var(--muted-foreground))]">
            <User className="w-4 h-4" />
          </div>
          <Input
            type="text"
            placeholder="Alex Vance"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="pl-10 h-10 bg-[hsl(var(--background))/0.6] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all text-xs"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-1 text-left">
        <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Work Email</label>
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
            className="pl-10 h-10 bg-[hsl(var(--background))/0.6] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all text-xs"
          />
        </div>
      </div>

      {/* Password & Strength Bar */}
      <div className="space-y-1 text-left">
        <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[hsl(var(--muted-foreground))]">
            <Lock className="w-4 h-4" />
          </div>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 pr-10 h-10 bg-[hsl(var(--background))/0.6] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all text-xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-1 pt-1">
            <div className="h-1.5 w-full bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  strength < 40
                    ? 'bg-red-500 w-1/3'
                    : strength < 70
                    ? 'bg-amber-500 w-2/3'
                    : 'bg-[hsl(var(--primary))] w-full'
                }`}
              />
            </div>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))] flex items-center gap-1">
              <span>Encryption rating:</span>
              <span className="font-semibold text-[hsl(var(--primary))]">
                {strength < 40 ? 'Basic' : strength < 70 ? 'Moderate' : 'Strong & Encrypted'}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1 text-left">
        <label className="text-xs font-semibold text-[hsl(var(--foreground))]">Confirm Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[hsl(var(--muted-foreground))]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="pl-10 h-10 bg-[hsl(var(--background))/0.6] border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] transition-all text-xs"
          />
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2 text-left pt-1">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))] accent-[hsl(var(--primary))] cursor-pointer"
        />
        <label htmlFor="agreeTerms" className="text-[11px] text-[hsl(var(--muted-foreground))] select-none cursor-pointer leading-tight">
          I agree to the{' '}
          <span className="text-[hsl(var(--primary))] font-semibold hover:underline">Terms of Service</span> and{' '}
          <span className="text-[hsl(var(--primary))] font-semibold hover:underline">Privacy Policy</span>.
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
              <Loader2 className="w-4 h-4 animate-spin text-[hsl(var(--primary-foreground))]" /> Registering Account...
            </>
          ) : (
            <>
              Create Chat Account <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </HoverScale>

      {/* Switch to Login */}
      <div className="text-center pt-3">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[hsl(var(--primary))] hover:underline cursor-pointer transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.form>
  )
}
