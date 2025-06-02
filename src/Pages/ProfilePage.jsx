import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, deleteUser } from '../Apis/profile';

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [defaultLocation, setDefaultLocation] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await updateUserInfo({
        userId: user.id,
        nickname,
        age,
        defaultLocation,
      });
      alert('정보가 저장되었습니다.');
      navigate('/main');
    } catch (err) {
      alert('정보 저장 실패');
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까?')) return;
    try {
      await deleteUser(user.id);
      localStorage.removeItem('kakao_user');
      alert('탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (err) {
      alert('탈퇴 실패');
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      <Title>내 정보</Title>
      <Label>닉네임</Label>
      <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <Label>나이</Label>
      <Input value={age} onChange={(e) => setAge(e.target.value)} />
      <Label>기본 출발 위치</Label>
      <Input value={defaultLocation} onChange={(e) => setDefaultLocation(e.target.value)} />
      <SaveButton onClick={handleSave}>정보 저장</SaveButton>
      <DeleteButton onClick={handleDeleteUser}>회원 탈퇴</DeleteButton>
    </Container>
  );
}

export default ProfilePage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 22px; margin-bottom: 24px;`;
const Label = styled.label`display: block; margin-top: 12px; margin-bottom: 6px; font-weight: bold;`;
const Input = styled.input`width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px;`;
const SaveButton = styled.button`margin-top: 20px; width: 100%; padding: 12px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold;`;
const DeleteButton = styled.button`margin-top: 12px; width: 100%; padding: 10px; background: #eee; border: 1px solid #ccc; border-radius: 8px; font-size: 14px;`;
