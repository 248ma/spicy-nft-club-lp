import { motion, useInView, type Variants, type Transition } from 'framer-motion';
import { useRef, ReactNode, useMemo } from 'react';

interface AnimateOnceProps {
  children: ReactNode;
  className?: string;
  variants?: 'fadeInUp' | 'fadeIn' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'staggerContainer';
  delay?: number;
  duration?: number;
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'span';
}

// アニメーションバリアント定義
const animationVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

/**
 * 一度だけアニメーションを実行するラッパーコンポーネント
 * useInViewのonce: trueを使用し、CSSのwill-changeで再描画を最適化
 */
export function AnimateOnce({
  children,
  className = '',
  variants = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  margin = '-100px',
  as = 'div'
}: AnimateOnceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: margin as `${number}px` 
  });

  const selectedVariants = animationVariants[variants];
  
  const transition: Transition = useMemo(() => ({
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
  }), [duration, delay]);

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariants}
      transition={transition}
      style={{ willChange: isInView ? 'auto' : 'opacity, transform' }}
    >
      {children}
    </Component>
  );
}

// スタッガーアイテム用のコンポーネント
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function StaggerItem({ children, className = '', index = 0 }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// カード用のアニメーションコンポーネント
interface AnimateCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  margin?: string;
}

export function AnimateCard({ children, className = '', index = 0, margin = '-50px' }: AnimateCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: margin as `${number}px`
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }}
      style={{ willChange: isInView ? 'auto' : 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

// シーケンシャルアニメーション用（Bonding Curve等）
interface SequentialAnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fade' | 'scale' | 'slideX' | 'slideY';
  margin?: string;
}

export function SequentialAnimate({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.5,
  type = 'fade',
  margin = '-50px'
}: SequentialAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: margin as `${number}px`
  });

  const getVariants = (): Variants => {
    switch (type) {
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'slideX':
        return {
          hidden: { opacity: 0, scaleX: 0 },
          visible: { opacity: 1, scaleX: 1 }
        };
      case 'slideY':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants()}
      transition={{ 
        duration, 
        delay,
        ease: type === 'scale' ? [0.34, 1.56, 0.64, 1] as [number, number, number, number] : [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }}
      style={{ 
        willChange: isInView ? 'auto' : 'opacity, transform',
        originX: type === 'slideX' ? 0 : 0.5
      }}
    >
      {children}
    </motion.div>
  );
}
