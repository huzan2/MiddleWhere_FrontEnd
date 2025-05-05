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
        const tokenRes = await axios.post('https://kauth.kakao.com/oauth/token', {
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const access_token = tokenRes.data.access_token;

        // 2. 사용자 정보 요청
        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        //  3. 사용자 정보 localStorage에 저장
        localStorage.setItem('kakao_user', JSON.stringify(userRes.data));

        //  4. 메인 페이지로 이동
        navigate('/main');
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
      }
    };

    fetchToken();
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default OAuthCallback;
