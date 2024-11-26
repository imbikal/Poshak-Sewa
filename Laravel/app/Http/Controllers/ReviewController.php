<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Fetch reviews for a specific product.
     *
     * @param  int  $productId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($productId)
    {
        $product = Product::findOrFail($productId);
        $reviews = $product->reviews()->with('user')->get();
        $averageRating = $product->reviews()->avg('rating');

        return response()->json([
            'reviews' => $reviews,
            'average_rating' => round($averageRating, 1),
        ]);
    }

    /**
     * Store or update a review.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        $user = Auth::user();

        // Check if the user has already reviewed this product
        $existingReview = Review::where('user_id', $user->id)
                                ->where('product_id', $validated['product_id'])
                                ->first();

        if ($existingReview) {
            // Update existing review
            $existingReview->rating = $validated['rating'];
            $existingReview->review = $validated['review'];
            $existingReview->save();

            return response()->json([
                'message' => 'Review updated successfully.',
                'review' => $existingReview
            ], 200);
        }

        // Create the review if it doesn't exist
        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $validated['product_id'],
            'rating' => $validated['rating'],
            'review' => $validated['review'],
        ]);

        return response()->json([
            'message' => 'Review submitted successfully.',
            'review' => $review
        ], 201);
    }
}
