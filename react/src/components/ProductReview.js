import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm'; 
import ReviewList from './ReviewList'; 

const ProductReview = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (productId) {
            fetchReviews();
        } else {
            setError('Invalid product ID.');
        }
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/${productId}/reviews`);
            console.log('Fetched reviews:', response.data);
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to load reviews. Please try again later.');
        }
    };

    const updateReviews = (newReview) => {
        const updatedReviews = [...reviews, newReview]; 
        console.log('Updated Reviews:', updatedReviews); // Log updated reviews
        setReviews(updatedReviews);
    };

    return (
        <div>
            <h2>Product Reviews</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ReviewForm productId={productId} onReviewSubmitted={updateReviews} />
            <ReviewList reviews={reviews} /> {/* Removed averageRating */}
        </div>
    );
};

export default ProductReview;