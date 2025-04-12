import styled from 'styled-components';

function MainPage() {
  return (
    <>
      <Title>Project MiddleWhere</Title>
    </>
  );
}

export default MainPage;

const Title = styled.p`
  font-family: 'paybooc';
  font-size: 50px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.BLUE};
`;
