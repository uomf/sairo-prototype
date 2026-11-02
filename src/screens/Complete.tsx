import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { activity } from '../data/mock';
export function Complete({ home }: { home: () => void }) {
  return (
    <div className="complete">
      <motion.div
        className="success-mark"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      >
        <Check size={44} />
      </motion.div>
      <p className="eyebrow">새로운 만남의 시작</p>
      <h1>
        함께 걸을 이웃이
        <br />
        생겼어요!
      </h1>
      <p className="muted">내일, 반가운 인사를 나눠보세요.</p>
      <div className="ticket">
        <span className="tag">참여 완료</span>
        <h2>{activity.title.replace('\n', ' ')}</h2>
        <p>{activity.time}</p>
        <p className="muted">{activity.location}</p>
      </div>
      <button className="primary" onClick={home}>
        홈으로 돌아가기
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
