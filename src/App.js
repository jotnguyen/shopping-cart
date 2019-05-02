import React, { useState } from 'react';
import './App.css';
import { withStyles, Drawer, Fab, CardActions, Button } from '@material-ui/core/';
import { ShoppingCart as ShoppingCartIcon, HighlightOff, DeleteIcon } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  carticon: {
    position: 'fixed',
    right: 35,
    bottom: 35
  },
});


const SizeButtons = ({ picked, handleSize}) => {





  return (
      <div>
        S
        <Radio
          checked={picked === 'S'}
          onChange={handleSize}
          value="S"
          name="radio-button-demo"
          aria-label="A"
        />
        M
        <Radio
          checked={picked === 'M'}
          onChange={handleSize}
          value="M"
          name="radio-button-demo"
          aria-label="B"
        />
        L
        <Radio
          checked={picked === 'L'}
          onChange={handleSize}
          value="L"
          name="radio-button-demo"
          aria-label="C"
        />
        XL
        <Radio
          checked={picked === 'XL'}
          onChange={handleSize}
          value="XL"
          name="radio-button-demo"
          aria-label="D"
        />
      </div>
    );

}
const ProductList = ({ products, add: addToCart, open: opensCart }) => (
  <Grid container spacing={24}>
        {Object.keys(products).map(key => <Product key={products[key]} product={ products[key] } add={addToCart} open={opensCart}/>)}
  </Grid>
);

const Product = ({ product, add: addToCart, open: opensCart}) => {
  const [picked, setButton] = useState('')
  const handleSize = event => {
    setButton(event.target.value);
  };

  const addProductToCart = (sku, size) => {
    addToCart(sku, size);
    opensCart();
  }

  return (
    <Grid item xs={3}>
      <Paper>

        <CardMedia
          style={{height: 200, paddingTop: '56%'}}
          image={"/data/products/" + product.sku + "_1.jpg"}
          title={product.sku}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography component="p">
            {product.description}
          </Typography>
          <Typography component="p">
            {"$" + product.price}
          </Typography>
          <SizeButtons handleSize={handleSize} picked={picked}/>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => addProductToCart(product.sku, picked)}>Add to cart</Button>
        </CardActions>
      </Paper>
    </Grid>
  );
}

const App = (props) => {
  const { classes } = props

  const [cart, setCart] = useState([]);
  const [store, setProducts] = useState({  products: {} });
  const [openCart, setOpenCart] = useState(false)
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


  const toggleCart = () => {
    setOpenCart(!openCart);
  }

  const closeCart = () => {
    setOpenCart(false)
  }

  const opensCart = () => {
    setOpenCart(true)
  }

  const addToCart = (sku, size) => {
    console.log('cart:',cart,' ',sku,' ',size)
    setCart([...cart, [sku, size]]);
    console.log('cart again',cart)
  };

  return (
    <section>
      <div className={classes.root}>
        <ProductList products={ store.products } add={addToCart} open={opensCart}/>
        <Drawer className={classes.cart} open={openCart} onClose={toggleCart} anchor="right">
          <HighlightOff onClick={ closeCart }/>
          <div className={classes.cart}>
            {cart.map(itemArray => {
              console.log(itemArray)
              console.log(store)
              return (<div>{store['products'][itemArray[0]]['title']+" "+store['products'][itemArray[0]]['price']}</div>)
            })}
          </div>
          <div>
            {"Total:  "+ cart.reduce( (total, curValue) => { return total + store['products'][curValue[0]]['price'] }, 0)}
          </div>
        </Drawer>
        <Fab className={classes.carticon} color="primary" onClick={toggleCart}>
          <ShoppingCartIcon />
        </Fab>
      </div>
    </section>
  );
};

export default withStyles(styles)(App);
