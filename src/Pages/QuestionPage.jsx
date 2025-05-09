import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import axios from 'axios';

function QuestionPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [questions, setQuestions] = useState([
    { title: '앱이 멈춰요', content: '중간지점 검색 후 화면이 멈춥니다.' },
    { title: '친구 추가 오류', content: '친구 코드로 추가가 안돼요.' },
  ]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`/api/question/list`);
      if (Array.isArray(res.data)) setQuestions(res.data);
    } catch (err) {
      console.warn('⚠️ 문의 목록 불러오기 실패. 임시 데이터 사용 중');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    try {
      await axios.post('/api/question/add', {
        userId: user.id,
        title,
        content,
      });
      setTitle('');
      setContent('');
      fetchQuestions();
    } catch (err) {
      alert('문의 등록 실패');
    }
  };

  return (
    <Container>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}

      <Title>문의사항</Title>

      <Form>
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="문의 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSubmit}>문의하기</Button>
      </Form>

      <SubTitle>문의 목록</SubTitle>
      <QuestionList>
        {questions.map((q, idx) => (
          <QuestionItem key={idx}>
            <strong>{q.title}</strong>
            <p>{q.content}</p>
          </QuestionItem>
        ))}
      </QuestionList>
    </Container>
  );
}

export default QuestionPage;

const Container = styled.div`padding: 20px;`;
const Title = styled.h2`font-size: 20px; margin-bottom: 16px;`;
const Form = styled.div`display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;`;
const Input = styled.input`padding: 10px; border: 1px solid #ccc; border-radius: 8px;`;
const TextArea = styled.textarea`padding: 10px; border: 1px solid #ccc; border-radius: 8px; height: 100px; resize: none;`;
const Button = styled.button`padding: 12px; background: ${({ theme }) => theme.colors.primary}; color: white; border: none; border-radius: 8px; font-weight: bold;`;
const SubTitle = styled.h3`margin-top: 24px; margin-bottom: 12px;`;
const QuestionList = styled.div`display: flex; flex-direction: column; gap: 16px;`;
const QuestionItem = styled.div`padding: 12px; border: 1px solid #eee; border-radius: 8px; background: #fafafa;`;

