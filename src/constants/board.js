const BOARD_BUTTON_LIST = [
  { name: '안전점검', type: 1 },
  { name: '패트롤', type: 2 },
  { name: 'SRT', type: 3 },
  { name: '국사점검', type: 4 },
  { name: '기타', type: 5 },
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
    { title: '', content: '' },
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
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
  ],
};

export { BOARD_BUTTON_LIST, BOARD_TYPES };
