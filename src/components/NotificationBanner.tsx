import { AnimatePresence, motion } from 'motion/react';

export function NotificationBanner({ receivedAt }: { receivedAt: Date | null }) {
  return (
    <div className="notification-region" role="status" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {receivedAt && (
          <motion.div
            className="notification-banner"
            initial={{ y: -160, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -160, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          >
            <div className="notification-app-icon" aria-hidden="true">
              S
            </div>
            <div className="notification-content">
              <p className="notification-meta">SAIRO · 지금</p>
              <h2>함께 배울 자리가 생겼어요</h2>
              <p className="notification-message">
                윤희 이웃이 문화강좌 신청을
                <br />
                도와주겠다고 제안했어요.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
