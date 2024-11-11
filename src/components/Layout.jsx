import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  color: #1a1a1a;
  margin: 0;
`;

const MenuBar = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #edf2f7;
`;

const MenuItem = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  ${({ active }) =>
    active
      ? `
    background: #4263eb;
    color: white;
    &:hover {
      background: #364fc7;
    }
  `
      : `
    background: transparent;
    color: #64748b;
    &:hover {
      background: #f8fafc;
      color: #4263eb;
    }
  `}

  &:not(:last-child) {
    margin-right: 4px;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 99, 235, 0.2);
  }
`;

export function Layout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (
      path === "/campaignmanagement" &&
      location.pathname === "/campaignmanagement"
    ) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <PageContainer>
      <Header>
        <Title>{title}</Title>
        <MenuBar>
          <MenuItem active={isActive("/")} onClick={() => navigate("/")}>
            캠페인 목록
          </MenuItem>
          <MenuItem
            active={isActive("/format")}
            onClick={() => navigate("/format")}
          >
            포맷 관리
          </MenuItem>
          <MenuItem
            active={isActive("/filtermanagement")}
            onClick={() => navigate("/filtermanagement")}
          >
            필터 관리
          </MenuItem>
        </MenuBar>
      </Header>
      {children}
    </PageContainer>
  );
}
