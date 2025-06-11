import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import defaultAvatar from '../assets/default-profile.png';
import {
  getFriendList,
  addFriend,
  deleteFriend,
  getFriendDetail,
} from '../Apis/friend';

function FriendPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [friends, setFriends] = useState([]);
  const [newFriendCode, setNewFriendCode] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getFriendList(user.id);
        if (Array.isArray(res.data.list)) setFriends(res.list);
      } catch (err) {
        console.warn('⚠️ 친구 목록 로딩 실패:', err);
        setFriends([]);
      }
    };
    fetchFriends();
  }, [user.id]);

  const handleAddFriend = async () => {
    if (!newFriendCode.trim()) return;
    try {
      await addFriend(user.id, newFriendCode);
      setNewFriendCode('');
      const res = await getFriendList(user.id);
      setFriends(res);
    } catch (err) {
      alert('친구 추가 실패');
    }
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      await deleteFriend(user.id, friendId);
      setFriends((prev) => prev.filter((f) => f.friendId !== friendId));
    } catch (err) {
      alert('친구 삭제 실패');
    }
  };

  const handleFriendClick = async (friendId) => {
    try {
      const detail = await getFriendDetail(friendId);
      alert(
        `이름: ${detail.friendName}\n나이: ${detail.age}\n위치: ${detail.defaultLocation}`,
      );
    } catch (err) {
      alert('친구 정보 불러오기 실패');
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      <Title>친구 관리</Title>
      <Row>
        <Input
          placeholder="친구 코드 입력"
          value={newFriendCode}
          onChange={(e) => setNewFriendCode(e.target.value)}
        />
        <Button onClick={handleAddFriend}>추가</Button>
      </Row>
      {friends.length === 0 ? (
        <EmptyText>친구가 없습니다.</EmptyText>
      ) : (
        <FriendList>
          {friends.map((f) => (
            <FriendItem
              key={f.friendId}
              onClick={() => handleFriendClick(f.friendId)}
            >
              <FriendProfile src={f.profileImage || defaultAvatar} />
              <FriendName>{f.friendName || f.userName}</FriendName>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFriend(f.friendId);
                }}
              >
                삭제
              </DeleteButton>
            </FriendItem>
          ))}
        </FriendList>
      )}
    </Container>
  );
}

export default FriendPage;

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;
const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;
const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const Button = styled.button`
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
`;
const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
  cursor: pointer;
`;
const FriendProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const FriendName = styled.span`
  flex: 1;
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-weight: bold;
  cursor: pointer;
`;
const EmptyText = styled.div`
  text-align: center;
  margin-top: 40px;
  color: gray;
  font-size: 14px;
`;
