// src/Pages/RegisterPage.jsx
import styled from 'styled-components';

function RegisterPage() {
  return (
    <Container>
      <Title>Middle<br />Where</Title>

      <Form>
        <Row>
          <Label>닉네임 Nickname</Label>
          <Input type="text" placeholder="홍길동" />
        </Row>

        <Row>
          <Label>나이 Age</Label>
          <Select>
            {Array.from({ length: 80 }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
        </Row>

        <Row>
          <Label>기본 출발위치</Label>
          <Input type="text" placeholder="위치 검색하기" />
        </Row>

        <SignupButton>회원가입</SignupButton>
      </Form>
    </Container>
  );
}

export default RegisterPage;

const Container = styled.div`
  max-width: 360px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'paybooc-Light';
`;

const Title = styled.h1`
  font-family: 'paybooc-Bold';
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.2;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SignupButton = styled.button`
  margin-top: 20px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
