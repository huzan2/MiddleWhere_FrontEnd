import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { getHistoryList, submitFeedback } from '../Apis/history';

function HistoryPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [histories, setHistories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const res = await getHistoryList(user.id);
        setHistories(Array.isArray(res) ? res : []);
      } catch (err) {
        console.warn('히스토리 불러오기 실패:', err);
        setHistories([]);
      }
    };
    fetchHistories();
  }, [user.id]);

  const handleFeedback = async (id) => {
    const feedback = prompt('피드백을 입력하세요');
    if (!feedback?.trim()) return;
    try {
      await submitFeedback(id, feedback);
      alert('피드백이 등록되었습니다.');
    } catch (err) {
      alert('피드백 등록 실패');
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      <Title>이용 기록</Title>
      {histories.length === 0 ? (
        <EmptyText>이용 기록이 없습니다.</EmptyText>
      ) : (
        <HistoryList>
          {histories.map((h, idx) => (
            <HistoryItem key={idx}>
              <strong>{h.meetName}</strong>
              <p>{h.location}</p>
              <FeedbackBtn onClick={() => handleFeedback(h.historyId)}>피드백 등록</FeedbackBtn>
            </HistoryItem>
          ))}
        </HistoryList>
      )}
    </Container>
  );
}

export default HistoryPage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 20px; margin-bottom: 16px;`;
const HistoryList = styled.div`display: flex; flex-direction: column; gap: 16px;`;
const HistoryItem = styled.div`padding: 12px; border: 1px solid #eee; border-radius: 8px; background: #fafafa;`;
const FeedbackBtn = styled.button`margin-top: 8px; font-size: 13px; padding: 6px 12px; border-radius: 6px; border: none; background: #4f46e5; color: white; cursor: pointer;`;
const EmptyText = styled.div`text-align: center; margin-top: 40px; color: gray; font-size: 14px;`;
