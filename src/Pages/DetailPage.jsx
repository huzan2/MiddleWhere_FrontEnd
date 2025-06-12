import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { requestShareSearchResult } from '../Apis/detail';

function DetailPage() {
  const location = useLocation();
  const { results, tag } = location.state;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    console.log(results);

    if (window.kakao && window.kakao.maps) {
      const mapContainer = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(
          results.main_place.lat,
          results.main_place.lon,
        ),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);

      const centerMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          results.main_place.lat,
          results.main_place.lon,
        ),
        map: map,
      });
      results.real_places.forEach((place) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(place.lat, place.lon),
          map: map,
        });
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:13px;">${place.place_name}</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });
      });
    }
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

      <MapWrapper id="map" />

      <ResultList>
        {results.real_places.map((place, idx) => (
          <ResultCard key={idx}>
            <PlaceName>{place.place_name}</PlaceName>
            <Category>{place.category}</Category>
            <Address>임시주소</Address>
          </ResultCard>
        ))}
      </ResultList>
      <ShareButton onClick={handleShare}>📎 결과 공유하기</ShareButton>
    </Container>
  );
}

export default DetailPage;

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;
const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  background-color: #eee;
  margin-bottom: 20px;
`;
const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;
const ResultCard = styled.div`
  padding: 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
`;
const PlaceName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #222;
  margin-bottom: 4px;
`;
const Category = styled.div`
  font-size: 13px;
  color: #888;
`;
const Address = styled.div`
  font-size: 13px;
  color: #666;
`;
const ShareButton = styled.button`
  width: 100%;
  background: #ffeb00;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-weight: bold;
  font-size: 16px;
`;
