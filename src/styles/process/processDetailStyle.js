import styled from "styled-components";

export const DetailContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

export const IdText = styled.p`
  color: #666;
  font-size: 14px;
`;

export const HierarchyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Level = styled.div`
  border-left: 2px solid #e0e0e0;
  padding-left: 20px;
  margin-left: ${(props) => props.$indent || 0}px;
`;

export const Node = styled.div`
  background: ${(props) => {
    switch (props.$type) {
      case "campaign":
        return "#90CAF9";
      case "format":
        return "#BBDEFB";
      case "filter":
        return "#E3F2FD";
      default:
        return "#f8f9fa";
    }
  }};
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const NodeTitle = styled.div`
  font-size: 16px;
  color: #1b4f72; // 진한 파란색
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const NodeLabel = styled.span`
  font-weight: 600;
  color: #1976d2;
  margin-right: 8px;
`;

export const NodeContent = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ConnectLine = styled.div`
  width: 2px;
  height: 20px;
  background-color: #e0e0e0;
  margin-left: 10px;
`;

export const ErrorText = styled.div`
  color: #dc3545;
  padding: 20px;
  text-align: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const ExecuteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.$isExecuting
      ? `
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  `
      : `
    background-color: #28a745;
    color: white;
    &:hover {
      background-color: #218838;
    }
  `}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    stroke-width: 2.5;
  }
`;

export const NodeItem = styled.div`
  margin: 4px 0;

  strong {
    color: #555;
    margin-right: 8px;
  }
`;
