import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span 
                key={i} 
                style={{
                    cursor: 'pointer',
                    fontSize: '30px',
                    color: rating >= i ? 'gold' : 'lightgray', // Filled or unfilled color
                }}
                onClick={() => onRatingChange(i)}
                onMouseOver={() => onRatingChange(i)}
                onMouseOut={() => onRatingChange(rating)}
            >
                ★
            </span>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            {stars}
        </div>
    );
};

export default StarRating;