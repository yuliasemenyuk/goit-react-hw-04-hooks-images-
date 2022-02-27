import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import getAPI from "./services/API";
import style from "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    imageName: "",
    images: [],
    loading: false,
    page: 1,
  };

  searchImages = () => {
    const { imageName, page } = this.state;
    this.setState({ loading: true });

    getAPI(imageName, page).then((res) => {
      const images = res.data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );

      if (images.length === 0) {
        this.setState({ loading: false });
        return toast.error("There is no picture with that name!");
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
      }));
      this.setState({ loading: false });
    });
  };

  componentDidUpdate(prewProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ images: [], page: 1 });
      this.searchImages();
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.searchImages();
    }
  }

  handleFormSubmit = (imageName) => {
    this.setState({ imageName });
  };

  loadMoreBtn = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading } = this.state;
    const { handleFormSubmit, loadMoreBtn } = this;

    return (
      <div className={style.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading ? (
          <Loader />
        ) : (
          images.length > 0 &&
          images.length % 12 === 0 && <Button more={loadMoreBtn} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;