import type { ReactNode } from 'react';
import { motion, useIsPresent } from 'motion/react';

export const pageTransition = { duration: 0.32, ease: [0.22, 0.68, 0, 1] as const };

export function NavigationPage({
  children,
  covered = false,
  root = false,
}: {
  children: ReactNode;
  covered?: boolean;
  root?: boolean;
}) {
  const present = useIsPresent();
  return (
    <motion.div
      className="navigation-page"
      inert={covered || !present ? true : undefined}
      initial={root ? false : { x: '100%' }}
      animate={{ x: covered ? '-28%' : 0 }}
      exit={{ x: '100%' }}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
