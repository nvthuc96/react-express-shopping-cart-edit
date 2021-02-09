//render each product on product list
import React from 'react';

export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}
	
	addToCart = () => {
		let cart = localStorage.getItem('cart')?
			JSON.parse(localStorage.getItem('cart')): {}; //convert text into Javascript object, data server always string
		let id = this.props.product.id.toString();
		cart[id] = (cart[id]? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.avaiable_quantity < qty) {
			cart[id] = this.props.product.avaiable_quantity;
		} else {
			cart[id] = qty;
		}
		localStorage.setItem('cart', JSON.stringify(cart)); //key is cart, value is JSON.stringify
	}

	render() {
		const { productt } = this.props;
		return(
			<div className="card" style={{marginBottom: "20px"}} > {/* card is borded box with some padding around it content */}
			  <div className="card-body">
				<h4 className="card-title">{productt.name}</h4>
				<p className="card-text">{productt.description}</p>
				<h5 className="card-text"><small>price:</small>${productt.price}</h5>
				<span className="card-text">
					<small>Available Quantity:</small>{productt.available_quantity}
				</span>
				{ productt.available_quantity > 0 ?
				<div>
					<button className="btn btn-sm btn-warning float-right" 
						onClick={this.addToCart}>Add to cart</button>
					<input type="number" value={this.state.quantity} name="quantity"
						onChange={this.handleInputChange} className="float-right"
						style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}} />	
				</div> : 
				<p className="text-danger">product is out of stock</p>
				}
			  </div>
			</div>
		);
	}
}
