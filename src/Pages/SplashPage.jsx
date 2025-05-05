// src/Pages/SplashPage.jsx
import styled from 'styled-components';
import KakaoLoginButton from '../components/KakaoLoginButton';

function SplashPage() {
  return (
    <Container>
      <Logo>Middle<br />Where</Logo>
      <KakaoLoginButton />
    </Container>
  );
}

export default SplashPage;

const Container = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Logo = styled.h1`
  font-family: 'paybooc-Bold';
  font-size: 36px;
  text-align: center;
  line-height: 1.2;
  color: black;
`;
