/*
  디자인 시안의 블러 처리된 타원 4개를 그대로 옮긴 배경.
  위치와 크기는 393x852 기준이며 가로는 모두 가운데 정렬이다.
*/
const GLOWS = [
  { color: "bg-glow-01/40", top: -157, width: 504, height: 738 },
  { color: "bg-glow-02/40", top: -131, width: 578, height: 525 },
  { color: "bg-glow-03/40", top: 1, width: 288, height: 261 },
  { color: "bg-glow-04/40", top: 416, width: 152, height: 143 },
];

function HomeBackdrop() {
  return (
    <div
      aria-hidden
      className="from-home-from to-home-to pointer-events-none absolute inset-0 overflow-hidden bg-linear-to-b"
    >
      {GLOWS.map((glow) => (
        <div
          key={glow.color}
          className={`absolute left-1/2 -translate-x-1/2 rounded-full blur-[52px] ${glow.color}`}
          style={{ top: glow.top, width: glow.width, height: glow.height }}
        />
      ))}
    </div>
  );
}

export default HomeBackdrop;
