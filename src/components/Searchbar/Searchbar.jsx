import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarContainer,
  SearchbarForm,
  SearchFormButton,
  SearchbarFormButtonLabel,
  SearchbarFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [imgName, setImgName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (imgName.trim() === '') {
      return Swal.fire(
        `Sorry,there are no pictures on request ${imgName}. Please try again`,
      );
    }
    onSubmit(imgName);
    setImgName('');
  };

  return (
    <SearchbarContainer>
      <SearchbarForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <ImSearch />
          <SearchbarFormButtonLabel>Search</SearchbarFormButtonLabel>
        </SearchFormButton>

        <SearchbarFormInput
          type="text"
          name="imgName"
          value={imgName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setImgName(e.target.value.toLowerCase())}
        />
      </SearchbarForm>
    </SearchbarContainer>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};