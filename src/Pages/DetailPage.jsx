import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { requestShareSearchResult } from '../Apis/detail';

function DetailPage() {
  const location = useLocation();
  const { results, tag, members } = location.state || {};
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    if (!results || !results.places) return;
    // 지도 표시 생략
  }, [results]);

  const handleShare = async () => {
    try {
      const data = await requestShareSearchResult();
      alert('공유되었습니다!');
      console.log(data);
    } catch (err) {
      alert('공유 실패');
      console.error(err);
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      <Title>추천 결과 - {tag}</Title>
      <ShareButton onClick={handleShare}>공유하기</ShareButton>
      {/* 결과 표시 영역 생략 */}
    </Container>
  );
}

export default DetailPage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 20px; margin-bottom: 16px;`;
const ShareButton = styled.button`padding: 10px 16px; font-size: 14px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;`;
