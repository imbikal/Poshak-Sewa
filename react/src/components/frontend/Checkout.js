import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import KhaltiCheckout from 'khalti-checkout-web';
import config from '../Khalti/khaltiConfig';
import statesCitiesData from './nepal_states_cities.json';

function Checkout() {

    const history = useHistory();
    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Warning","Login to goto Cart Page","error");
    }
    const _onSelect = (option) => {
        // Handle the selected option
        console.log(option);
      };
    const options = [
        '1 day', '3 days', '5 days','7 days',
      ];
    const defaultOption = options[0];

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
   
    const totalCartPrice = cart.reduce((total, item) => {
      return total + item.product.selling_price * item.product_qty;
    }, 0);

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [error, setError] = useState([]);

    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if(res.data.status === 401)
                {
                    history.push('/');
                    swal("Warning",res.data.message,"error");
                }
            }
        }); 
 
        return () => {
            isMounted = false
        };
    }, [history]);

    var checkout = new KhaltiCheckout({
        ...config,

        eventHandler: {
            onSuccess(payload){
            axios.post(`/api/validate-order`,{
                firstname: checkoutInput.firstname,
                lastname: checkoutInput.lastname,
                phone: checkoutInput.phone,
                email: checkoutInput.email,
                address: checkoutInput.address,
                city: checkoutInput.city,
                state: checkoutInput.state,
                zipcode: checkoutInput.zipcode,
                payment_mode: "Khalti",
                payment_id: '',
            } )
          .then((res) => {
            if(res.data.status === 200)
                    {
                        swal("Order Placed Successfully",res.data.message,"success");
                        setError([]);
                        history.push('/thank-you');
                    }
                    else if(res.data.status === 422)
                    {
                        swal("All fields are mandetory","","error");
                        setError(res.data.errors);
                    }
          });
      },
      // onError handler is optional
      onError(error) {

        // handle errors
        console.log(error);
      },
           
        },

    });


    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
    }

    const submitOrder = (e, payment_mode) => {
        e.preventDefault();
    
        const errors = {};
    
        // Validate first name
        if (!checkoutInput.firstname) {
            errors.firstname = 'First name is required.';
        } else if (!/^[a-zA-Z]+$/i.test(checkoutInput.firstname)) {
            errors.firstname = 'First name should contain only letters.';
        }
    
        // Validate last name
        if (!checkoutInput.lastname) {
            errors.lastname = 'Last name is required.';
        } else if (!/^[a-zA-Z]+$/i.test(checkoutInput.lastname)) {
            errors.lastname = 'Last name should contain only letters.';
        }
    
 // Validate phone number
if (!checkoutInput.phone) {
    errors.phone = 'Phone number is required.';
} else {
    // Remove any non-numeric characters from the input
    const numericInput = checkoutInput.phone.replace(/\D/g, '');

    // Validate phone number
    if (!checkoutInput.phone) {
        errors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(checkoutInput.phone)) {
        errors.phone = 'Phone number should be a 10-digit number.';
    }
}



    
        // Validate email address
        if (!checkoutInput.email) {
            errors.email = 'Email address is required.';
        } else if (
            !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                checkoutInput.email
            )
        ) {
            errors.email = 'Invalid email address.';
        }

        // Validate zip code
    if (!checkoutInput.zipcode) {
        errors.zipcode = 'Zip code is required.';
    } else if (!/^\d{5}$/.test(checkoutInput.zipcode)) {
        errors.zipcode = 'Zip code should be a 5-digit number.';
    }

 // Validate address
 if (!checkoutInput.address.trim()) {
    errors.address = 'Address is required.';
}

     

    
        setError(errors);
    
        // Check if there are any errors
        if (Object.keys(errors).length > 0) {
            return;
        }
    
        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id: '',
        };
    

        // minimum transaction amount must be 10, i.e 1000 in paisa.

        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/place-order`, data).then(res=>{
                    console.log('order',res);
                    if(res.data.status === 200)
                    {

                        swal("Order Placed Successfully",res.data.message,"success");
                        setError([]);
                        history.push('/thank-you');
                    }
                    else if(res.data.status === 422)
                    {
                        swal("All fields are mandetory","","error");
                        setError(res.data.errors);
                    }
                });
                break;

                
            

            case 'Khalti':
                checkout.show({ amount: parseInt(totalCartPrice * 100) });

            //     axios.post(`/api/validate-order`, data).then(res=>{
            //         if(res.data.status === 200)
            //         {
            //             setError([]);
            //             var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
            //             myModal.show();
               //         }
            //         else if(res.data.status === 422)
            //         {
            //             swal("All fields are mandetory","","error");
            //             setError(res.data.errors);
            //         }
            //     });
                break;
        
            default:
                break;
        }
       
    }

    if(loading)
    {
        return <h4>Loading Checkout...</h4>
    }

    var checkout_HTML = '';
    if(cart.length > 0)
    {
        checkout_HTML = <div>
            <div className="row">

            <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h4>Basic Information</h4>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> First Name</label>
                                    <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className={`form-control ${error.firstname ? 'is-invalid' : ''}`} placeholder="John" />
                                    {error.firstname && (<small className="text-danger">{error.firstname}</small>)}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Last Name</label>
                                    <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className={`form-control ${error.lastname ? 'is-invalid' : ''}`} placeholder="Cena" />
                                    {error.lastname && (<small className="text-danger">{error.lastname}</small>)}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Phone Number</label>
                                    <input type="text"  name="phone" onChange={handleInput} value={checkoutInput.phone} className={`form-control ${error.phone ? 'is-invalid' : ''}`} placeholder="98XXXXXXXX" />
                                    {error.phone && (<small className="text-danger">{error.phone}</small>)}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Email Address</label>
                                    <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className={`form-control ${error.email ? 'is-invalid' : ''}`} placeholder="john.cen@example.com" />
                                    {error.email && (<small className="text-danger">{error.email}</small>)}
                                </div>
                            </div>
                            <div className="col-md-12">
    <div className="form-group mb-3">
        <label>Full Address</label>
        <textarea
            rows="3"
            name="address"
            onChange={handleInput}
            value={checkoutInput.address}
            className={`form-control ${error.address ? 'is-invalid' : ''}`}
        />
        {error.address && <small className="text-danger">{error.address}</small>}
    </div>
</div>
                            <div className="col-md-4">
  <div className="form-group mb-3">
    <label>State</label>
    <select
      name="state"
      onChange={handleInput}
      value={checkoutInput.state}
      className={`form-control ${error.state ? 'is-invalid' : ''}`}
    >
      <option value="">Select State</option>
      {statesCitiesData.map((stateData, index) => (
        <option key={index} value={stateData.name}>
          {stateData.name}
        </option>
      ))}
    </select>
    {error.state && <small className="text-danger">{error.state}</small>}
  </div>
</div>

<div className="col-md-4">
  <div className="form-group mb-3">
    <label>City</label>
    <select
      name="city"
      onChange={handleInput}
      value={checkoutInput.city}
      className={`form-control ${error.city ? 'is-invalid' : ''}`}
    >
      <option value="">Select City</option>
      {checkoutInput.state &&
        statesCitiesData
          .find((stateData) => stateData.name === checkoutInput.state)
          .cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
    </select>
    {error.city && <small className="text-danger">{error.city}</small>}
  </div>
</div>

                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>Zip Code</label>
                                    <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className={`form-control ${error.zipcode ? 'is-invalid' : ''}`} />
                                    {error.zipcode && (<small className="text-danger">{error.zipcode}</small>)}
                                </div>
                            </div>
                            
                            
                            <div className="col-md-12">
    <div className="form-group text-end">
        <button type="button" className="btn btn-primary mx-1" onClick={(e) => submitOrder(e, 'cod')}>Cash on delivery</button>
    </div>
    <div className="form-group text-end" style={{ marginTop: '10px' }}>
        <button type="button" className="btn btn-primary mx-1" onClick={(e) => submitOrder(e, 'Khalti')}>Pay by Khalti</button>
    </div>
</div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th width="50%">Product</th>
                            <th>Price</th>
                            <th>Days to rent</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map( (item, idx) => {
                           
                            return (
                                <tr key={idx}>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.selling_price}</td>
                                    <td>{item.product_qty}</td>
                                    <td>{item.product.selling_price * item.product_qty}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                            <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            </div>
        </div>
    }
    else
    {
        checkout_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
            </div>
        </div>
    }

    return (
        <div>

           

            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Checkout</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                   {checkout_HTML}
                </div>
            </div>
            
        </div>
    )
}



export default Checkout;