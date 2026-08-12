/*
  시안의 블러 타원 8개를 옮긴 배경.
  가로는 393px 기준 픽셀값이고, 세로는 시안 높이(1681px) 대비 비율로 넣었다.
  실제 기기는 시안보다 짧아서 세로를 고정하면 아래쪽 번짐이 화면 밖으로 밀린다.
*/
const FRAME_HEIGHT = 1681;

const GLOWS = [
  { color: "bg-glow-05/80", left: -110, top: 253, width: 288, height: 1090 },
  { color: "bg-glow-05/80", left: -110, top: 253, width: 288, height: 1543 },
  { color: "bg-glow-05/80", left: 229, top: 253, width: 288, height: 1543 },
  { color: "bg-glow-05/80", left: 52, top: -92, width: 288, height: 1283 },
  { color: "bg-glow-03/40", left: 52, top: 687, width: 288, height: 1090 },
  { color: "bg-glow-03/40", left: 52, top: 710, width: 288, height: 261 },
  { color: "bg-glow-01/40", left: -56, top: -157, width: 504, height: 1567 },
  { color: "bg-glow-02/40", left: -93, top: -131, width: 578, height: 1354 },
];

function ChatBackdrop() {
  return (
    <div
      aria-hidden
      /*
        메시지가 스크롤돼도 배경은 제자리에 둔다.
        fixed는 부모의 최대 폭을 벗어나므로 본문과 같은 폭으로 직접 묶어준다.
      */
      className="from-home-from to-home-to max-w-app pointer-events-none fixed inset-y-0 left-1/2 w-full -translate-x-1/2 overflow-hidden bg-linear-to-b"
    >
      {GLOWS.map((glow, index) => (
        <div
          key={index}
          className={`absolute rounded-full blur-[52px] ${glow.color}`}
          style={{
            left: glow.left,
            width: glow.width,
            top: `${(glow.top / FRAME_HEIGHT) * 100}%`,
            height: `${(glow.height / FRAME_HEIGHT) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default ChatBackdrop;
