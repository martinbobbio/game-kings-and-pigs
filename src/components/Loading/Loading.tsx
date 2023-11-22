import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FAIcon, Text } from '..';
import { Content, LoadingStyled } from './Loading.styled';

interface LoadingProps {
  title?: string;
}

/**
 * Functional component that render component loading.
 *
 * @return React.ReactElement <Loading/>
 */
const Loading = ({ title = 'Loading' }: LoadingProps) => {
  return (
    <LoadingStyled>
      <Content>
        <FAIcon icon={faCircleNotch} animation='spin' size='xxl' />
        <Text>{title}</Text>
      </Content>
    </LoadingStyled>
  );
};

export default Loading;
