import { useState } from 'react';
import { SvgAsset } from '../components/SvgAsset';
import { requests } from '../data/requests';
import { RequestCard } from '../components/RequestCard';
import { activities, type Activity } from '../data/activities';
import { asset, Button, Icon, Tabs } from '../components/Common';
export function ActivityCard({ activity, open }: { activity: Activity; open: () => void }) {
  return (
    <button className="activity-card" onClick={open}>
      <h2>{activity.title}</h2>
      <div className="activity-date">
        <div className="date-tile">
          <span>11월</span>
          <strong>{activity.day}</strong>
        </div>
        <div>
          <p>{activity.time}</p>
          <p className="secondary">{activity.place}</p>
        </div>
      </div>
      <div className="activity-host">
        <img src={asset(activity.photo)} alt="" width="32" height="32" />
        <span>{activity.host} 이웃</span>
        <span className="secondary">
          {activity.people}명 참여 · {activity.capacity}명까지
        </span>
      </div>
      <div className="divider" />
    </button>
  );
}
export function Home({
  open,
  action,
  openRequest,
}: {
  open: (activity: Activity) => void;
  action: (title: string) => void;
  openRequest: () => void;
}) {
  const [tab, setTab] = useState('같이해요');
  return (
    <>
      <header className="top-bar">
        <button className="neighborhood" onClick={() => action('동네 선택')}>
          연남동
          <Icon file="5c49d.svg" />
        </button>
        <Button className="write" onClick={() => action('글쓰기')}>
          ＋ 글쓰기
        </Button>
        <button className="icon-button" aria-label="알림" onClick={() => action('알림')}>
          <Icon file="c6aa4.svg" />
        </button>
      </header>
      <div className="home-body">
        <section className="greeting">
          <h1>
            일상 사이로,
            <br />
            이웃 사이로.
          </h1>
          <SvgAsset file="932b4.svg" alt="함께하는 이웃들" />
        </section>
        <section className="news">
          <div className="section-heading">
            <h2>나의 소식</h2>
            <Button variant="text" onClick={() => action('나의 소식')}>
              모두 보기
            </Button>
          </div>
          <div className="news-card">
            <Icon file="52c7b.svg" />
            <div>
              <p>
                함께 배울 자리가
                <br />
                생겼어요
              </p>
              <p className="secondary">문화강좌 신청 · 윤희 이웃</p>
            </div>
            <Button variant="text" onClick={() => action('함께 배울 자리가 생겼어요')}>
              제안 보기
            </Button>
          </div>
        </section>
        <section>
          <Tabs value={tab} change={setTab} />
          {tab === '같이해요' ? (
            <>
              {activities.map((item) => (
                <ActivityCard key={item.host} activity={item} open={() => open(item)} />
              ))}
              <Button variant="subtle" className="more" onClick={() => action('같이해요 더 보기')}>
                같이해요 더 보기
              </Button>
            </>
          ) : (
            <>
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  open={() =>
                    request.id === 'culture-class' ? openRequest() : action(request.title)
                  }
                />
              ))}
              <Button variant="subtle" className="more" onClick={() => action('부탁해요 더 보기')}>
                부탁해요 더 보기
              </Button>
            </>
          )}
        </section>
      </div>
    </>
  );
}
