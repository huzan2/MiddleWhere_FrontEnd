import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/default-profile.png';

function CreatePage() {
  const [meetName, setMeetName] = useState('');
  const [meetTag, setMeetTag] = useState('식사');
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const friendsPerPage = 6;

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('kakao_user'));

  const totalPages = Math.ceil(friends.length / friendsPerPage);
  const paginatedFriends = friends.slice(
    (currentPage - 1) * friendsPerPage,
    currentPage * friendsPerPage
  );

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`/api/friend/list/${user.id}`);
        console.log('✅ 친구 목록 응답:', res.data);
        setFriends(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('❌ 친구 목록 불러오기 실패:', err);
        setFriends([]);
      }
    };
    fetchFriends();
  }, [user.id]);

  const toggleFriend = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreateMeeting = async () => {
    if (!meetName.trim()) {
      alert('모임 이름을 입력해주세요!');
      return;
    }
    try {
      const res = await axios.post('/api/meeting/info', {
        meetName,
        meetTag,
        ownerId: user.id,
      });
      const meetId = res.data.meetId;

      await axios.post('/api/meeting/adduser', {
        meetId,
        userId: user.id,
        memberName: user.properties?.nickname || user.kakao_account?.profile?.nickname,
        memberLocation: user.userDefaultLocation,
      });

      await Promise.all(
        selectedFriends.map((friendId) =>
          axios.post('/api/meeting/inviteuser', {
            meetId,
            friendId,
          })
        )
      );

      alert('모임이 생성되었습니다!');
      navigate('/search', { state: { meetId } });
    } catch (err) {
      console.error('모임 생성 실패', err);
      alert('모임 생성 중 오류 발생');
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <Title>새 모임 생성하기</Title>

      <Input
        placeholder="모임 이름"
        value={meetName}
        onChange={(e) => setMeetName(e.target.value)}
      />

      <Tags>
        {['식사', '데이트', '영화', '공부'].map((tag) => (
          <Tag
            key={tag}
            selected={meetTag === tag}
            onClick={() => setMeetTag(tag)}
          >
            #{tag}
          </Tag>
        ))}
      </Tags>

      <SubTitle>친구 초대 ({selectedFriends.length}명 선택됨)</SubTitle>
      <FriendGrid>
        {paginatedFriends.map((friend) => (
          <AvatarWrapper
            key={friend.friendId}
            selected={selectedFriends.includes(friend.friendId)}
            onClick={() => toggleFriend(friend.friendId)}
          >
            <AvatarImage src={friend.profileImage || defaultAvatar} alt="avatar" />
            <AvatarName>{friend.friendName || friend.userName}</AvatarName>
          </AvatarWrapper>
        ))}
      </FriendGrid>

      <PageControls>
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>◀</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}>{i + 1}</button>
        ))}
        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>▶</button>
      </PageControls>

      <Button onClick={handleCreateMeeting}>새 모임 생성하기</Button>
    </Container>
  );
}

export default CreatePage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h1`font-size: 20px; margin-bottom: 16px;`;
const Input = styled.input`width: 100%; padding: 12px; border: 1px solid #ccc; margin-bottom: 12px; border-radius: 8px;`;
const Tags = styled.div`display: flex; gap: 10px; margin-bottom: 20px;`;
const Tag = styled.button`padding: 6px 12px; background: ${({ selected, theme }) => selected ? theme.colors.primary : '#eee'}; color: ${({ selected }) => (selected ? '#fff' : '#000')}; border: none; border-radius: 6px; cursor: pointer;`;
const SubTitle = styled.h3`margin-top: 16px; margin-bottom: 8px;`;

const FriendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;

const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ccc;
  object-fit: cover;
`;

const AvatarName = styled.div`
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
`;

const PageControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;

  button {
    background: none;
    border: none;
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
`;