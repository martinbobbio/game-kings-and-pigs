import { keyframes, styled } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const KingsAndPigsStyled = styled.div`
  position: absolute;
  top: 0;
  animation: ${fadeIn} 0.5s ease;
`;
