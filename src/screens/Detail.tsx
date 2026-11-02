import { MapPin, Clock3, Users } from 'lucide-react';
import { activity } from '../data/mock';
import { PathArt } from '../components/PathArt';
import { AppHeader } from '../components/AppHeader';
export function Detail({
  joined,
  back,
  join,
}: {
  joined: boolean;
  back: () => void;
  join: () => void;
}) {
  return (
    <>
      <AppHeader title="이웃과 함께" onBack={back} backLabel="홈으로 돌아가기" />
      <PathArt />
      <span className="tag detail-tag">{activity.category}</span>
      <h1 className="detail-title">{activity.title}</h1>
      <div className="facts">
        <p>
          <MapPin size={20} />
          {activity.location}
        </p>
        <p>
          <Clock3 size={20} />
          {activity.time} · {activity.duration}
        </p>
        <p>
          <Users size={20} />
          참여 이웃 {activity.participants + Number(joined)} / {activity.capacity}명
        </p>
      </div>
      <p className="description">{activity.description}</p>
      <div className="host">
        <span className="avatar">수</span>
        <div>
          <strong>{activity.host} 이웃</strong>
          <p className="muted">반가운 만남을 기다려요</p>
        </div>
      </div>
      <div className="bottom-action">
        <button className="primary" disabled={joined} onClick={join}>
          {joined ? '참여 중이에요' : '함께하기'}
        </button>
      </div>
    </>
  );
}
