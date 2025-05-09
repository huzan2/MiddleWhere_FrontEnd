// FriendPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import axios from 'axios';
import defaultAvatar from '../assets/default-profile.png';

function FriendPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [friends, setFriends] = useState([
    { friendId: 1, friendName: '홍길동', profileImage: defaultAvatar },
    { friendId: 2, friendName: '김영희', profileImage: defaultAvatar },
    { friendId: 3, friendName: '박철수', profileImage: defaultAvatar },
  ]);
  const [newFriendCode, setNewFriendCode] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddFriend = async () => {
    try {
      await axios.post(`/api/friend/add/${user.id}`, {
        friendCode: newFriendCode,
      });
      setNewFriendCode('');
      // fetchFriends();
    } catch (err) {
      alert('친구 추가 실패');
    }
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      await axios.delete(`/api/friend/delete/${user.id}`, {
        data: { friendId },
      });
      setFriends((prev) => prev.filter((f) => f.friendId !== friendId));
    } catch (err) {
      alert('친구 삭제 실패');
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

      <FriendList>
        {friends.map((f) => (
          <FriendItem key={f.friendId}>
            <FriendProfile src={f.profileImage || defaultAvatar} />
            <FriendName>{f.friendName || f.userName}</FriendName>
            <DeleteButton onClick={() => handleDeleteFriend(f.friendId)}>삭제</DeleteButton>
          </FriendItem>
        ))}
      </FriendList>
    </Container>
  );
}

export default FriendPage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 20px; margin-bottom: 16px;`;
const Row = styled.div`display: flex; gap: 8px; margin-bottom: 20px;`;
const Input = styled.input`flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 8px;`;
const Button = styled.button`padding: 10px 16px; background: ${({ theme }) => theme.colors.primary}; color: white; border: none; border-radius: 8px; font-weight: bold;`;
const FriendList = styled.div`display: flex; flex-direction: column; gap: 10px;`;
const FriendItem = styled.div`display: flex; align-items: center; gap: 12px; padding: 10px; border: 1px solid #eee; border-radius: 8px; background: #fafafa;`;
const FriendProfile = styled.img`width: 40px; height: 40px; border-radius: 50%; object-fit: cover;`;
const FriendName = styled.span`flex: 1;`;
const DeleteButton = styled.button`background: none; border: none; color: red; font-weight: bold; cursor: pointer;`;
