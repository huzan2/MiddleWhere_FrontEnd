import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { useNavigate } from 'react-router-dom';
import { fetchFriendList } from '../Apis/create';
import { registerMeetingInfo } from '../Apis/create';
import { addUserToMeeting } from '../Apis/meeting';

function CreatePage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  const handleCreateMeeting = async () => {
    if (!groupName.trim()) return;
    try {
      const res = await registerMeetingInfo({
        meetName: groupName,
        ownerId: user.id,
      });
      const meetId = res.meetId;
      for (const f of selectedFriends) {
        await addUserToMeeting({ meetId: meetId, userId: f.userId });
      }
      alert('모임이 생성되었습니다.');
      navigate('/main');
    } catch (err) {
      alert('모임 생성 실패');
    }
  };

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const data = await fetchFriendList(user.id);
        setFriends(Array.isArray(data.list) ? data.list : []);
      } catch (err) {
        console.warn('친구 목록 조회 실패:', err);
        setFriends([]);
      }
    };
    loadFriends();
  }, [user.id]);

  const toggleFriend = (friend) => {
    setSelectedFriends((prev) =>
      prev.some((f) => f.userId === friend.userId)
        ? prev.filter((f) => f.userId !== friend.userId)
        : [...prev, friend],
    );
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <Title>모임 만들기</Title>
      <Label>모임 이름</Label>
      <Input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="모임 이름을 입력하세요"
      />

      <Label>친구 초대</Label>
      <FriendList>
        {friends.map((friend) => (
          <FriendItem
            key={friend.userId}
            selected={selectedFriends.some((f) => f.userId === friend.userId)}
            onClick={() => toggleFriend(friend)}
          >
            {friend.friendName || friend.userName}
          </FriendItem>
        ))}
      </FriendList>

      <SubmitBtn onClick={handleCreateMeeting}>모임 만들기</SubmitBtn>
    </Container>
  );
}

export default CreatePage;

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;
const Label = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
`;
const Input = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
`;
const FriendList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;
const FriendItem = styled.div`
  padding: 8px 12px;
  background: ${({ selected }) => (selected ? '#4f46e5' : '#eee')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  border-radius: 16px;
  cursor: pointer;
`;
const SubmitBtn = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 14px;
  font-weight: bold;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
`;
