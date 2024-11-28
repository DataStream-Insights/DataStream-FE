import styled from "styled-components";

export const SidebarContainer = styled.div`
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  width: ${(props) => (props.collapsed ? "4.5rem" : "15rem")};
  transition: all 0.3s;
`;

export const SidebarHeader = styled.div`
  height: 4.2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? "center" : "space-between")};
  border-bottom: 1px solid #e5e7eb;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    height: 2.8rem;
    width: auto;
    display: ${(props) => (props.collapsed ? "none" : "block")};
  }
`;

export const CollapseButton = styled.button`
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 4px;
  transition: all 0.2s;

  svg {
    width: 18px; // 아이콘 크기 감소
    height: 18px;
  }

  &:hover {
    background-color: #f3f4f6;
    color: #4285f4;
  }

  &:focus {
    outline: none;
  }
`;

export const MenuContainer = styled.div`
  padding: 1rem 0.5rem; // 패딩 조정
`;

export const MenuItem = styled.div`
  margin-bottom: 0.75rem;
  border-radius: 6px;
  overflow: hidden;
`;

export const MenuItemHeader = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  color: #4b5563;

  &:hover {
    background-color: white;
    color: #1a73e8; // 호버시 파란색으로
  }

  svg {
    stroke-width: 2; // 아이콘 두께 조정
  }
`;

export const MenuItemText = styled.span`
  margin-left: 0.75rem;
  font-weight: 500; // 약간 더 굵게
`;

export const SubMenuContainer = styled.div`
  margin-left: 2.5rem;
  margin-top: 0.25rem;
`;

export const SubMenuItem = styled.div`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: white;
    color: #1a73e8;
  }
`;
