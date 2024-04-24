const BOARD_BUTTON_LIST = [
  { title: '안전점검', content: 1 },
  { title: '패트롤', content: 2 },
  { title: 'SRT', content: 3 },
  { title: '국사점검', content: 4 },
  { title: '기타', content: 5 },
];

const BOARD_TYPES = {
  1: [
    { title: '점검명', content: '' },
    { title: '관리번호', content: '' },
    { title: '주소', content: '' },
    { title: '지점', content: '' },
    { title: '날짜', content: '' },
    { title: '점검자', content: '' },
  ],
  2: [
    { title: '점검명', content: '' },
    { title: '공사장명', content: '' },
    { title: '주소', content: '' },
    { title: '지점', content: '' },
    { title: '날짜', content: '' },
    { title: '점검자', content: '' },
  ],
  3: [
    { title: '점검일시', content: '' },
    { title: '점검자', content: '' },
    { title: '점검장소', content: '' },
    { title: '작업내용', content: '' },
    { title: '점검결과', content: '' },
    { title: '비고', content: '' },
  ],
  4: [
    { title: '점검일시', content: '' },
    { title: '점검자', content: '' },
    { title: '점검국사', content: '' },
    { title: '점검위치', content: '' },
    { title: '점검사항', content: '' },
    { title: '', content: '' },
  ],
  5: [
    { title: '자유양식', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
  ],
};

// TITLE INPUT란 자체를 수정못하게 하기 위함.
const READ_ONLY_TITLE_LIST = [
  '점검명',
  '관리번호',
  '주소',
  '지점',
  '날짜',
  '점검자',
  '공사장명',
  '점검일시',
  '점검자',
  '점검장소',
  '작업내용',
  '점검결과',
  '점검위치',
  '점검사항',
  '자유양식',
];

// 위치, 날짜 등 수정해서는 안되는 정보 리스트
const READ_ONLY_CONTENT_LIST = ['점검위치', '점검장소', '주소', '점검일시', '장소', '날짜', '점검일', '점검자'];

const MAP_SHOW_LIST = ['점검장소', '주소'];

export { BOARD_BUTTON_LIST, BOARD_TYPES, READ_ONLY_TITLE_LIST, READ_ONLY_CONTENT_LIST, MAP_SHOW_LIST };
