import React from 'react'
import { Lottie, type LottieProps } from 'lottie-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export interface LottiePlayerProps extends Omit<LottieProps, 'src'> {
  animationData?: any
  src?: any
  dotLottieSrc?: string
  className?: string
  width?: number | string
  height?: number | string
  fallbackText?: string
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationData,
  src,
  dotLottieSrc,
  className = '',
  width = '100%',
  height = '100%',
  loop = true,
  autoplay = true,
  fallbackText = 'Loading Animation...',
  ...props
}) => {
  // If dotLottieSrc is provided (.lottie file format)
  if (dotLottieSrc) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <DotLottieReact
          src={dotLottieSrc}
          loop={Boolean(loop)}
          autoplay={Boolean(autoplay)}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    )
  }


  const animationSrc = animationData || src

  if (!animationSrc) {
    return (
      <div 
        className={`flex items-center justify-center rounded-xl bg-[hsl(var(--secondary)/0.3)] text-xs text-[hsl(var(--muted-foreground))] ${className}`}
        style={{ width, height }}
      >
        {fallbackText}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Lottie
        src={animationSrc}
        loop={loop}
        autoplay={autoplay}
        {...props}
      />
    </div>
  )
}
