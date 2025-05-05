import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header'; 
import React, { useState } from 'react';

const members = [
  { name: '김철수', location: '서울특별시 노원구 월계동' },
  { name: '김영희', location: '서울특별시 마포구 연남동' },
  { name: '사용자1', location: '경기도 성남시 분당구 삼평동' },
];

function SearchPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Header onMenuClick={() => setMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

      {/* 그룹원 리스트 */}
      <ContentBox>
        <GroupTitle>소프트 21 번개모임</GroupTitle>
        <MemberList>
          {members.map((user, idx) => (
            <Member key={idx}>
              <Avatar>{user.name[0]}</Avatar>
              <UserInfo>
                <div>{user.name}</div>
                <div>{user.location}</div>
              </UserInfo>
              <EditButton>위치 수정</EditButton>
            </Member>
          ))}
          <AddMember>+</AddMember>
        </MemberList>
      </ContentBox>

      {/* 태그 */}
      <TagRow>
        {['식사', '데이트', '영화', '공부'].map((tag, i) => (
          <Tag key={i}># {tag}</Tag>
        ))}
      </TagRow>

      <ConfirmButton onClick={() => navigate('/detail')}>
        검색결과 확인하기
      </ConfirmButton>
    </Container>
  );
}

export default SearchPage;

const Container = styled.div`
  padding: 20px;
  font-family: 'paybooc-Light';
`;

const ContentBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
`;

const GroupTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EditButton = styled.button`
  background: #eee;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
`;

const AddMember = styled.div`
  background: #eee;
  text-align: center;
  padding: 16px;
  border-radius: 10px;
  font-size: 20px;
  color: #999;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const Tag = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  background: #f0f0f0;
  font-size: 14px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
