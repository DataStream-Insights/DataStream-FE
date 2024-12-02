import styled from "styled-components";
import { Form, Input } from "antd";

export const Content = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  &:before {
    content: "";
    width: 4px;
    height: 18px;
    background: #4285f4;
    margin-right: 8px;
    border-radius: 2px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #212529;
  }
`;

export const InfoGroup = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 8px;
`;

export const InfoText = styled.div`
  padding: 12px 16px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  color: #495057;
  font-size: 14px;
  line-height: 1.5;
  min-height: 42px;
  display: flex;
  align-items: center;
`;

export const Description = styled(InfoText)`
  min-height: 120px;
  white-space: pre-wrap;
  line-height: 1.6;
  align-items: flex-start;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  ${InfoGroup} {
    margin-bottom: 0;
  }
`;
