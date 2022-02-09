import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import API from '../services/pixabayservices';

const newsApi = new API();

export default class App extends Component {
  state = {
    pictureName: '',
    pictureModal: null,
    showModal: false,
    picture: [],
    isLoading: false,
    error: null,
    image: null,
    scroll: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.pictureName;
    const nextName = this.state.pictureName;

    if (nextName !== prevName) {
      newsApi.resetPage();
      this.setState({ picture: [],scroll: false });
      this.fetchMorePictures();
    }
  }

  fetchMorePictures = () => {
    const { pictureName, scroll } = this.state;
    this.setState({ isLoading: true, scroll: true });
    newsApi.query = pictureName;

    newsApi
      .fetchImages()
      .then(({ hits }) => {
        this.setState(prevState => ({
          picture: [...prevState.picture, ...hits],
          image: true,
        }));

        if (hits.length === 0) {
          toast.error('Sorry, there are no more images matching your search.');
          return;
        }
        if (scroll) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };
  formSubmitHandler = data => {
    const { name } = data;
    const normalizedNameContact = name.toLowerCase();
    this.setState({ pictureName: normalizedNameContact });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ pictureModal: largeImageURL });
  };
  render() {
    const { showModal, pictureModal } = this.state;
    const { picture, isLoading, image } = this.state;
    return (
      <div>
        <Searchbar formSubmit={this.formSubmitHandler}></Searchbar>
        {image && <ImageGallery picture={picture} onClick={this.toggleModal}></ImageGallery>}
        {picture.length > 0 && !isLoading && (
          <Button pagination={this.fetchMorePictures}></Button>
        )}
        {isLoading && <Loader/>}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={pictureModal} alt={picture.tags} />
          </Modal>
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
      </div>
    );
  }
}