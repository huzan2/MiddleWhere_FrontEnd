import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, deleteUser, getUserInfo } from '../Apis/profile';
import DaumPostcodeEmbed from 'react-daum-postcode';

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [defaultLocation, setDefaultLocation] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSave = async () => {
    if (
      nickname.length === 0 ||
      age.length === 0 ||
      defaultLocation.length === 0
    ) {
      alert('정보를 빠짐없이 입력해주세요.');
      return;
    }
    try {
      await updateUserInfo({
        userId: user.id,
        userName: nickname,
        userAge: age,
        memberLocation: defaultLocation,
        coo1: lat,
        coo2: lng,
      });
      alert('정보가 저장되었습니다.');
      navigate('/main');
    } catch (err) {
      alert('정보 저장 실패');
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까?')) return;
    try {
      await deleteUser(user.id);
      localStorage.removeItem('kakao_user');
      alert('탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (err) {
      alert('탈퇴 실패');
    }
  };
  const handleComplete = (data) => {
    console.log(data);
    setIsModalOpen(false);
    const getCoordinates = (addr) => {
      if (window.kakao) {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(addr, function (result, status) {
          if (status !== kakao.maps.services.Status.OK) {
            alert('주소 검색 중 오류가 발생했습니다.');
            return;
          }
          const coords = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          );
          setLng(coords.getLng());
          setLat(coords.getLat());
          console.log(coords.getLng(), coords.getLat());
        });
      }
    };
    getCoordinates(data.address);
    setDefaultLocation(data.address);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myData = await getUserInfo(user.id);
        setNickname(myData.data.userName);
        setAge(myData.data.userAge);
        setDefaultLocation(myData.data.userDefaultLocation);
      } catch (err) {
        console.warn('데이터 불러오기 실패: ', err);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
      <Title>내 정보</Title>
      <Label>닉네임</Label>
      <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <Label>나이</Label>
      <Input value={age} onChange={(e) => setAge(e.target.value)} />
      <Label>기본 출발 위치</Label>
      <LocationSearchButton
        onClick={() => {
          setIsModalOpen(true);
        }}
        readOnly={true}
        placeholder={defaultLocation}
      />
      {isModalOpen ? <DaumPostcodeEmbed onComplete={handleComplete} /> : null}
      <SaveButton onClick={handleSave}>정보 저장</SaveButton>
      <DeleteButton onClick={handleDeleteUser}>회원 탈퇴</DeleteButton>
    </Container>
  );
}

export default ProfilePage;

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 24px;
`;
const Label = styled.label`
  display: block;
  margin-top: 12px;
  margin-bottom: 6px;
  font-weight: bold;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const LocationSearchButton = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
  text-align: center;
  font-size: medium;
`;
const SaveButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
`;
const DeleteButton = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;
