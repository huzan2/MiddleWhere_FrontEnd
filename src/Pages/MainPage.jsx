import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { useNavigate } from 'react-router-dom';
import { getMyMeetings, getMyGroups } from '../Apis/main';

function MainPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [meets, setMeets] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetData = await getMyMeetings(user.id);
        const groupData = await getMyGroups(user.id);
        setMeets(Array.isArray(meetData) ? meetData : []);
        setGroups(Array.isArray(groupData) ? groupData : []);
      } catch (err) {
        console.warn('데이터 불러오기 실패:', err);
        setMeets([]);
        setGroups([]);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <Section>
        <Title>내 모임</Title>
        {meets.length === 0 ? <EmptyText>모임이 없습니다.</EmptyText> : (
          <CardList>
            {meets.map((m, idx) => (
              <Card key={idx} onClick={() => navigate('/search', { state: { meetId: m.meetId } })}>
                {m.meetName}
              </Card>
            ))}
          </CardList>
        )}
      </Section>

      <Section>
        <Title>내 그룹</Title>
        {groups.length === 0 ? <EmptyText>그룹이 없습니다.</EmptyText> : (
          <CardList>
            {groups.map((g, idx) => (
              <Card key={idx}>{g.groupName}</Card>
            ))}
          </CardList>
        )}
      </Section>
    </Container>
  );
}

export default MainPage;

const Container = styled.div`padding: 20px;`;
const Section = styled.section`margin-bottom: 32px;`;
const Title = styled.h2`font-size: 20px; margin-bottom: 12px;`;
const EmptyText = styled.div`color: gray; font-size: 14px; margin-top: 8px;`;
const CardList = styled.div`display: flex; flex-direction: column; gap: 12px;`;
const Card = styled.div`padding: 14px; border-radius: 10px; background: #f5f5f5; cursor: pointer; font-size: 16px; font-weight: 500;`;
