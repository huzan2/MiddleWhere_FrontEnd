import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import defaultAvatar from '../assets/default-profile.png';
import { axiosInstance } from '@/Apis/@core';

function MainPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('kakao_user'));

  const [myMeetings, setMyMeetings] = useState([
    { meetId: 1, meetName: '점심약속' },
    { meetId: 2, meetName: '스터디모임' },
    { meetId: 3, meetName: '데이트플랜' },
  ]);

  const [myGroups, setMyGroups] = useState([
    {
      groupId: 1,
      groupName: '동네친구들',
      members: [defaultAvatar, defaultAvatar, defaultAvatar],
    },
    {
      groupId: 2,
      groupName: '회사동료들',
      members: [defaultAvatar, defaultAvatar, defaultAvatar],
    },
  ]);

  useEffect(() => {
    const fetchMyMeetings = async () => {
      try {
        // 통신 테스트
        const testres = await axiosInstance.get('/test/users');
        console.log(testres.data);
        const res = await axios.get(`/api/user/mymeeting/${user.id}`);
        if (Array.isArray(res.data)) setMyMeetings(res.data);
      } catch (err) {
        console.warn('⚠️ 모임 API 불러오기 실패. 임시 모임 사용 중');
      }
    };

    const fetchMyGroups = async () => {
      try {
        const res = await axios.get(`/api/user/mygroup/${user.id}`);
        if (Array.isArray(res.data)) setMyGroups(res.data);
      } catch (err) {
        console.warn('⚠️ 그룹 API 불러오기 실패. 임시 그룹 사용 중');
      }
    };

    fetchMyMeetings();
    fetchMyGroups();
  }, [user.id]);

  return (
    <Wrapper>
      <Header onMenuClick={() => setMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

      <Section>
        <SectionTitle>내가 가입된 모임</SectionTitle>
        <MeetingList>
          {myMeetings.map((meeting, index) => (
            <MeetingItem key={index}>
              <span>{meeting.meetName}</span>
              <GoButton
                onClick={() =>
                  navigate('/search', { state: { meetId: meeting.meetId } })
                }
              >
                바로가기
              </GoButton>
            </MeetingItem>
          ))}
        </MeetingList>
        <CreateButton onClick={() => navigate('/create')}>
          새 모임 만들기
        </CreateButton>
      </Section>

      <Section>
        <SectionTitle>내가 속한 그룹</SectionTitle>
        {myGroups.map((group, index) => (
          <GroupCard key={index}>
            <AvatarGroup>
              {(group.members || [1, 2, 3]).map((img, idx) => (
                <Avatar
                  key={idx}
                  src={typeof img === 'string' ? img : defaultAvatar}
                />
              ))}
            </AvatarGroup>
            <GroupName>{group.groupName}</GroupName>
          </GroupCard>
        ))}
      </Section>
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  padding: 24px;
`;
const Section = styled.div`
  margin-bottom: 32px;
`;
const SectionTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 12px;
  font-family: 'paybooc-Bold';
`;
const MeetingList = styled.div`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 12px;
`;
const MeetingItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const GoButton = styled.button`
  background: #333;
  color: white;
  font-size: 12px;
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
`;
const CreateButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  margin-top: 12px;
`;
const GroupCard = styled.div`
  background: #f1f1f1;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
`;
const AvatarGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
`;
const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ccc;
  object-fit: cover;
`;
const GroupName = styled.div`
  font-size: 14px;
`;
