import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SearchList,SearchForm,SearchButton,ButtonLabel,SearchInput} from './Searchbar.styled'

export default class Searchbar extends Component {
  state = {
    name: '',
  };

  handleNameChange = event => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.name.trim() === '') {
      toast.error('Enter the name of the picture');
      return;
    }

    this.props.formSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    const { name } = this.state;
    return (
      <SearchList>
        <SearchForm onSubmit={this.handleSubmit}>
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
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchList>
    );
  }
}