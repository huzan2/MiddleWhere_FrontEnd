import { atom } from 'recoil';

export const userInfoAtom = atom({
  key: 'userInfoState',
  default: {
    userId: 1,
    userName: '홍길동',
    userProfile: 'none',
    userAge: 25,
    userDefaultLocation: '서울역',
  },
});

export const currentMeeting = atom({
  key: 'currentMeetingState',
  default: {},
});

export const currentGroup = atom({
  key: 'currentGroupState',
  default: {},
});
