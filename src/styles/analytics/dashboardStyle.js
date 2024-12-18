import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 4px 10px;
  // background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DynamicSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PrintHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;

  @media screen {
    display: none;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    color: #666;
  }
`;

export const MainContent = styled.div`
  display: flex;
  gap: 20px;
`;

export const LeftSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BottomSection = styled.div`
  display: flex;
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  height: ${(props) => props.height || "auto"};
  min-height: ${(props) => props.height || "auto"};
  max-height: ${(props) => props.height || "auto"};
  flex: ${(props) => props.flex || "1"}; // flex 속성 추가
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 40px 20px;
`;

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;

  .label {
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .unit {
    font-size: 12px;
    color: #666;
  }
`;

export const BarContainer = styled.div`
  width: 100%;
  background: #f5f5f5;
  height: 8px;
  border-radius: 4px;
  margin-top: 5px;
`;

export const BarFill = styled.div`
  height: 100%;
  background: #1890ff;
  border-radius: 4px;
  width: ${(props) => props.percentage}%;
`;

export const DropdownContainer = styled.div`
  min-width: 200px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #333;
`;

export const ExportButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ButtonBase = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
`;

export const RefreshButton = styled(ButtonBase)`
  color: #666;
  background-color: transparent;
  // border-color: #e2e2e2;

  &:hover {
    background-color: #f5f5f5;
    // border-color: #d1d1d1;
  }
`;

export const TableExportButton = styled(ButtonBase)`
  color: #3b82f6;
  background-color: #eff6ff;
  border-color: #dbeafe;

  &:hover {
    background-color: #dbeafe;
    border-color: #bfdbfe;
  }
`;

export const GraphExportButton = styled(ButtonBase)`
  color: #059669;
  background-color: #ecfdf5;
  border-color: #d1fae5;

  &:hover {
    background-color: #d1fae5;
    border-color: #a7f3d0;
  }
`;

export const EmptyStateContainer = styled.div`
  position: relative;
  height: calc(100vh - 200px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

export const EmptyStateBackground = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: auto;
  opacity: 0.1;
`;

export const EmptyStateMessage = styled.div`
  position: relative;
  z-index: 1;
  padding: 24px 48px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  font-size: 18px;
  color: #666;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;
