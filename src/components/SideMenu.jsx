// SideMenu.jsx
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SideMenu({ onClose }) {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Backdrop onClick={onClose}>
      <MenuBox onClick={(e) => e.stopPropagation()}>
        <Header>Middle Where</Header>
        <MenuItem onClick={() => goTo('/main')}>메인 화면</MenuItem>
        <MenuItem onClick={() => goTo('/history')}>이용 기록</MenuItem>
        <MenuItem onClick={() => goTo('/friends')}>친구 관리</MenuItem>
        <MenuItem onClick={() => goTo('/groups')}>그룹 관리</MenuItem>
        <MenuItem onClick={() => goTo('/questions')}>문의사항</MenuItem>
      </MenuBox>
    </Backdrop>
  );
}

export default SideMenu;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  z-index: 1000;
`;

const MenuBox = styled.div`
  width: 260px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-family: 'paybooc-Bold';
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
`;

const MenuItem = styled.div`
  padding: 12px 0;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
