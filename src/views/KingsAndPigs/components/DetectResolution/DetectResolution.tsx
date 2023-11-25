import { useWindowSize } from '@/hooks';
import { ChangeOrientationContainer } from './DetectResolution.styled';
import { FAIcon, Text } from '@/components';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

interface DetectResolutionProps {
  children: React.ReactNode;
}

/**
 * Functional component that renders the detect resolution component.
 *
 * @param children for wrap the content
 * @return React.ReactElement <DetectResolution/>
 */
const DetectResolution = ({ children }: DetectResolutionProps) => {
  const { isMobile } = useWindowSize();

  return (
    <>
      {isMobile && (
        <ChangeOrientationContainer>
          <FAIcon size='xxl' animation='beat' icon={faRotate} />
          <Text size='xl'>Girar dispositivo</Text>
          <br />
          <Text size='md'>Por favor gire su dispositivo horizontalmente.</Text>
        </ChangeOrientationContainer>
      )}
      {!isMobile && children}
    </>
  );
};

export default DetectResolution;
