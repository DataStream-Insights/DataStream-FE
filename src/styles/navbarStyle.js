import styled from "styled-components";

export const NavbarContainer = styled.div`
  height: 4.2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const NavTitle = styled.span`
  color: #374151;
  font-weight: 500;
`;

export const TabList = styled.div`
  display: flex;
  gap: 2rem;
`;

export const TabItem = styled.button`
  padding: 0.5rem 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.active ? "#7DB8D9" : "#6B7280")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1rem; // 밑줄 위치 조정
    left: 0;
    right: 0;
    height: 2px;
    background-color: #7db8d9;
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #7db8d9;
  }
`;

export const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
