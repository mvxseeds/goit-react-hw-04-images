import { RotatingLines } from 'react-loader-spinner';
import { SpinnerWrapper, LoaderWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrapper>
      <SpinnerWrapper>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </SpinnerWrapper>
    </LoaderWrapper>
  );
};

export default Loader;
