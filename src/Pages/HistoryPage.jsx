import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import axios from 'axios';

function HistoryPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [history, setHistory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/api/history/${user.id}`);
        setHistory(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('이용 기록 불러오기 실패:', err);
      }
    };
    fetchHistory();
  }, [user.id]);

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <Title>이용 기록</Title>

      <HistoryList>
        {history.length === 0 ? (
          <EmptyText>이용 기록이 없습니다.</EmptyText>
        ) : (
          history.map((item, idx) => (
            <Record key={idx}>
              <strong>{item.meetName}</strong>
              <div>{item.tag} - {item.centerName}</div>
              <small>{item.date}</small>
            </Record>
          ))
        )}
      </HistoryList>
    </Container>
  );
}

export default HistoryPage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 20px; margin-bottom: 16px;`;
const HistoryList = styled.div`display: flex; flex-direction: column; gap: 16px;`;
const Record = styled.div`padding: 12px; border-radius: 8px; background: #f9f9f9; border: 1px solid #ddd;`;
const EmptyText = styled.div`text-align: center; margin-top: 40px; color: gray;`;
