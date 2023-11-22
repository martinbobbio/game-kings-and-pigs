import { SupportedColors, SupportedSizes, SupportedWeights } from '@/constants';
import { TextStyled } from './Text.styled';

interface TextProps {
  children: React.ReactNode;
  size?: `${SupportedSizes}`;
  fontWeight?: `${SupportedWeights}`;
  color?: `${SupportedColors}`;
}

/**
 * Functional component that render component text.
 *
 * @return React.ReactElement <Text/>
 */
const Text = ({
  children,
  size = 'md',
  fontWeight = 'medium',
  color = 'default',
}: TextProps) => {
  return (
    <TextStyled
      className='text'
      $color={color}
      $size={size}
      $weight={fontWeight}
    >
      {children}
    </TextStyled>
  );
};

export default Text;
