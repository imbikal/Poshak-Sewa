import React, { useState } from 'react';

// Function to display stars based on the rating
const displayStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆'; // Filled star or empty star
    }
    return stars;
};

const ReviewList = ({ reviews }) => {
    const [showMore, setShowMore] = useState(false);
    const visibleReviews = showMore ? reviews : reviews.slice(0, 2);

    return (
        <div>
            <h3>Customer Reviews</h3>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                visibleReviews.map((review, index) => (
                    <div 
                        key={index} 
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <p>{review.review}</p>
                        <small>{review.user.name}</small>
                        <p>Rating: {displayStars(review.rating)}</p>
                    </div>
                ))
            )}
            {reviews.length > 2 && (
                <button onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show Less Reviews' : 'More Reviews'}
                </button>
            )}
        </div>
    );
};

export default ReviewList;