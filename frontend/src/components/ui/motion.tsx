import React from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'


export interface MotionBoxProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  duration?: number
}

export const PageTransition: React.FC<MotionBoxProps> = ({
  children,
  className,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const FadeIn: React.FC<MotionBoxProps> = ({
  children,
  delay = 0,
  duration = 0.4,
  className,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export const StaggerContainer: React.FC<MotionBoxProps> = ({
  children,
  className,
  ...props
}) => (
  <motion.div
    variants={staggerVariants}
    initial="hidden"
    animate="show"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)

export const StaggerItem: React.FC<MotionBoxProps> = ({
  children,
  className,
  ...props
}) => (
  <motion.div variants={itemVariants} className={className} {...props}>
    {children}
  </motion.div>
)

export const HoverScale: React.FC<MotionBoxProps> = ({
  children,
  className,
  ...props
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
)
