import styled from "styled-components";

export const DetailContainer = styled.div`
  // padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  //   0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.2;
`;

export const IdText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ExecuteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
  border: none;

  ${(props) =>
    props.$isExecuting
      ? `
    background-color: #ef4444;
    color: white;
    &:hover:not(:disabled) {
      background-color: #dc2626;
    }
  `
      : `
    background-color: #10b981;
    color: white;
    &:hover:not(:disabled) {
      background-color: #059669;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #6b7280;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fee2e2;
    border-color: #fecaca;
    color: #dc2626;
  }
`;

export const HierarchyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem 0;
`;

export const Level = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  padding-left: ${(props) => props.$indent || 0}px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: ${(props) => {
      // depth에 따라 left 값을 다르게 계산
      const baseIndent = props.$indent || 0;
      if (baseIndent === 0) return "-24px"; // 캠페인
      if (baseIndent === 40) return "20px"; // 포맷
      return "60px"; // 필터
    }};
    top: 28px;
    bottom: -4px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      #e5e7eb 0%,
      #e5e7eb 50%,
      transparent 100%
    );
  }
`;

export const Node = styled.div`
  position: relative;
  background: ${(props) => {
    switch (props.$type) {
      case "campaign":
        return "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
      case "format":
        return "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)";
      case "filter":
        return "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)";
      default:
        return "#fff";
    }
  }};
  color: ${(props) => (props.$type ? "#fff" : "#374151")};
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  width: ${(props) =>
    props.$type === "campaign"
      ? "100%"
      : props.$type === "format"
      ? "99.6%"
      : "99.6%"};
  margin-left: auto;

  &::before {
    content: "";
    position: absolute;
    left: ${(props) => {
      // depth에 따라 가로선의 길이도 조정
      if (props.$type === "campaign") return "-24px";
      if (props.$type === "format") return "-24px";
      return "-24px";
    }};
    top: 50%;
    width: 24px;
    height: 2px;
    background: #e5e7eb;
    transform: translateY(-50%);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  &::after {
    content: "";
    position: absolute;
    left: -28px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => {
      switch (props.$type) {
        case "campaign":
          return "#2563eb";
        case "format":
          return "#3b82f6";
        case "filter":
          return "#60a5fa";
        default:
          return "#e5e7eb";
      }
    }};
    transform: translateY(-50%);
  }
`;

export const NodeTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 4px;
    background: currentColor;
    border-radius: 50%;
  }
`;

export const NodeContent = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
  padding-left: 1rem;
`;

export const NodeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0;

  strong {
    font-weight: 500;
    opacity: 0.8;
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center; //세로축
  justify-content: center; //가로축
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  width: 70px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) => (props.$status ? "#dcfce7" : "#fee2e2")};
  color: ${(props) => (props.$status ? "#15803d" : "#dc2626")};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  // border: 1px solid #e5e7eb;
  background-color: white;
  color: #6b7280;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: #f9fafb;
    color: #111827;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const NodeLabel = styled.span`
  font-weight: 600;
  color: #1976d2;
  margin-right: 8px;
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

export const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const GraphDetailsContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(to right, #f3f4f6, #f9fafb);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const GraphTitle = styled.h3`
  font-size: 1.25rem;
  color: #374151;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

export const GraphList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const GraphCard = styled.div`
  background: white;
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const GraphName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

export const GraphDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
`;
