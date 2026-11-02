import type { NeighborRequest } from '../data/requests';
import { asset } from './Common';

export function RequestCard({ request, open }: { request: NeighborRequest; open: () => void }) {
  return (
    <button className="request-card" onClick={open}>
      <div className="request-author">
        <img src={asset(request.photo)} alt="" width="36" height="36" />
        <span>{request.host} 이웃</span>
        <span className="secondary">{request.postedAt}</span>
      </div>
      <h2>{request.title}</h2>
      <p className="secondary">같은 도움이 필요한 이웃 {request.neighbors}명</p>
      <div className="divider" />
    </button>
  );
}
