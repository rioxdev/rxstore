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
import agent from "../api/agent";
import { Product } from "../models/product";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  //useState hook
  const [products, setProducts] = useState<Product[]>(
    []
  );

  useEffect(() => {
    agent.Catalog.list()
      .then(data => setProducts(data))
  }, [])

  function addProduct() {
    setProducts(prevState => [...prevState,
    {
      id: products.length + 1,
      name: 'product' + (products.length + 1),
      price: 250,
      description: 'Pellentesque cursus et purus in laoreet. Nunc bibendum posuere diam. ',
      brand: 'some brand',
      type: 'Hats',
      pictureUrl: 'https://picsum.photos/150'
    }]);
  }

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />


      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog products={products} addProduct={addProduct} />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>


      </Container>

    </>
  );
}

export default App;
