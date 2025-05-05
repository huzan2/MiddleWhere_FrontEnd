import styled from 'styled-components';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  return (
    <Button onClick={handleLogin}>
      <img
        src="https://middlewhere.vercel.app/images/kakao_login_large_wide.png"
        alt="카카오 로그인"
      />
    </Button>
  );
};

export default KakaoLoginButton;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  img {
    width: 100%;
    max-width: 300px;
  }
`;
