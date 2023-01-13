import { CssBaseline, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalogs/catalog";
import { Product } from "../models/product";
import Header from "./Header";


function App() {

  //useState hook
  const [products, setProducts] = useState<Product[]>(
    []
  );

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
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
      <CssBaseline />
      <Header />
      

      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>

    </>
  );
}

export default App;
