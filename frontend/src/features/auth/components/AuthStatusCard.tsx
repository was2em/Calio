import React from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useUIStore } from '@/store/useUIStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InteractiveCardWrapper } from '@/components/ui/card-wrapper'
import { HoverScale, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { LottiePlayer } from '@/components/ui/lottie-player'
import pulseLottie from '@/assets/lottie/pulse-check.json'
import { User, LogIn, LogOut, ShieldCheck, KeyRound } from 'lucide-react'


export const AuthStatusCard: React.FC = () => {
  const { user, isAuthenticated, setUser, logout } = useAuthStore()
  const { addNotification } = useUIStore()

  const handleMockLogin = () => {
    setUser(
      {
        id: 'usr_101',
        name: 'Alex Vance',
        email: 'alex.vance@calio.app',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'admin',
      },
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken'
    )
    addNotification('success', 'Logged in successfully as Alex Vance!')
  }

  const handleMockLogout = () => {
    logout()
    addNotification('info', 'Logged out of session.')
  }

  return (
    <InteractiveCardWrapper
      variant="neon"
      title="Zustand Auth & Motion State"
      description="Pre-configured state management with Framer Motion & Lottie React."
      icon={<ShieldCheck className="w-5 h-5" />}
      badge={
        <Badge
          variant={isAuthenticated ? 'success' : 'outline'}
          className="gap-1 font-mono text-[10px]"
        >
          {isAuthenticated ? 'Authenticated' : 'Logged Out'}
        </Badge>
      }
    >
      <StaggerContainer className="mt-4 space-y-4">
        {isAuthenticated && user ? (
          <StaggerItem className="p-4 rounded-xl bg-[hsl(var(--background))/0.8] border border-[hsl(var(--primary)/0.3)] space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-[hsl(var(--primary))]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4">
                  <LottiePlayer animationData={pulseLottie} width={16} height={16} />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">{user.name}</h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[hsl(var(--border))]">
              <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-[hsl(var(--primary))]" /> Role:
              </span>
              <span className="font-mono text-[hsl(var(--primary))] font-semibold uppercase">{user.role}</span>
            </div>

            <HoverScale className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                onClick={handleMockLogout}
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out Session
              </Button>
            </HoverScale>
          </StaggerItem>
        ) : (
          <StaggerItem className="p-4 rounded-xl bg-[hsl(var(--background))/0.6] border border-[hsl(var(--border))] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.3)] mx-auto flex items-center justify-center text-[hsl(var(--primary))]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-[hsl(var(--foreground))]">No active session found</p>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Zustand store ready for Login feature implementation.</p>
            </div>
            <HoverScale>
              <Button
                variant="neon"
                size="sm"
                className="w-full gap-2"
                onClick={handleMockLogin}
              >
                <LogIn className="w-3.5 h-3.5" /> Test Zustand Mock Login
              </Button>
            </HoverScale>
          </StaggerItem>
        )}
      </StaggerContainer>
    </InteractiveCardWrapper>
  )
}
