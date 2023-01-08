import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalogs/catalog";
import { Product } from "../models/product";


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
      pictureUrl: 'https://picsum.photos/150'
    }]);
  }

  return (
    <div>
      <Typography variant="h3" style={{ color: 'blue' }}>RxStore</Typography>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget facilisis libero, ac maximus nisl</p>


      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}

export default App;
