import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import {
  getUserGroups,
  createGroup,
  getGroupDetail,
  updateGroupInfo,
  deleteGroup,
  leaveGroup
} from '../Apis/group';

function GroupPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [newGroupName, setNewGroupName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const res = await getUserGroups(user.id);
      if (Array.isArray(res)) setGroups(res);
    } catch (err) {
      console.warn('⚠️ 그룹 API 불러오기 실패:', err);
      setGroups([]);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user.id]);

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    try {
      await createGroup({ groupName: newGroupName, ownerId: user.id });
      setNewGroupName('');
      fetchGroups();
    } catch (err) {
      alert('그룹 생성 실패');
    }
  };

  const handleViewDetail = async (groupId) => {
    try {
      const detail = await getGroupDetail(groupId);
      alert(`그룹명: ${detail.groupName}\n멤버 수: ${detail.members.length}`);
    } catch (err) {
      alert('그룹 상세정보 조회 실패');
    }
  };

  const handleEditGroup = async (groupId) => {
    const newName = prompt('새 그룹 이름을 입력하세요');
    if (!newName?.trim()) return;
    try {
      await updateGroupInfo({ groupId, groupName: newName });
      alert('그룹명이 수정되었습니다.');
      fetchGroups();
    } catch (err) {
      alert('그룹 수정 실패');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm('정말 이 그룹을 삭제하시겠습니까?')) return;
    try {
      await deleteGroup(groupId);
      alert('그룹이 삭제되었습니다.');
      fetchGroups();
    } catch (err) {
      alert('그룹 삭제 실패');
    }
  };

  const handleLeaveGroup = async () => {
    if (!window.confirm('정말 그룹을 탈퇴하시겠습니까?')) return;
    try {
      await leaveGroup(user.id);
      alert('그룹 탈퇴 완료');
      fetchGroups();
    } catch (err) {
      alert('그룹 탈퇴 실패');
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

      {groups.length === 0 ? (
        <EmptyText>등록된 그룹이 없습니다.</EmptyText>
      ) : (
        <GroupList>
          {groups.map((g) => (
            <GroupItem key={g.groupId}>
              <span>{g.groupName}</span>
              <GroupButtons>
                <SmallBtn onClick={() => handleViewDetail(g.groupId)}>상세</SmallBtn>
                <SmallBtn onClick={() => handleEditGroup(g.groupId)}>수정</SmallBtn>
                <SmallBtn onClick={() => handleDeleteGroup(g.groupId)}>삭제</SmallBtn>
              </GroupButtons>
            </GroupItem>
          ))}
        </GroupList>
      )}

      <LeaveButton onClick={handleLeaveGroup}>그룹 탈퇴</LeaveButton>
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
const GroupItem = styled.div`padding: 10px; border: 1px solid #eee; border-radius: 8px; background: #fafafa; display: flex; justify-content: space-between; align-items: center;`;
const GroupButtons = styled.div`display: flex; gap: 8px;`;
const SmallBtn = styled.button`padding: 4px 8px; font-size: 12px; border: 1px solid #ccc; border-radius: 6px; background: white; cursor: pointer;`;
const LeaveButton = styled.button`margin-top: 20px; padding: 10px; background: #eee; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; cursor: pointer;`;
const EmptyText = styled.div`text-align: center; margin-top: 40px; color: gray; font-size: 14px;`;

