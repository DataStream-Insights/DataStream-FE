import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: ${(props) => props.height || "auto"};
  flex: ${(props) => props.flex || "1"};
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

export const RefreshButton = styled.button`
  padding: 8px 16px;
  //   background-color: #007bff;
  color: #979797;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e2e2e2;
  }
`;
