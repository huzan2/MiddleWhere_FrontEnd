import styled from 'styled-components';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header'; 
import React, { useState } from 'react';

function DetailPage() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Header onMenuClick={() => setMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}

      {/* 추천 문구 */}
      <TextWrap>
        <GroupName>소프트 21 번개모임</GroupName>
        <RecommendText>
          모임 장소로 <strong>강남역</strong>을 추천합니다
        </RecommendText>
      </TextWrap>

      {/* 지도 */}
      <MapArea>
        <MapImage src="https://via.placeholder.com/300x250?text=Map+Placeholder" alt="지도" />
      </MapArea>

      {/* 경로/장소 카드 */}
      <CardBox>
        <SubTitle>경로 1</SubTitle>
        <PlaceList>
          <PlaceItem>
            <div>모리카츠 강남역점</div>
            <ButtonRow>
              <DetailButton>상세정보</DetailButton>
              <ShareButton>링크 공유</ShareButton>
            </ButtonRow>
          </PlaceItem>
          <PlaceItem>역삼까치공원</PlaceItem>
          <PlaceItem>알렉산더 커피 워크</PlaceItem>
        </PlaceList>
      </CardBox>
    </Container>
  );
}

export default DetailPage;

const Container = styled.div`
  padding: 20px;
  font-family: 'paybooc-Light';
`;

const TextWrap = styled.div`
  margin: 20px 0;
`;

const GroupName = styled.h2`
  font-size: 16px;
  margin-bottom: 6px;
`;

const RecommendText = styled.div`
  font-size: 16px;

  strong {
    font-weight: bold;
    font-family: 'paybooc-Bold';
  }
`;

const MapArea = styled.div`
  margin: 12px 0;
`;

const MapImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  object-fit: cover;
`;

const CardBox = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-family: 'paybooc-Bold';
  margin-bottom: 12px;
`;

const PlaceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlaceItem = styled.div`
  padding: 12px;
  background: #f5f5f5;
  border-radius: 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const DetailButton = styled.button`
  background: #ddd;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
`;

const ShareButton = styled.button`
  background: #ffeb00;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: bold;
`;
