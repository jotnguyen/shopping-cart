import React, { useState } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
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
});


function SizeButtons(){
  const [picked, setButton] = useState('')

  const handleChange = event => {
    setButton(event.target.value);
  };

  return (
      <div>
        S
        <Radio
          checked={picked === 'S'}
          onChange={handleChange}
          value="S"
          name="radio-button-demo"
          aria-label="A"
        />
        M
        <Radio
          checked={picked === 'M'}
          onChange={handleChange}
          value="M"
          name="radio-button-demo"
          aria-label="B"
        />
        L
        <Radio
          checked={picked === 'L'}
          onChange={handleChange}
          value="L"
          name="radio-button-demo"
          aria-label="C"
        />
        XL
        <Radio
          checked={picked === 'XL'}
          onChange={handleChange}
          value="XL"
          name="radio-button-demo"
          aria-label="D"
        />
      </div>
    );

}
const ProductList = ({ products }) => (
  <Grid container spacing={24}>
        {Object.keys(products).map(key => <Product key={products[key]} product={ products[key] } />)}
  </Grid>
);

const Product = ({ product }) => (
        <Grid item xs={3}>
          <Paper>

          <CardMedia
            style = {{ height: 200, paddingTop: '56%'}}
            image={"/data/products/"+product.sku+"_1.jpg"}
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
              {"$"+product.price}
            </Typography>
            <SizeButtons/>
          </CardContent>
            </Paper>
        </Grid>
);

const App = (props) => {
  const { classes } = props

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
      <div className={classes.root}>
        <ProductList products={ store.products } />
      </div>
    </section>
  );
};

export default withStyles(styles)(App);
