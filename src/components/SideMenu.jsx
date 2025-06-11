import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Apis/user';

function SideMenu({ onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('kakao_user'));

  const handleLogout = async () => {
    try {
      await logoutUser(user.id);
    } catch (err) {
      console.warn('로그아웃 API 실패:', err);
    }
    localStorage.removeItem('kakao_user');
    navigate('/');
  };

  return (
    <Overlay onClick={onClose}>
      <MenuContainer onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>닫기 ✕</CloseBtn>
        <MenuItem onClick={() => navigate('/main')}>메인화면</MenuItem>
        <MenuItem onClick={() => navigate('/friends')}>친구 관리</MenuItem>
        <MenuItem onClick={() => navigate('/groups')}>그룹 관리</MenuItem>
        <MenuItem onClick={() => navigate('/history')}>이용 기록</MenuItem>
        <MenuItem onClick={() => navigate('/questions')}>문의 사항</MenuItem>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </MenuContainer>
    </Overlay>
  );
}

export default SideMenu;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-start;
`;

const MenuContainer = styled.div`
  width: 240px;
  height: 100%;
  background: white;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CloseBtn = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const MenuItem = styled.button`
  text-align: left;
  font-size: 16px;
  padding: 10px;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
`;

const LogoutButton = styled(MenuItem)`
  background: #ffe5e5;
  color: red;
  font-weight: bold;
`;
