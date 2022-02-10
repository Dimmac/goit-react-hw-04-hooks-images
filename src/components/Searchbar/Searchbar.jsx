import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SearchList,SearchForm,SearchButton,ButtonLabel,SearchInput} from './Searchbar.styled'

export default function Searchbar({ formSubmit }) {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    event.preventDefault();

    setName(event.currentTarget.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (name.trim() === "") {
      toast.error("Enter the name of the picture");
      return;
    }

    formSubmit(name);

    reset();
  };

  const reset = () => setName("");

  return (
    <SearchList>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BsSearch/>
          <ButtonLabel/>
        </SearchButton>
        <SearchInput
          name="name"
          type="text"
          autoComplete="off"
          autoFocus={true}
          placeholder="Search images and photos"
          value={name}
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchList>
  );
}