// PrintWrapper.jsx
import React from "react";
import styled from "styled-components";

class PrintWrapper extends React.Component {
  render() {
    return (
      <PrintContainer>
        <PrintHeader>
          <h1>대시보드 리포트</h1>
          <p>생성일: {new Date().toLocaleDateString()}</p>
        </PrintHeader>
        {this.props.children}
      </PrintContainer>
    );
  }
}

const PrintContainer = styled.div`
  background-color: white;
  padding: 20px;
  width: 100%;
`;

const PrintHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    color: #666;
  }

  @media screen {
    display: none;
  }
`;

export default PrintWrapper;
