import { TailSpin } from 'react-loader-spinner';
import {Spinner} from './Loader.styled'

const Loader = () => {
  return (
    <Spinner>
      <TailSpin color="#00BFFF" height={80} width={80} 
      />
    </Spinner>
  );
};
export default Loader;