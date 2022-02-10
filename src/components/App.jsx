import { useState, useEffect } from 'react';
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

export default function App() {
  const [pictureName, setPictureName] = useState("");
  const [pictureModal, setPictureModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [picture, setPicture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (pictureName) {
      newsApi.resetPage();
      setPicture([]);
      setScroll(false);

      fetchMorePictures();
    }
  }, [pictureName]);

  function fetchMorePictures() {
    setLoading(true);
    setScroll(true);

    newsApi.query = pictureName;
    console.log(pictureName);

    newsApi
      .fetchImages()
      .then(({ hits }) => {
        console.log(hits.length);
        setPicture((prevState) => [...prevState, ...hits]);
        setImage(true);

        if (hits.length === 0) {
          toast.error("Sorry, there are no more images matching your search.");
          return;
        }
        if (scroll) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((errorCatch) => {
        console.log(error);
        return setError(errorCatch);
      })
      .finally(() => setLoading(false));
  }

  const formSubmitHandler = (data) => {
    console.log(data);
    const normalizedNameContact = data.toLowerCase();
    setPictureName(normalizedNameContact);
  };

  const toggleModal = (largeImageURL) => {
    setShowModal((prevState) => !prevState);
    console.log(showModal);
    setPictureModal(largeImageURL);
  };

  return (
    <div>
      <Searchbar formSubmit={formSubmitHandler}></Searchbar>

      {image && (
        <ImageGallery picture={picture} onClick={toggleModal}></ImageGallery>
      )}

      {picture.length > 0 && picture.length % 12 === 0 && (
        <Button pagination={fetchMorePictures}></Button>
      )}
      {loading && <Loader></Loader>}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={pictureModal} alt="" />
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
        pauseOnHover
      />
    </div>
  );
}