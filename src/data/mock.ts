// 서버 요청 없이 사용하는 고정 데이터. 촬영마다 날짜와 순서가 동일합니다.
export const neighbor = { name: '영철', location: '공릉동' };
export const activity = {
  id: 'walk-001',
  title: '아침 햇살 따라\n함께 걸어요',
  category: '함께하는 산책',
  location: '경춘선숲길',
  time: '내일 오전 9:00',
  duration: '30분',
  participants: 3,
  capacity: 6,
  host: '수진',
  description:
    '서두르지 않고 우리 동네를 걸어요.\n가벼운 옷차림과 편한 신발이면 충분해요.\n처음 오시는 이웃도 환영합니다.',
};
export type Scene = 'home' | 'detail' | 'complete';
export const scenes: { id: Scene; label: string }[] = [
  { id: 'home', label: '홈' },
  { id: 'detail', label: '활동 상세' },
  { id: 'complete', label: '참여 완료' },
];
export function isScene(value: string | null): value is Scene {
  return scenes.some((scene) => scene.id === value);
}
