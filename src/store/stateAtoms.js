import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: { uid: '' },
});

const geoState = atom({
  key: 'geoState',
  default: { latitude: '', longitude: '' },
});

const boardState = atom({
  key: 'boardState',
  default: [
    { title: '점검국사', content: '' },
    { title: '점검위치', content: '' },
    { title: '점검자', content: '' },
    { title: '점검일', content: '' },
    { title: '점검사항', content: '' },
    { title: '관리번호', content: '' },
  ],
});

const postState = atom({
  key: 'postState',
  default: {
    constructionName: '',
    constructionType: '',
    location: '',
    addr: '',
    date: '',
    imageUrl: '',
    latitude: '',
    longitude: '',
  },
});

export { boardState, userState, geoState, postState };
