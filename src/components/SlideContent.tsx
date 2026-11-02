import type { ReactNode } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { pageTransition } from './NavigationPage';

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-28%' }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction > 0 ? '-28%' : '100%' }),
};

function ContentPage({ children, direction }: { children: ReactNode; direction: number }) {
  const present = useIsPresent();
  return (
    <motion.div
      className="slide-content-page"
      inert={!present ? true : undefined}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

export function SlideContent({
  page,
  direction,
  children,
}: {
  page: string;
  direction: number;
  children: ReactNode;
}) {
  return (
    <div className="slide-content">
      <AnimatePresence initial={false} custom={direction}>
        <ContentPage key={page} direction={direction}>
          {children}
        </ContentPage>
      </AnimatePresence>
    </div>
  );
}
