import styled from "styled-components";

export const NavbarContainer = styled.div`
  height: 4.2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: center; // 중앙 정렬
`;

export const TabList = styled.div`
  display: flex;
  gap: 5rem;
  margin: 0 auto; // 가운데 정렬
`;

export const NavLeft = styled.div`
  // 빈 공간
`;

export const NavTitle = styled.span`
  color: #4285f4;
  font-weight: 500;
`;

export const TabItem = styled.button`
  padding: 0.5rem 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.active ? "#2196F3" : "#6B7280")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) => (props.active ? "#1DA1F2" : "transparent")};
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #1877f2;
  }
`;

export const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: fixed;
  right: 1rem;
`;

export const IconButton = styled.button`
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
