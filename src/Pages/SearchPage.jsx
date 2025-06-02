import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/default-profile.png';
import { updateUserLocation } from '../Apis/meeting';
import { searchMidpoint, getCategoryRecommendation } from '../Apis/search';
import axios from 'axios';

function SearchPage() {
  const location = useLocation();
  const meetId = location?.state?.meetId;

  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedTag, setSelectedTag] = useState('식사');
  const TAGS = ['식사', '데이트', '영화', '공부'];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (meetId) {
          const res = await axios.get(`/api/meeting/info/${meetId}`);
          const members = Array.isArray(res.data.members) ? res.data.members : [];
          setMembers(members);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.warn('⚠️ 모임 멤버 불러오기 실패:', err);
        setMembers([]);
      }
    };

    fetchMembers();
  }, [meetId]);

  const handleSearch = async () => {
    try {
      const locations = members.map((m) => m.memberLocation);
      const results = await searchMidpoint({ locations, category: selectedTag });
      navigate('/detail', { state: { results, tag: selectedTag, members } });
    } catch (err) {
      console.warn('검색 실패:', err);
      navigate('/detail', {
        state: {
          results: {
            center: {},
            places: [],
          },
          tag: selectedTag,
          members,
        },
      });
    }
  };

  const handleTagSelect = async (tag) => {
    setSelectedTag(tag);
    try {
      const data = await getCategoryRecommendation(tag);
      console.log('카테고리 변경 결과:', data);
    } catch (err) {
      console.warn('카테고리 변경 실패:', err);
    }
  };

  const handleLocationChange = async (member) => {
    const newLocation = prompt(`새 출발 위치를 입력하세요 (현재: ${member.memberLocation})`);
    if (!newLocation?.trim()) return;
    try {
      await updateUserLocation({
        meetId,
        userId: member.userId,
        newLocation,
      });
      alert('출발 위치가 변경되었습니다.');
      setMembers((prev) =>
        prev.map((m) =>
          m.userId === member.userId ? { ...m, memberLocation: newLocation } : m
        )
      );
    } catch (err) {
      alert('출발 위치 수정 실패');
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
              <EditBtn onClick={() => handleLocationChange(m)}>위치 수정</EditBtn>
            </Member>
          ))
        ) : (
          <div>모임 멤버가 없습니다.</div>
        )}
      </MemberList>

      <SubTitle>방문 목적 선택</SubTitle>
      <Tags>
        {TAGS.map((tag) => (
          <Tag
            key={tag}
            selected={selectedTag === tag}
            onClick={() => handleTagSelect(tag)}
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

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 22px; font-weight: bold; margin-bottom: 16px;`;
const MemberList = styled.div`border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin-bottom: 20px;`;
const Member = styled.div`display: flex; align-items: center; justify-content: space-between; padding: 8px; border-bottom: 1px solid #eee; font-size: 14px; &:last-child { border-bottom: none; }`;
const ProfileIcon = styled.img`width: 36px; height: 36px; border-radius: 50%; margin-right: 12px;`;
const MemberInfo = styled.div`flex: 1;`;
const EditBtn = styled.button`font-size: 12px; padding: 4px 8px; border-radius: 8px; border: none; background: #4f46e5; color: white;`;
const SubTitle = styled.div`font-weight: bold; margin-bottom: 10px;`;
const Tags = styled.div`display: flex; gap: 10px; margin-bottom: 24px;`;
const Tag = styled.div`padding: 6px 12px; border-radius: 20px; background-color: ${({ selected }) => (selected ? '#4f46e5' : '#eee')}; color: ${({ selected }) => (selected ? '#fff' : '#000')}; cursor: pointer;`;
const SearchBtn = styled.button`width: 100%; padding: 14px; background: ${({ theme }) => theme.colors.primary}; color: white; font-weight: bold; font-size: 16px; border: none; border-radius: 12px;`;
