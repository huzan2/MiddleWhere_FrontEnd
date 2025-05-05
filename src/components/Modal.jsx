// src/components/Modal.jsx
import styled from 'styled-components';

function Modal({ children, onClose }) {
  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Backdrop>
  );
}

export default Modal;


const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 360px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.2s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

