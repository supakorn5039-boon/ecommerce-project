import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedOnScrollCardProps {
  children: ReactNode;
  delay?: number;
  y?: number;
}

export default function AnimatedOnScrollCard({ children, delay = 0.1, y = 50 }: AnimatedOnScrollCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}
