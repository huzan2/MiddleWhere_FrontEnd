// SearchPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/default-profile.png';
import { axiosInstance } from '@/Apis/@core';

function SearchPage() {
  const location = useLocation();
  const meetId = location?.state?.meetId;

  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedTag, setSelectedTag] = useState('식사');

  useEffect(() => {
    const fetchMembers = async () => {
      const defaultMembers = [
        { memberName: '김철수', memberLocation: '서울특별시 노원구 월계동' },
        { memberName: '김영희', memberLocation: '서울특별시 성북구 정릉동' },
        {
          memberName: '사용자1',
          memberLocation: '서울특별시 동대문구 회기동',
        },
        { memberName: '사용자2', memberLocation: '서울특별시 마포구 상수동' },
      ];

      try {
        if (meetId) {
          const res = await axios.get(`/api/meeting/info/${meetId}`);
          const members = Array.isArray(res.data.members)
            ? res.data.members
            : defaultMembers;
          setMembers(members);
        } else {
          setMembers(defaultMembers);
        }
      } catch (err) {
        console.warn('⚠️ 모임 멤버 불러오기 실패. 기본값 사용');
        setMembers(defaultMembers);
      }
    };

    fetchMembers();
  }, []);

  const handleSearch = async () => {
    try {
      const locations = members.map((m) => m.memberLocation);
      const res = await axiosInstance.post('/search/where', {
        locations,
        category: selectedTag,
      });
      console.log(res);

      const results =
        Array.isArray(res.data) && res.data.length > 0
          ? res.data
          : [
              {
                placeName: '스타벅스 강남역점',
                address: '서울 강남구 테헤란로 123',
              },
              { placeName: '이디야 역삼점', address: '서울 강남구 역삼로 456' },
              {
                placeName: '투썸플레이스 신논현',
                address: '서울 서초구 강남대로 789',
              },
            ];

      navigate('/detail', { state: { results, tag: selectedTag, members } });
    } catch (err) {
      console.warn('검색 실패, 임시 데이터로 이동합니다:', err);
      const fallback = {
        center: {
          lat: 37.582059,
          lng: 127.001888,
          name: '혜화역',
        },
        places: [
          {
            name: '칸다소바 혜화점',
            address: '서울 종로구 대학로 131-1',
            lat: 37.582821,
            lng: 127.001381,
            category: '일식',
          },
          {
            name: '마로니에공원',
            address: '서울 종로구 대학로 104',
            lat: 37.580478,
            lng: 127.002835,
            category: '공원',
          },
          {
            name: '커피한약방 혜화점',
            address: '서울 종로구 동숭2길 9',
            lat: 37.580825,
            lng: 127.004801,
            category: '카페',
          },
        ],
      };

      navigate('/detail', {
        state: {
          results: fallback,
          tag: selectedTag,
          members,
        },
      });
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      <Title>중간지점 검색</Title>

      <MemberList>
        {Array.isArray(members) && members.length > 0 ? (
          members.map((m, idx) => (
            <Member key={idx}>
              <ProfileIcon src={defaultAvatar} />
              <MemberInfo>
                <div>{m.memberName}</div>
                <div>{m.memberLocation}</div>
              </MemberInfo>
              <EditBtn>위치 수정</EditBtn>
            </Member>
          ))
        ) : (
          <div>멤버를 불러오는 중입니다...</div>
        )}
      </MemberList>

      <SubTitle>방문 목적 선택</SubTitle>
      <Tags>
        {['식사', '데이트', '영화', '공부'].map((tag) => (
          <Tag
            key={tag}
            selected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          >
            #{tag}
          </Tag>
        ))}
      </Tags>

      <SearchBtn onClick={handleSearch}>검색결과 확인하기</SearchBtn>
    </Container>
  );
}

export default SearchPage;

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
`;
const MemberList = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
`;
const Member = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  &:last-child {
    border-bottom: none;
  }
`;
const ProfileIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
`;
const MemberInfo = styled.div`
  flex: 1;
`;
const EditBtn = styled.button`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  background: #4f46e5;
  color: white;
`;
const SubTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
const Tags = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
`;
const Tag = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  background-color: ${({ selected }) => (selected ? '#4f46e5' : '#eee')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  cursor: pointer;
`;
const SearchBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 12px;
`;
