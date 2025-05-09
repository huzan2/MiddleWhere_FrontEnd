import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

function DetailPage() {
  const { state } = useLocation();
  const { results = {}, tag = '', members = [] } = state || {};
  const { center = {}, places = [] } = results;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const mapContainer = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);

      // 중심 마커
      const centerMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(center.lat, center.lng),
        map: map,
      });

      // 추천 장소 마커
      places.forEach((place) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(place.lat, place.lng),
          map: map,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:13px;">${place.name}</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });
      });
    }
  }, [center, places]);

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <Intro>
        모임의 중간장소는 <b>{center.name}</b>입니다.
      </Intro>

      <MapWrapper id="map" />

      <ResultList>
        {places.map((place, index) => (
          <ResultCard key={index}>
            <PlaceName>{place.name}</PlaceName>
            <Category>{place.category}</Category>
            <Address>{place.address}</Address>
          </ResultCard>
        ))}
      </ResultList>

      <ShareButton>📎 링크 공유</ShareButton>
    </Container>
  );
}

export default DetailPage;

const Container = styled.div`padding: 20px;`;
const Intro = styled.div`margin-bottom: 16px; font-size: 18px;`;
const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  background-color: #eee;
  margin-bottom: 20px;
`;
const ResultList = styled.div`display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;`;
const ResultCard = styled.div`
  padding: 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
`;
const PlaceName = styled.div`font-size: 16px; font-weight: bold; color: #222; margin-bottom: 4px;`;
const Category = styled.div`font-size: 13px; color: #888;`;
const Address = styled.div`font-size: 13px; color: #666;`;
const ShareButton = styled.button`
  width: 100%;
  background: #ffeb00;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-weight: bold;
  font-size: 16px;
`;
