import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    uid: '', //firebase 제공 id
    dockey: '', //uuid로 생성한 임의 아이디
    name: '',
    team: '',
    email: '',
    // password: '',
    branchType: '',
    centerType: '',
    latestBoardType: '',
    createAt: '',
  },
});

const postState = atom({
  key: 'postState',
  default: {
    constructionName: '',
    constructionType: '',
    constructionDescription: '',
    constructInspector: '',
    addr: '',
    date: '',
    GPSLatitude: '',
    GPSLongitude: '',
    attachmentUrl: '',
    branchType: '',
    centerType: '',
    boardType: '',
    madeBy: '',
    createAt: '',
  },
});

const currentPositionState = atom({
  key: 'currentPositionState',
  default: { latitude: '', longitude: '' },
});

const selectPositionState = atom({
  key: 'selectPositionState',
  default: { latitude: '', longitude: '' },
});

const boardState = atom({
  key: 'boardState',
  default: [],
});

export { boardState, userState, currentPositionState, selectPositionState, postState };
