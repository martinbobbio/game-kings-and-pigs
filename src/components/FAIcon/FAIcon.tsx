import {
  SupportedColors,
  SupportedIconsAnimations,
  SupportedSizes,
} from '@/constants';
import { FAIconStyled } from './FAIcon.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  icon: IconDefinition;
  animation?: `${SupportedIconsAnimations}`;
  size?: `${SupportedSizes}`;
  color?: `${SupportedColors}`;
}

/**
 * Functional component that render component font awesome icon.
 *
 * @return React.ReactElement <FAIcon/>
 */
const FAIcon = ({
  icon,
  animation,
  size = 'md',
  color = 'default',
}: IconProps) => {
  return (
    <FAIconStyled className='icon' $color={color} $size={size}>
      <FontAwesomeIcon icon={icon} className={`fa-${animation}`} />
    </FAIconStyled>
  );
};

export default FAIcon;
