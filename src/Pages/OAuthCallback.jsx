import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (!code) return;

      try {
        // 1. 토큰 요청
        const tokenRes = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
            redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
            code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const access_token = tokenRes.data.access_token;

        // 2. 사용자 정보 요청
        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const kakaoUser = userRes.data;
        localStorage.setItem('kakao_user', JSON.stringify(kakaoUser));

        // 3. 사용자 존재 여부 확인 후 분기 이동
        try {
          const check = await axios.get(`/api/user/info/${kakaoUser.id}`);
          if (check.data) {
            navigate('/main');
            return;
          }
        } catch (err) {
          console.log('신규 사용자입니다. 회원가입 페이지로 이동');
        }

        navigate('/register');
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
        alert('로그인 실패');
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default OAuthCallback;