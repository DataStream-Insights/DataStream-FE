import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

export const ListContainer = styled.div`
  flex: 1;
  transition: flex 0.3s ease-in-out;
  overflow: hidden;

  &.expanded {
    flex: 2;
  }
`;

export const DetailContainer = styled.div`
  flex: 2;
  background: white;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;

  &.visible {
    transform: translateX(0);
  }

  &:not(.visible) {
    transform: translateX(100%);
  }
`;
