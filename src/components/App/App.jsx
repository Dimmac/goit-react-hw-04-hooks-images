import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AppContainer } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import NewsApiService from '../../services/pixabayservices';

const newsApi = new NewsApiService();

export default function App() {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (imgName) {
      setLoading(true);
      setImages(null);
      newsApi.query = imgName;
      newsApi.resetPage();
      newsApi
        .fetchImages()
        .then(({ hits }) => {
          setImages(hits);

          if (hits.length === 0) {
            setImages(null);
            Swal.fire(
              `Sorry,there are no pictures on request ${imgName}. Please try again`,
            );
            return;
          }
        })
        .catch((errorCatch) => {
          return setError(errorCatch);
        })
        .finally(() => setLoading(false));
    }
  }, [imgName, error]);

  const fetchMoreImg = () => {
    setLoading(true);
    setScroll(true);
    return newsApi
      .fetchImages()
      .then(({ hits }) => {
        setImages([...images, ...hits]);
        if (hits.length === 0) {
          Swal.fire(
            `Sorry, there are no pictures on request ${imgName}. Please try again`,
          );
          return;
        }
        scrollImg();
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const scrollImg = () => {
    if (scroll) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const toggleModal = largeImageURL => {
    setShowModal(prevState => !prevState);
    setImgModal(largeImageURL);
  };

  const handleFormSubmit = imgName => {
    setImgName(imgName.toLowerCase());
    setShowModal(false);
    setImgModal(null);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {images && (
        <ImageGallery openModal={toggleModal} images={images}></ImageGallery>
      )}
      {images && <Button onClick={fetchMoreImg} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imgModal} alt="" />
        </Modal>
      )}
    </AppContainer>
  );
}