import React from 'react';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'

export default class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() { //make before render Component
		getProducts().then((products) => this.setState({products}));
	}

	render() {
		const {products} = this.state;
		return(
			
			<div className="container"> {/* container fixed with width screen */}

			    <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} //3 secs

      />
			  <h3 className="card-title">List of the Avaiable Products</h3><hr/>
			  {products.map((product, index) => <ProductItem productt={product} key={index} />)}
			  <hr/>
			  <Link to="/checkout">
				<button className="btn btn-success float-right">Checkout</button> 
			  </Link>
			  <Link to="/cart">
				<button className="btn btn-primary float-right" 
					style={{marginRight: "10px"}}>View Cart</button>
			  </Link><br/><br/><br/>
			</div>
		);
	}
}
