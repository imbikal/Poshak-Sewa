import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory } from 'react-router-dom';

function ViewProduct(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const product_slug = props.match.params.slug;
    axios.get(`/api/fetchproducts/${product_slug}`)
      .then(res => {
        if (isMounted) {
          if (res.data.status === 200) {
            setProduct(res.data.product_data.product);
            setFilteredProducts(res.data.product_data.product);
            setCategory(res.data.product_data.category);
            setLoading(false);
          } else if (res.data.status === 400) {
            swal("Warning", res.data.message, "");
          } else if (res.data.status === 404) {
            history.push('/collections');
            swal("Warning", res.data.message, "error");
          }
        }
      })
      .catch(error => {
        if (isMounted) {
          swal("Error", "There was an issue fetching the products.", "error");
          console.error(error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [props.match.params.slug, history]);

  // Search algorithm
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = product.filter(
      (product) =>
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.about && product.about.toLowerCase().includes(query))
    );

    setFilteredProducts(filtered);
  };

  const productCount = filteredProducts.length;

  if (loading) {
    return <h4>Loading Products...</h4>; // You can replace this with a loading spinner if you wish
  } 

  let showProductList = null;

  if (productCount) {
    showProductList = filteredProducts
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item, idx) => (
        <div className="col-md-3 mb-4" key={idx}>
          <div className="card h-100">
            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
              <img
                src={`http://localhost:8000/${item.image}`}
                className="card-img-top"
                alt={item.name}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      ));
  } else {
    showProductList = (
      <div className="col-md-12">
        <h4>No Product Available for {category.name}</h4>
      </div>
    );
  }

  return (
    <div className="py-3">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              padding: '0.3rem',
              border: '4px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
              width: '25%', 
              cursor: 'text',
            }}
          />
        </div>
        <div className="row">
          {showProductList}
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
