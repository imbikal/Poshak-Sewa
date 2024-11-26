import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/getCategory`)
            .then(res => {
                console.log('API Response:', res); // <-- Log the API response
                if (isMounted) {
                    if (res.data.status === 200) {
                        setCategory(res.data.category);
                        setLoading(false);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error); // <-- Log any errors
                if (error.response && error.response.status === 403) {
                    console.log('403 Forbidden Error'); // <-- Log 403 error for debugging
                    window.location.href = '/403'; // Redirect to 403 page
                }
            });

        return () => {
            isMounted = false;
        }
    }, []);

    if (loading) {
        return <h4>Loading Categories...</h4>;
    } else {
        var showCategoryList = '';
        showCategoryList = category.map((item, idx) => {
            return (
                <div className="col-md-4 mb-4" key={idx}>
                    <div className='card inline-flex p-6'>
                        <Link to={`collections/${item.slug}`}>
                            <img
                                src={`http://localhost:8000/${item.image}`}
                                className="object-center object-cover w-full"
                                alt={item.name}
                                style={{ height: '400px' }} // Adjust the height as needed
                            />
                        </Link>
                        <div className="card-body">
                            <Link to={`collections/${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <div className="py-2 bg-warning">
                <div className="container">
                    <h6>Category Page</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        {showCategoryList.length > 0 ? showCategoryList : <h4>No Collections</h4>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;
