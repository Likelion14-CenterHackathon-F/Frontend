/**
 * 환자가 AI에게 물어본 질문 내역을 내려주는 자리.
 * 백엔드 명세가 나오기 전까지 고정 목 데이터로 대체한다.
 */

export interface QuestionGroup {
  id: "today" | "lastWeek";
  questions: string[];
}

export function getQuestionHistory(): QuestionGroup[] {
  return [
    {
      id: "today",
      questions: [
        "붓기와 멍의 회복 경과",
        "외출 가능 시점과 주의사항",
        "세안 시작 시점과 방법",
        "화장 가능 시기",
        "붉은기와 열감 변화",
      ],
    },
    {
      id: "lastWeek",
      questions: [
        "운동 재개 시점",
        "자외선 차단과 외출 관리",
        "시술 후 보습제 사용 방법",
        "가려움·따가움 증상 관리",
      ],
    },
  ];
}
