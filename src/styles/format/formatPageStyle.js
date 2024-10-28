import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const ListContainer = styled.div`
  width: 33.333333%;
  transition: width 0.3s ease;

  &.expanded {
    width: 100%;
  }
`;

export const DetailContainer = styled.div`
  flex: 1;
  display: none;

  &.visible {
    display: block;
  }
`;
