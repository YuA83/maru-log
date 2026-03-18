/* ── 타입 정의 ── */
export interface ResumeProject {
  name: string    // 프로젝트명
  client: string  // 발주처
  period: string  // 기간
  role: string    // 주업무
  note?: string   // 특이사항 (없으면 생략)
}

export interface CoverLetterSection {
  title: string   // 문단 제목
  content: string // 본문 (\n으로 줄바꿈)
}

/* ── 데이터 ── */
const aboutData = {
  intro:
      "이 공간은 개발과 일상에서 배운 것들을 기록하는 개인 블로그입니다.\n" +
      "글을 쓰며 생각을 정리하고, 그 과정에서 누군가에게도 도움이 되길 바랍니다.",

  techList: [
    { name: "Java", icon: "Java.png" },
    { name: "JavaScript", icon: "JavaScript.png" },
    { name: "NodeJS", icon: "Node.js.png" },
    { name: "ExpressJS", icon: "Express.png" },
    { name: "Spring Boot", icon: "Spring.png" },
    { name: "AWS", icon: "AWS.png" },
    { name: "Docker", icon: "Docker.png" },
    { name: "Linux", icon: "Linux.png" },
    { name: "PostgreSQL", icon: "PostgresSQL.png" },
    { name: "MySQL", icon: "MySQL.png" },
    { name: "MariaDB", icon: "MariaDB.png" },
    { name: "MongoDB", icon: "MongoDB.png" },
    { name: "Supabase", icon: "Supabase.png" },
  ],

  contact: [
    { k: "email", v: "yua._.83@icloud.com" },
    { k: "git", v: "https://github.com/YuA83" },
  ],

  /* ── 경력 기술서 ── */
  resume: [
    {
      name: "프로젝트명을 입력하세요",
      client: "발주처를 입력하세요",
      period: "2024.01 – 2024.06",
      role: "주업무 내용을 입력하세요",
      note: "특이사항을 입력하세요. 없으면 이 줄을 삭제하세요.",
    },
  ] as ResumeProject[],

  /* ── 자기소개서 ── */
  coverLetter: [
    {
      title: "성장 과정",
      content: "내용을 입력하세요.\n두 번째 줄.",
    },
    {
      title: "지원 동기",
      content: "내용을 입력하세요.",
    },
    {
      title: "직무 역량",
      content: "내용을 입력하세요.",
    },
    {
      title: "입사 후 포부",
      content: "내용을 입력하세요.",
    },
  ] as CoverLetterSection[],
}

export default aboutData