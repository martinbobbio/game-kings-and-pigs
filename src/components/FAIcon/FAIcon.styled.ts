import { SupportedColors, SupportedSizes } from '@/constants';
import { styled } from 'styled-components';

interface IconStyledProps {
  $size: `${SupportedSizes}`;
  $color: `${SupportedColors}`;
}

export const FAIconStyled = styled.div<IconStyledProps>`
  &.icon {
    display: inline-block;
    svg {
      color: ${({ theme, $color }) => theme.palette[$color].main};
      width: ${({ theme, $size }) => theme.fontSize[$size]};
      height: ${({ theme, $size }) => theme.fontSize[$size]};
    }
  }
`;
