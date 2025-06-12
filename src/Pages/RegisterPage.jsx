import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Apis/register';
import DaumPostcodeEmbed from 'react-daum-postcode';

function RegisterPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [defaultLocation, setDefaultLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleRegister = async () => {
    console.log(lat, lng);
    if (!nickname.trim() || !age.trim() || !defaultLocation.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    try {
      await registerUser({
        userId: user.id,
        userName: nickname,
        userAge: age,
        memberLocation: defaultLocation,
        coo1: lat,
        coo2: lng,
      });
      alert('회원 등록 완료');
      navigate('/main');
    } catch (err) {
      alert('회원 등록 실패');
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
        });
      }
    };
    getCoordinates(data.address);
    setDefaultLocation(data.address);
  };

  return (
    <Container>
      <Title>회원 정보 입력</Title>
      <Label>닉네임</Label>
      <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <Label>나이</Label>
      <Input value={age} onChange={(e) => setAge(e.target.value)} />
      <Label>기본 출발 위치</Label>
      {defaultLocation === '' ? (
        <LocationSearchButton
          onClick={() => {
            setIsModalOpen(true);
          }}
          placeholder="주소 검색하기"
          readOnly={true}
        />
      ) : (
        <LocationSearchButton
          onClick={() => {
            setIsModalOpen(true);
          }}
          readOnly={true}
          placeholder={defaultLocation}
        />
      )}
      {isModalOpen ? <DaumPostcodeEmbed onComplete={handleComplete} /> : null}
      <RegisterButton onClick={handleRegister}>회원 등록</RegisterButton>
    </Container>
  );
}

export default RegisterPage;

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
const RegisterButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
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
