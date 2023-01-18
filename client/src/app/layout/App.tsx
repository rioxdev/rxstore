import { CssBaseline, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalogs/catalog";
import ProductDetails from "../../features/catalogs/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";

import { Product } from "../models/product";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/context";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";


function App() {

  // function addProduct() {
  //   setProducts(prevState => [...prevState,
  //   {
  //     id: products.length + 1,
  //     name: 'product' + (products.length + 1),
  //     price: 250,
  //     description: 'Pellentesque cursus et purus in laoreet. Nunc bibendum posuere diam. ',
  //     brand: 'some brand',
  //     type: 'Hats',
  //     pictureUrl: 'https://picsum.photos/150'
  //   }]);
  // }

  // const { setBakset } = useStoreContext();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
    else {
      setLoading(false);
    }
  }, [setBasket])


  if (loading)
    <LoadingComponent message="Loading basket..."></LoadingComponent>

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>


      </Container>

    </>
  );
}

export default App;
