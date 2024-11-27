import styled from "styled-components";

export const HeroSection = styled.div`
  position: relative;
  height: 500px;
  width: 100%;
  overflow: hidden;
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(59, 130, 246, 0.7), rgba(37, 99, 235, 0.7));
  z-index: 1;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 9rem 2rem;
  text-align: center;
  color: white;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: -4rem auto 0;
  padding: 0 2rem;
  position: relative;
  z-index: 3;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;
