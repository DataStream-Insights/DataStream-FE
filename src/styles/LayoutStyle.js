import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  color: #1a1a1a;
  margin: 0;
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

export const LayoutWrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const MainContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
`;

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
`;
