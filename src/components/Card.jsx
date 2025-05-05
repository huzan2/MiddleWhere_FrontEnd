// src/components/Card.jsx
import styled from 'styled-components';

function Card({ title, content, onClick }) {
  return (
    <CardWrapper onClick={onClick}>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
    </CardWrapper>
  );
}

export default Card;

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-family: 'paybooc-Bold';
  margin-bottom: 8px;
`;

const CardContent = styled.p`
  font-size: 14px;
  font-family: 'paybooc-Light';
  color: #555;
`;
