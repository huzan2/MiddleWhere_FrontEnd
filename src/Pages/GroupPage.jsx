import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import axios from 'axios';

function GroupPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [newGroupName, setNewGroupName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [groups, setGroups] = useState([
    { groupId: 1, groupName: '동네 친구들' },
    { groupId: 2, groupName: '회사 동료들' },
    { groupId: 3, groupName: '헬스 친구들' },
  ]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`/api/user/mygroup/${user.id}`);
      if (Array.isArray(res.data)) {
        setGroups(res.data);
      }
    } catch (err) {
      console.warn('⚠️ 그룹 API 불러오기 실패. 임시 그룹 사용 중');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user.id]);

  const handleCreateGroup = async () => {
    try {
      await axios.post(`/api/group/create`, {
        groupName: newGroupName,
        ownerId: user.id,
      });
      setNewGroupName('');
      fetchGroups();
    } catch (err) {
      alert('그룹 생성 실패');
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <Title>그룹 관리</Title>

      <Row>
        <Input
          placeholder="새 그룹 이름"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <Button onClick={handleCreateGroup}>생성</Button>
      </Row>

      <GroupList>
        {groups.map((g) => (
          <GroupItem key={g.groupId}>{g.groupName}</GroupItem>
        ))}
      </GroupList>
    </Container>
  );
}

export default GroupPage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 20px; margin-bottom: 16px;`;
const Row = styled.div`display: flex; gap: 8px; margin-bottom: 20px;`;
const Input = styled.input`flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 8px;`;
const Button = styled.button`padding: 10px 16px; background: ${({ theme }) => theme.colors.primary}; color: white; border: none; border-radius: 8px; font-weight: bold;`;
const GroupList = styled.div`display: flex; flex-direction: column; gap: 10px;`;
const GroupItem = styled.div`padding: 10px; border: 1px solid #eee; border-radius: 8px; background: #fafafa;`;
