import noHistoryIcon from "@/assets/icons/consultation/no-history.svg";
import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";

function EmptyConsultation() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-5 pt-32.5 pb-21">
      <img src={noHistoryIcon} alt="상담 내역 없음" />

      <p className="mt-6 text-center text-base leading-[1.6] tracking-[-0.4px] text-[#65646D]">
        진행한 상담이 없어요
        <br />
        의료진과 화상으로 상담해보세요.
      </p>

      <Button
        onClick={() => navigate("/consultation/reservation/schedule")}
        className="mt-[26px] h-auto rounded-[37px] bg-[#4B4B4E] px-4 py-3 text-[15px] font-semibold tracking-[-0.375px] text-white"
      >
        화상상담 예약하기
      </Button>
    </div>
  );
}

export default EmptyConsultation;
