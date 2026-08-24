import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { InteractiveCardWrapper } from '@/components/ui/card-wrapper'
import { Badge } from '@/components/ui/badge'
import { PageTransition, FadeIn, HoverScale, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { LottiePlayer } from '@/components/ui/lottie-player'
import pulseLottie from '@/assets/lottie/pulse-check.json'
import { useUIStore } from '@/store/useUIStore'
import { useAuthStore } from '@/store/useAuthStore'
import { AuthStatusCard, AuthPage, AuthModal, ProfileHeaderMenu } from '@/features/auth'
import { RealtimeChatApp } from '@/features/chat'
import { 
  RefreshCw, 
  CheckCircle2, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Code,
  Sun,
  Moon,
  MousePointerClick,
  Leaf,
  SlidersHorizontal,
  Bell,
  Check,
  Info,
  AlertCircle,
  LogIn,
  UserCheck,
  MessageSquare
} from 'lucide-react'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

// Simulated API fetcher
async function fetchSystemStatus() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    status: 'Operational',
    version: '3.0.0',
    libraries: 'Framer Motion + Zustand + Lottie React',
    themeEngine: 'Dark Green + Electric Neon / Light White + Avocado',
    activeServices: [
      { name: 'Auth & Login Page Module', status: 'Active', latency: '1ms' },
      { name: 'Framer Motion Animation Engine', status: 'Active', latency: '1ms' },
      { name: 'Zustand Global Auth Store', status: 'Ready', latency: '0ms' },
    ],
    timestamp: new Date().toLocaleTimeString(),
  }
}

import { ThemeToggleSwitch } from '@/components/ui/ThemeToggleSwitch'

// Notification Toast Banner Component (powered by Zustand useUIStore)
function ToastNotifications() {
  const { notifications, removeNotification } = useUIStore()

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <FadeIn
          key={n.id}
          className="pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--card))/0.95] backdrop-blur-md shadow-2xl text-xs space-x-3"
        >
          <div className="flex items-center space-x-2.5">
            {n.type === 'success' && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
            {n.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {n.type === 'info' && <Info className="w-4 h-4 text-[hsl(var(--primary))] shrink-0" />}
            <span className="text-[hsl(var(--foreground))] font-medium">{n.message}</span>
          </div>
          <button
            onClick={() => removeNotification(n.id)}
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] text-xs font-bold px-1.5 py-0.5 cursor-pointer"
          >
            ✕
          </button>
        </FadeIn>
      ))}
    </div>
  )
}

function MainDashboard({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [activeView, setActiveView] = useState<'chat' | 'dashboard'>('chat')
  const [selectedCard, setSelectedCard] = useState<string | null>('card-1')
  
  const { effectiveTheme } = useTheme()
  const { addNotification } = useUIStore()
  const { user } = useAuthStore()

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['systemStatus'],
    queryFn: fetchSystemStatus,
  })

  return (
    <PageTransition className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-[hsl(var(--primary))] selection:text-[hsl(var(--primary-foreground))] flex flex-col justify-between transition-colors duration-300">
      
      {/* Background glow graphics */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {effectiveTheme === 'dark' ? (
          <>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#84ff00]/10 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#38b000]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#70e000]/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#4b7012]/10 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#70e000]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#568203]/10 rounded-full blur-3xl" />
          </>
        )}
      </div>

      {/* Header Navigation */}
      <header className="relative z-20 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/0.85] backdrop-blur-md px-6 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center shadow-lg shadow-[hsl(var(--primary)/0.25)] transition-transform hover:scale-105">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[hsl(var(--foreground))] flex items-center gap-2">
                Calio Realtime Platform
              </h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                WhatsApp-Style Chat, Voice & 4K Video Workspace
              </p>
            </div>
          </div>

          {/* View Mode Switcher Pill */}
          <div className="flex items-center p-1 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm">
            <button
              type="button"
              onClick={() => setActiveView('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'chat'
                  ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              💬 WhatsApp Chat & Calls
            </button>
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              📊 System Diagnostics
            </button>
          </div>

          <div className="flex items-center gap-3">
            <ProfileHeaderMenu onOpenAuth={onOpenAuth} />
            <ThemeToggleSwitch />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-8">
        {activeView === 'chat' ? (
          <RealtimeChatApp />
        ) : (
          <>
        
        {/* Hero Banner */}
        <FadeIn className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.1)] text-xs font-semibold text-[hsl(var(--primary))] mb-2">
            <LottiePlayer animationData={pulseLottie} width={18} height={18} />
            Modern Auth & Registration Page Ready
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            High Aesthetic <span className="text-[hsl(var(--primary))] underline decoration-[hsl(var(--primary)/0.5)] underline-offset-8">Login & Registration</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base md:text-lg leading-relaxed">
            Switchable Sign In and Create Account screens built with Framer Motion, Lottie vectors, glassy cards, and Zustand state persistence.
          </p>
          <div className="pt-2">
            <Button
              variant="neon"
              size="lg"
              onClick={onOpenAuth}
              className="gap-2 text-sm font-bold shadow-xl"
            >
              <UserCheck className="w-4 h-4 text-[#06180c]" /> Launch Login & Registration Page
            </Button>
          </div>
        </FadeIn>

        {/* Section 1: Auth Status & Architecture */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[hsl(var(--primary))]" /> Active Auth Store & Feature Modules
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Live auth state synced across components.
              </p>
            </div>
            <Badge variant="outline" className="text-xs font-mono">src/features/auth</Badge>
          </div>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StaggerItem className="lg:col-span-1">
              <AuthStatusCard />
            </StaggerItem>

            <StaggerItem className="lg:col-span-2">
              <InteractiveCardWrapper
                variant="gradient"
                title="Auth Feature Architecture"
                description="Modular structure containing switchable Login and Register forms."
                icon={<Code className="w-5 h-5" />}
                badge={<Badge variant="secondary" className="text-[10px]">Auth Module</Badge>}
              >
                <div className="mt-4 p-4 rounded-xl bg-[hsl(var(--background))/0.8] border border-[hsl(var(--border))] font-mono text-xs text-[hsl(var(--muted-foreground))] space-y-1.5 leading-relaxed">
                  <p className="text-[hsl(var(--primary))] font-bold">src/features/auth/components/</p>
                  <p className="pl-4">├── <span className="text-[hsl(var(--foreground))] font-semibold">AuthPage.tsx</span> <span className="text-[10px] text-[hsl(var(--muted-foreground))]">(Switchable container with tab animations)</span></p>
                  <p className="pl-4">├── <span className="text-[hsl(var(--foreground))] font-semibold">LoginForm.tsx</span> <span className="text-[10px] text-[hsl(var(--muted-foreground))]">(Sign In form, password toggle, OAuth buttons)</span></p>
                  <p className="pl-4">├── <span className="text-[hsl(var(--foreground))] font-semibold">RegisterForm.tsx</span> <span className="text-[10px] text-[hsl(var(--muted-foreground))]">(Create Account, strength indicator, terms)</span></p>
                  <p className="pl-4">├── <span className="text-[hsl(var(--foreground))] font-semibold">AuthHeroSection.tsx</span> <span className="text-[10px] text-[hsl(var(--muted-foreground))]">(Lottie graphic, feature highlights, testimonial)</span></p>
                  <p className="pl-4">└── <span className="text-[hsl(var(--foreground))] font-semibold">AuthStatusCard.tsx</span> <span className="text-[10px] text-[hsl(var(--muted-foreground))]">(Zustand session status indicator card)</span></p>
                </div>
              </InteractiveCardWrapper>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Section 2: Reusable Interactive Card Wrappers */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))] flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-[hsl(var(--primary))]" /> Interactive Card Wrappers
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Cards integrated with Framer Motion spring physics and Lottie feedback.
              </p>
            </div>
            <Badge variant="outline" className="text-xs">4 Interactive Cards</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <HoverScale>
              <InteractiveCardWrapper
                variant="interactive"
                title="Framer Motion Card"
                description="Spring scale physics on hover and press."
                icon={<MousePointerClick className="w-5 h-5" />}
                badge={<Badge variant="secondary" className="text-[10px]">Framer Motion</Badge>}
                onClick={() => {
                  setSelectedCard('card-1')
                  addNotification('info', 'Framer Motion Spring Card selected.')
                }}
                glowAccent={selectedCard === 'card-1'}
              >
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between">
                  <span>Status: {selectedCard === 'card-1' ? 'Active' : 'Idle'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                </div>
              </InteractiveCardWrapper>
            </HoverScale>

            <HoverScale>
              <InteractiveCardWrapper
                variant="neon"
                title="Lottie Vector Player"
                description="Vector Lottie pulse animation running."
                icon={<Zap className="w-5 h-5" />}
                badge={<Badge variant="default" className="text-[10px]">Lottie React</Badge>}
                onClick={() => {
                  setSelectedCard('card-2')
                  addNotification('success', 'Lottie Vector Player triggered.')
                }}
                glowAccent={selectedCard === 'card-2'}
              >
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between">
                  <span>Lottie Loop:</span>
                  <LottiePlayer animationData={pulseLottie} width={22} height={22} />
                </div>
              </InteractiveCardWrapper>
            </HoverScale>

            <HoverScale>
              <InteractiveCardWrapper
                variant="gradient"
                title="Zustand UI Toast"
                description="Click to dispatch a Zustand toast notification."
                icon={<Bell className="w-5 h-5" />}
                badge={<Badge variant="outline" className="text-[10px]">Zustand Toast</Badge>}
                onClick={() => {
                  setSelectedCard('card-3')
                  addNotification('info', 'Zustand toast notification triggered!')
                }}
                glowAccent={selectedCard === 'card-3'}
              >
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between">
                  <span>Toast Action</span>
                  <span className="text-[hsl(var(--primary))] font-medium">Click Card</span>
                </div>
              </InteractiveCardWrapper>
            </HoverScale>

            <HoverScale>
              <InteractiveCardWrapper
                variant="default"
                title="Glass Wrapper"
                description="Clean glassmorphism backdrop with border hover."
                icon={<SlidersHorizontal className="w-5 h-5" />}
                badge={<Badge variant="secondary" className="text-[10px]">Standard</Badge>}
                onClick={() => {
                  setSelectedCard('card-4')
                  addNotification('info', 'Standard Glass Wrapper selected.')
                }}
                glowAccent={selectedCard === 'card-4'}
              >
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-between">
                  <span>Versatile</span>
                  <span className="text-[hsl(var(--primary))]">Wrapper</span>
                </div>
              </InteractiveCardWrapper>
            </HoverScale>
          </div>
        </section>

        {/* Section 3: Live API & Query Status */}
        <section className="space-y-6">
          <Card className="border-[hsl(var(--primary)/0.3)] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-15 text-[hsl(var(--primary))]">
              <Code className="w-32 h-32" />
            </div>

            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span>TanStack Query & State Diagnostics</span>
                    {isFetching && <RefreshCw className="w-4 h-4 animate-spin text-[hsl(var(--primary))]" />}
                  </CardTitle>
                  <CardDescription>Real-time query lifecycle and reactive state demo.</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="gap-2 shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                  Refetch Diagnostics
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="p-8 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-[hsl(var(--primary))] mx-auto" />
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Loading query diagnostics...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[hsl(var(--background))/0.8] border border-[hsl(var(--border))] space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">Engine Status:</span>
                      <Badge variant="success" className="gap-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        {data?.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">Configured Stack:</span>
                      <span className="font-mono text-[hsl(var(--primary))] font-semibold">{data?.libraries}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">Last Checked:</span>
                      <span className="font-mono text-[hsl(var(--foreground))]">{data?.timestamp}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">Active System Services:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {data?.activeServices.map((service, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[hsl(var(--background))/0.6] border border-[hsl(var(--border))] flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-[hsl(var(--foreground))]">{service.name}</p>
                            <p className="text-[10px] text-emerald-500 flex items-center gap-1 mt-0.5">
                              <ShieldCheck className="w-3 h-3" /> {service.status}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-[10px] font-mono">
                            {service.latency}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="justify-between text-xs text-[hsl(var(--muted-foreground))]">
              <span>Theme: {effectiveTheme.toUpperCase()} MODE</span>
              <span>React 19 + Framer Motion + Zustand</span>
            </CardFooter>
          </Card>
        </section>
        </>
        )}

      </main>

      {/* Floating Toast Notifications */}
      <ToastNotifications />

      {/* Footer */}
      <footer className="relative z-10 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))/0.9] py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© Calio Architecture Setup • Framer Motion, Zustand & Lottie React Ready.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-[hsl(var(--primary))] transition-colors cursor-pointer">Dark Forest Green</span>
            <span>•</span>
            <span className="hover:text-[hsl(var(--primary))] transition-colors cursor-pointer">White Avocado Green</span>
          </div>
        </div>
      </footer>

      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </PageTransition>
  )
}

export default function App() {
  const [view, setView] = useState<'dashboard' | 'auth'>('dashboard')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        {view === 'auth' ? (
          <AuthPage onBackToDashboard={() => setView('dashboard')} />
        ) : (
          <MainDashboard onOpenAuth={() => setIsAuthModalOpen(true)} />
        )}
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
