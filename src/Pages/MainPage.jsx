import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Modal';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header'; 
import React, { useState } from 'react';

function MainPage() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const myMeetings = ['소프트 21 번개모임', '벚꽃구경'];
  const myGroups = ['소프트 21'];

  return (
    <Wrapper>
      <Header onMenuClick={() => setMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

      {/* 모임 목록 */}
      <Section>
        <SectionTitle>내가 가입된 모임</SectionTitle>
        <MeetingList>
          {myMeetings.map((meeting, index) => (
            <MeetingItem key={index}>
              <span>{meeting}</span>
              <GoButton onClick={() => navigate('/search')}>바로가기</GoButton>
            </MeetingItem>
          ))}
        </MeetingList>
        <CreateButton onClick={() => setModalOpen(true)}>새 모임 만들기</CreateButton>
      </Section>

      {/* 그룹 카드 */}
      <Section>
        <SectionTitle>내가 속한 그룹</SectionTitle>
        <GroupCard>
          <AvatarGroup>
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarGroup>
          <GroupName>{myGroups[0]}</GroupName>
        </GroupCard>
      </Section>

      {/* 새 모임 모달 */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3>모임 만들기</h3>
          <input type="text" placeholder="모임 이름 입력" style={{ width: '100%', marginTop: '10px' }} />
          <CloseButton onClick={() => setModalOpen(false)}>닫기</CloseButton>
        </Modal>
      )}
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  font-family: 'paybooc-Light';
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const MenuIcon = styled.div`
  cursor: pointer;
`;

const Logo = styled.h1`
  font-family: 'paybooc-Bold';
  font-size: 20px;
  text-align: center;
  line-height: 1.2;
`;

const ProfileArea = styled.div`
  position: relative;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  min-width: 120px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  white-space: nowrap;
  line-height: 1.5; 
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f5f5;
  }
`;


const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-family: 'paybooc-Bold';
  font-size: 18px;
  margin-bottom: 12px;
`;

const MeetingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

const MeetingItem = styled.div`
  background: #f9f9f9;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GoButton = styled.button`
  background: #eee;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #2e4a80;
  }
`;

const GroupCard = styled.div`
  padding: 16px;
  background: #f0f0f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
`;

const AvatarGroup = styled.div`
  display: flex;
  gap: -5px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`;

const GroupName = styled.span`
  font-family: 'paybooc-Light';
  font-size: 14px;
`;

const CloseButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #ddd;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;
