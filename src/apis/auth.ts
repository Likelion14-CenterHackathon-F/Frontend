/**
 * 병원 DB에 등록된 생년월일과 대조하는 자리.
 * 백엔드 명세가 나오기 전까지 고정값으로 대체한다.
 */
const MOCK_PATIENT_BIRTH_DATE = "2000-01-01";

export function verifyBirthDate(birthDate: string): boolean {
  return birthDate === MOCK_PATIENT_BIRTH_DATE;
}
