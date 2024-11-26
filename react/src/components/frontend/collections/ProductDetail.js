import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory, useParams } from 'react-router-dom';
import ReviewList from '../../ReviewList'; // Importing ReviewList component
import ReviewForm from '../../ReviewForm'; // Adjust the path as necessary

function ProductDetail() {
  const history = useHistory();
  const { category, product } = useParams(); // Using useParams to get route parameters
  const [loading, setLoading] = useState(true);
  const [productDetail, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);  // State for reviews

  useEffect(() => {
    let isMounted = true;

    const fetchProductDetail = async () => {
      try {
        const productResponse = await axios.get(`/api/viewproductdetail/${category}/${product}`);
        if (isMounted) {
          if (productResponse.data.status === 200) {
            setProduct(productResponse.data.product);
            fetchRelatedProducts(productResponse.data.product.category_id);
            fetchReviews(productResponse.data.product.id); // Fetching reviews when product is loaded
            setLoading(false);
          } else if (productResponse.data.status === 404) {
            history.push('/collections');
            swal("Warning", productResponse.data.message, "error");
          }
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      }
    };

    fetchProductDetail();

    return () => {
      isMounted = false;
    };
  }, [category, product, history]);

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const relatedProductsResponse = await axios.get(`/api/relatedproducts/${categoryId}`);
      if (relatedProductsResponse.data.status === 200) {
        // Filter out the current product from related products
        const filteredProducts = relatedProductsResponse.data.products.filter(
          (product) => product.id !== productDetail.id
        );
        setRelatedProducts(filteredProducts);
      } else {
        console.error("Error fetching related products:", relatedProductsResponse.data.message);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const reviewsResponse = await axios.get(`/api/products/${productId}/reviews`);
      setReviews(reviewsResponse.data.reviews);  // Setting fetched reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevCount => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (productDetail.qty > quantity) {
      setQuantity(prevCount => prevCount + 1);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const submitAddToCart = async (e) => {
    e.preventDefault();

    try {
      const data = {
        product_id: productDetail.id,
        product_qty: quantity,
        product_size: selectedSize,
      };

      const response = await axios.post(`/api/add-to-cart`, data);

      if (response.data.status === 201 || response.data.status === 409) {
        swal("Success", response.data.message, "success");
      } else if (response.data.status === 401 || response.data.status === 404) {
        swal("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      swal("Error", "Failed to add to cart", "error");
    }
  };

  const handleReviewSubmitted = () => {
    fetchReviews(productDetail.id);  // Refresh reviews after a new review is submitted
  };

  if (loading) {
    return <h4>Loading Product Detail...</h4>;
  } else {
    const availStock = productDetail.qty > 0 ? (
      <div>
        <label className="btn-sm btn-success px-4 mt-2">In stock - <span className='font-semibold text-lg '>{productDetail.qty}</span></label>
        <div className="row">
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
              <div className="form-control text-center">{quantity}</div>
              <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <button type="button" className="btn btn-primary w-100" onClick={submitAddToCart}>Add for Rent</button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
      </div>
    );

    return (
      <div>
        <div className="py-3 bg-warning">
          <div className="container">
            <h6>Collections / {productDetail.category?.name} / {productDetail.name}</h6>
          </div>
        </div>
        <div className="py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-4 border-end">
                <div className="card" style={{ height: '300px' }}>
                  <img
                    src={`http://localhost:8000/${productDetail.image}`}
                    alt={productDetail.name}
                    className="card-img-top img-fluid rounded product-image"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <h4>
                  {productDetail.name}
                  <span className="float-end badge btn-sm btn-danger badge-pill"> {productDetail.brand} </span>
                </h4>
                <p> {productDetail.description} </p>
                <h4 className="mb-1">
                  Rs: {productDetail.selling_price}
                  <s className="ms-2"> Rs: {productDetail.original_price} </s>
                </h4>
                <div>
                  {availStock}
                </div>
                <div className="mt-3">
                  <h5>Available Sizes:</h5>
                  <div className=''>
                    <ul className='flex gap-3'>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center' onClick={() => handleSizeChange('M')}>M</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center' onClick={() => handleSizeChange('L')}>L</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center' onClick={() => handleSizeChange('XL')}>XL</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center' onClick={() => handleSizeChange('XXL')}>XXL</li>
                      <li className='border rounded p-2 bg-slate-200 w-16 text-center' onClick={() => handleSizeChange('XXXL')}>XXXL</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Products Section */}
        <div className="container mt-5">
          <h3>Recommended for you:</h3>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col-md-2 mb-2">
                <div className="card h-100">
                  <img
                    src={`http://localhost:8000/${relatedProduct.image}`}
                    className="card-img-top img-fluid"
                    alt={relatedProduct.name}
                    style={{ maxWidth: 'auto', height: '110px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{relatedProduct.name}</h5>
                    <p className="card-text">Price: Rs {relatedProduct.selling_price}</p>
                    <button className="btn btn-primary" onClick={() => history.push(`/product/${relatedProduct.category.slug}/${relatedProduct.slug}`)}>View Product</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="container mt-5">
          <h3>Reviews</h3>
          <ReviewList reviews={reviews} />
          <ReviewForm productId={productDetail.id} onReviewSubmitted={handleReviewSubmitted} />
        </div>
      </div>
    );
  }
}

export default ProductDetail;
