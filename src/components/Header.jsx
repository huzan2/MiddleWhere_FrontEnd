import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header({ onMenuClick, userName }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('kakao_user'));
  const nickname = user?.kakao_account?.profile?.nickname;
  const profileImage = user?.kakao_account?.profile?.profile_image_url;

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('kakao_user');
    window.location.href = '/';
  };

  const handleGoToProfile = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  return (
    <Navbar>
      <FaBars size={22} onClick={onMenuClick} />
      <Logo
        onClick={() => {
          navigate('/main');
        }}
      >
        Middle
        <br />
        Where
      </Logo>
      <ProfileArea ref={dropdownRef}>
        {profileImage ? (
          <ProfileImg
            src={profileImage}
            alt="프로필"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
        ) : (
          <FaUserCircle
            size={28}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
        )}

        {isDropdownOpen && (
          <Dropdown>
            <DropdownItem>{userName}님</DropdownItem>
            <DropdownItem onClick={handleGoToProfile}>내 정보</DropdownItem>
            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
          </Dropdown>
        )}
      </ProfileArea>
    </Navbar>
  );
}

export default Header;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Logo = styled.h1`
  font-family: 'paybooc-Bold';
  font-size: 20px;
  text-align: center;
  line-height: 1.2;
`;

const ProfileArea = styled.div`
  position: relative;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  min-width: 120px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  white-space: nowrap;
  line-height: 1.5;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f5f5;
  }
`;
