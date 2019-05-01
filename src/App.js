import React, { useState } from 'react';
import './App.css';



const Banner = ({ title }) => (
  <h1 className="title">{ title }</h1>
);

const ProductList = ({ products }) => (
  <ul className="menu-list">
    {Object.keys(products).map(key => <Product key={products[key]} product={ products[key] } />)}
  </ul>
);

const Product = ({ product }) => (
  <li className="menu-item">
      { product.title }
  </li>
);

const App = () => {
  const [store, setProducts] = useState({  products: {} });
  const url = '/data/products.json';

  React.useEffect(() => {

    const fetchProducts = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setProducts(json);
    }

    fetchProducts();
  }, []);

  return (
    <section>
      <div className="container menu">
        <ProductList products={ store.products } />
      </div>
    </section>
  );
};

export default App;
