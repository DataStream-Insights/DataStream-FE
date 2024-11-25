import styled from "styled-components";

// export const SlideContainer = styled.div`
//   position: fixed;
//   top: 0;
//   right: ${(props) => (props.$isOpen ? "0" : "-100%")};
//   width: 100%;
//   height: 100vh;
//   background-color: white;
//   box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
//   transition: right 0.3s ease-in-out;
//   z-index: 1000;
//   padding: 20px;
//   overflow-y: auto;
// `;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
  margin: 0;
`;

export const DetailSection = styled.div`
  margin-bottom: 24px;
`;

export const DetailTitle = styled.h3`
  font-size: 1.1rem;
  color: #495057;
  margin-bottom: 12px;
`;

export const FilterItem = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: ${(props) => {
    switch (props.$type) {
      case "andor":
        return "#e3f2fd"; // 연한 파랑
      case "alias":
        return "#f3e5f5"; // 연한 보라
      case "operation":
        return "#e8f5e9"; // 연한 초록
      case "value":
        return "#fff3e0"; // 연한 주황
      default:
        return "#e9ecef";
    }
  }};
  color: ${(props) => {
    switch (props.$type) {
      case "andor":
        return "#1976d2"; // 진한 파랑
      case "alias":
        return "#7b1fa2"; // 진한 보라
      case "operation":
        return "#2e7d32"; // 진한 초록
      case "value":
        return "#e65100"; // 진한 주황
      default:
        return "#495057";
    }
  }};
`;
