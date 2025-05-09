import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState(20);
  const [userDefaultLocation, setUserDefaultLocation] = useState('');
  const navigate = useNavigate();

  const kakaoUser = JSON.parse(localStorage.getItem('kakao_user'));

  const handleRegister = async () => {
    try {
      await axios.post('/api/user/register', {
        userId: kakaoUser.id,
        userName,
        userAge,
        userDefaultLocation,
      });
      alert('회원가입 완료!');
      navigate('/main');
    } catch (e) {
      alert('회원가입 실패');
      console.error(e);
    }
  };

  return (
    <Container>
      <Title>Middle<br />Where</Title>
      <Form>
        <Row>
          <Label>닉네임</Label>
          <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Row>
        <Row>
          <Label>나이</Label>
          <Select value={userAge} onChange={(e) => setUserAge(e.target.value)}>
            {Array.from({ length: 80 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
        </Row>
        <Row>
          <Label>기본 출발위치</Label>
          <Input value={userDefaultLocation} onChange={(e) => setUserDefaultLocation(e.target.value)} placeholder="위치 검색" />
        </Row>
        <SignupButton onClick={handleRegister}>회원가입</SignupButton>
      </Form>
    </Container>
  );
}

export default RegisterPage;

const Container = styled.div`max-width: 360px; margin: 0 auto; padding: 40px 20px; font-family: 'paybooc-Light';`;
const Title = styled.h1`font-size: 28px; text-align: center; margin-bottom: 40px;`;
const Form = styled.div`display: flex; flex-direction: column; gap: 16px;`;
const Row = styled.div`display: flex; flex-direction: column;`;
const Label = styled.label`font-size: 14px; margin-bottom: 4px;`;
const Input = styled.input`padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px;`;
const Select = styled.select`padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px;`;
const SignupButton = styled.button`margin-top: 20px; padding: 12px; background-color: #4f46e5; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold;`;