// import React from 'react';
// import { login } from '../repository';

// export default class Login extends React.Component{

//   constructor() {
//     super();
//     this.state = { name: '', password: '' };
//     this.handleInputChange =this.handleInputChange.bind(this);
//     this.submitLogin =this.submitLogin.bind(this);
//   }

//   handleInputChange = (event) => {
//     this.setState({[event.target.name]: event.target.value});
//   }

//   submitLogin = (e) => {
//     e.preventDefault(); //method called, default action (submit form) of event will not triggered
//     login(this.state).then(token => window.location = '/').catch(err => alert(err));
//   }

//   render() {
//     return(
//       <div className="container">
//         <hr />
//         <div className="col-sm-8 col-sm-offset-2"> {/* move columns to right using col-sm-offset */}
//           <div className="panel panel-default"> {/* panel insert bordered box with some padding */}
//             <div className="panel-heading"><h3>Log in</h3></div>
//             <div className="panel-body">
//               <form onSubmit={this.submitLogin}>
//                 <div className="form-group">
//                   <label>Name:</label>
//                   <input type="text" className="form-control"
//                     name="name" onChange={this.handleInputChange} />
//                 </div>
//                 <div className="form-group">
//                   <label>Password:</label>
//                   <input type="password" className="form-control"
//                     name="password" onChange={this.handleInputChange} />
//                 </div>
//                 <button type="submit" className="btn btn-success">Submit</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// //component get username and password, pass it to server backend when form is submited
import React from 'react';

export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	addToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity; 
		} else {
			cart[id] = qty
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	render(){
		const { product } = this.props;
		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
			    <h4 className="card-title">{product.name}</h4>
			    <p className="card-text">{product.description}</p>
			    <h5 className="card-text"><small>price: </small>${product.price}</h5>
			    <span className="card-text"><small>Available Quantity: </small>{product.available_quantity}</span>
			    
			    { product.available_quantity > 0 ?
			    	<div>
			    		<button className="btn btn-sm btn-warning float-right" onClick={this.addToCart}>Add to cart</button>
			    		<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
			    	</div> : 
			    	<p className="text-danger"> product is out of stock </p>
			 	}

			  </div>
			</div>
		)
	}
}
