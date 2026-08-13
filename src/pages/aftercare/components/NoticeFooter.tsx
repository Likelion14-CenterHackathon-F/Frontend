interface NoticeFooterProps {
  title: string;
  items: string[];
}

function NoticeFooter({ title, items }: NoticeFooterProps) {
  return (
    /* grow: 내용이 화면보다 짧을 때 남는 높이를 채워 바탕색이 드러나지 않게 한다 */
    <footer className="bg-notice-bg mt-13 grow px-5 pt-6.5 pb-16">
      <h2 className="text-notice-title text-body font-semibold">{title}</h2>

      <ul className="text-notice-text mt-5 flex list-disc flex-col gap-3.5 ps-5.5 text-[0.9375rem] leading-[1.4] font-medium">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </footer>
  );
}

export default NoticeFooter;
