import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  // background-color: #f8f9fa;
`;

export const MainContentWrapper = styled.div`
  margin-left: ${(props) => (props.collapsed ? "4.5rem" : "15rem")};
  transition: margin-left 0.3s ease;
  min-height: 100vh;
`;

export const MainContainer = styled.div`
  padding-top: 1rem; // Navbar 높이만큼 패딩
`;

export const PageContainer = styled.div`
  padding: 20px;
`;

export const MenuBar = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #edf2f7;
`;

export const MenuItem = styled.button`
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

//추후 설명 추가할 때 사용
export const Description = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;
