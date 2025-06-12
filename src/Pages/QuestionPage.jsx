import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import {
  getQuestionList,
  submitQuestion,
  getQuestionDetail,
} from '../Apis/question';

function QuestionPage() {
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await getQuestionList();
      if (Array.isArray(res.list)) setQuestions(res.list);
    } catch (err) {
      console.warn('⚠️ 문의 목록 불러오기 실패:', err);
      setQuestions([]);
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
      await submitQuestion({ userId: user.id, title, content });
      setTitle('');
      setContent('');
      fetchQuestions();
    } catch (err) {
      alert('문의 등록 실패');
    }
  };

  const handleViewQuestionDetail = async (questionId) => {
    try {
      const detail = await getQuestionDetail(questionId);
      alert(`제목: ${detail.title}\n내용: ${detail.content}`);
    } catch (err) {
      alert('문의 상세정보를 불러올 수 없습니다.');
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
      {questions.length === 0 ? (
        <EmptyText>등록된 문의가 없습니다.</EmptyText>
      ) : (
        <QuestionList>
          {questions.map((q, idx) => (
            <QuestionItem
              key={idx}
              onClick={() => handleViewQuestionDetail(q.questionId)}
            >
              <strong>{q.title}</strong>
            </QuestionItem>
          ))}
        </QuestionList>
      )}
    </Container>
  );
}

export default QuestionPage;

const Container = styled.div`
  padding: 20px;
`;
const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 100px;
  resize: none;
`;
const Button = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
`;
const SubTitle = styled.h3`
  margin-top: 24px;
  margin-bottom: 12px;
`;
const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const QuestionItem = styled.div`
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
  cursor: pointer;
`;
const EmptyText = styled.div`
  text-align: center;
  margin-top: 40px;
  color: gray;
  font-size: 14px;
`;
