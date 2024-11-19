import styled from "styled-components";

export const SidebarContainer = styled.div`
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  width: ${(props) => (props.collapsed ? "4rem" : "13rem")};
  transition: all 0.3s;
`;

export const SidebarHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // border-bottom: 1px solid #e5e7eb;
`;

export const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1b4f72;
  display: ${(props) => (props.collapsed ? "none" : "block")};
`;

export const CollapseButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  &:focus {
    outline: none;
  }
`;

export const MenuContainer = styled.div`
  padding: 1rem 0;
`;

export const MenuItem = styled.div`
  margin-bottom: 0.5rem;
`;

export const MenuItemHeader = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const MenuItemText = styled.span`
  margin-left: 0.75rem;
  color: #374151;
`;

export const SubMenuContainer = styled.div`
  margin-left: 2rem;
`;

export const SubMenuItem = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;
