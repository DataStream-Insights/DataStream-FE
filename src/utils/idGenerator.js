export const generateFilterId = () => {
  // 현재 날짜 정보
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // 년도 2자리
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 월 2자리
  const day = now.getDate().toString().padStart(2, "0"); // 일 2자리
  const hours = now.getHours().toString().padStart(2, "0"); // 시 2자리
  const minutes = now.getMinutes().toString().padStart(2, "0"); // 분 2자리
  const seconds = now.getSeconds().toString().padStart(2, "0"); // 초 2자리

  // 밀리초 3자리
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

  // 3자리 랜덤 숫자
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  // 최종 ID 생성 (18자리)
  // 형식: YYMMDDHHMMSSXXXRRR
  // YY: 년도 2자리
  // MM: 월 2자리
  // DD: 일 2자리
  // HH: 시 2자리
  // MM: 분 2자리
  // SS: 초 2자리
  // XXX: 밀리초 3자리
  // RRR: 랜덤 숫자 3자리
  const id = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${random}`;

  // Long 타입 범위 내의 숫자로 변환 (Java Long.MAX_VALUE: 9223372036854775807)
  // ID가 Long 범위를 넘지 않도록 적절히 자름
  return id.slice(0, 18);
};
