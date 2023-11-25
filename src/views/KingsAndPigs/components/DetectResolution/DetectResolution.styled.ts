import { styled } from 'styled-components';

export const ChangeOrientationContainer = styled.div`
  margin: 0 24px;
  padding: 48px 24px;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.elements.header.main};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  svg {
    margin-bottom: 24px;
  }
`;
