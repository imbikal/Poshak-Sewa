import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating'; // Assuming StarRating is a separate component for displaying stars

const ReviewForm = ({ productId, existingReview, onReviewSubmitted }) => {
    const [rating, setRating] = useState(existingReview ? existingReview.rating : 0);
    const [review, setReview] = useState(existingReview ? existingReview.review : '');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (rating < 1 || rating > 5) {
            setError('Please select a rating between 1 and 5.');
            return;
        }

        const reviewData = {
            product_id: productId, // Ensure the property matches the backend expectation
            rating: parseFloat(rating), // Ensure this is a number
            review,
        };

        try {
            if (existingReview) {
                // Update existing review
                await axios.put(`http://localhost:8000/api/reviews/${existingReview.id}`, reviewData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                alert('Review updated successfully!');
            } else {
                // Submit new review
                await axios.post(`http://localhost:8000/api/products/${productId}/reviews`, reviewData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                alert('Review submitted successfully!');
            }

            onReviewSubmitted({ ...reviewData, id: existingReview ? existingReview.id : Date.now() }); // Pass the updated review to the parent
            setRating(0);
            setReview('');
        
        } catch (err) {
            console.error('Error submitting review:', err.response ? err.response.data : err);
            if (err.response && err.response.data.message) {
                setError(err.response.data.message); // Server-provided error message
            } else {
                setError('An error occurred while submitting your review.');
            }
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px' }}>
            <h3>{existingReview ? 'Update Your Review' : 'Submit Your Review'}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating:</label>
                    <StarRating rating={rating} onRatingChange={setRating} /> {/* Star rating component */}
                </div>
                <div className="form-group">
                    <label>Review:</label>
                    <textarea 
                        value={review} 
                        onChange={(e) => setReview(e.target.value)} 
                        rows="4" 
                        maxLength="1000"
                        placeholder="Write your review here (optional)"
                        style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    ></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 15px', border: 'none', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
                    {existingReview ? 'Update Review' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
