import { atom } from 'recoil';

export const formState = atom({
  key: 'formState',
  default: [
    { title: '공사명', content: '' },
    { title: '공종', content: '' },
    { title: '위치', content: '' },
    { title: '날짜', content: '' },
    { title: '내용', content: '' },
  ],
});
