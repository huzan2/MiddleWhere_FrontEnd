// src/Apis/meeting.js
import axios from 'axios';

// 모임 인원 삭제
export const removeMemberFromMeeting = async (targetUserId, meetId) => {
  return axios.delete(`/api/meeting/deleteuser/${targetUserId}/${meetId}`);
};

// 모임 탈퇴
export const quitMeeting = async (meetId, userId) => {
  return axios.delete(`/api/meeting/quit/${meetId}/${userId}`);
};

// 모임 삭제
export const deleteMeeting = async (meetId) => {
  return axios.delete(`/api/meeting/delete/${meetId}`);
};

// 출발 위치 수정
export const updateUserLocation = async ({ meetId, userId, newLocation }) => {
  return axios.post('/api/meeting/changelocation', {
    meetId,
    userId,
    newLocation,
  });
};

// 모임 정보 수정
export const updateMeetingInfo = async ({ meetId, newName, newTag }) => {
  return axios.post('/api/meeting/edit', {
    meetId,
    meetName: newName,
    meetTag: newTag,
  });
};

// 모임 친구 추가
export const addUserToMeeting = async ({ meetId, userId }) => {
  return axios.post('/api/meeting/adduser', {
    meetId,
    userId,
  });
};