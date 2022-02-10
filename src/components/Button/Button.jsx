import PropTypes from 'prop-types';
import {ButtonStyle} from './Button.styled';

const Button = ({ pagination }) => {
  return (
    <ButtonStyle type="button" onClick={() => pagination()}>
      Load more
    </ButtonStyle>
  );
};
export default Button;
Button.propTypes = {
  pagination: PropTypes.func.isRequired,
};