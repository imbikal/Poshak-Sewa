<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\API\ReturnsController;
use App\Http\Controllers\ReviewController;

// Public routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('getCategory', [FrontendController::class, 'category']);
Route::get('fetchproducts/{slug}', [FrontendController::class, 'product']);
Route::get('viewproductdetail/{category_slug}/{product_slug}', [FrontendController::class, 'viewproduct']);

Route::post('add-to-cart', [CartController::class, 'addtocart']);
Route::get('cart', [CartController::class, 'viewcart']);
Route::put('cart-updatequantity/{cart_id}/{scope}', [CartController::class, 'updatequantity']);
Route::delete('delete-cartitem/{cart_id}', [CartController::class, 'deleteCartitem']);

Route::post('validate-order', [CheckoutController::class, 'validateOrder']);
Route::post('place-order', [CheckoutController::class, 'placeorder']);

Route::get('myorders', [OrderController::class, 'viewmyorders']);
Route::post('add-to-return', [ReturnsController::class, 'addtoreturn']);

// Fetch related products based on category
Route::get('relatedproducts/{categoryId}', [ProductController::class, 'relatedProducts']);

// Protected routes for authenticated users
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'You are in', 'status' => 200], 200);
    });

    // Reviews
    Route::get('/products/{productId}/reviews', [ReviewController::class, 'index']); // Fetch reviews for a product
    Route::post('/products/{productId}/reviews', [ReviewController::class, 'store']); // Store new review
    Route::put('/reviews/{id}', [ReviewController::class, 'update']); // Update existing review

    // User Profile
    Route::get('profile', [AuthController::class, 'getProfile']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Orders
    Route::get('admin/orders', [OrderController::class, 'index']);
    Route::get('admin/view-orders/{orderId}', [OrderController::class, 'viewitems']);
    Route::delete('admin/orders/cancel/{orderId}', [OrderController::class, 'cancelOrder']);

    // Returns
    Route::get('admin/returns', [ReturnsController::class, 'index']);
    Route::post('admin/approve-return', [ReturnsController::class, 'approveReturn']);

    //User
    Route::get('view-users', [UsersController::class, 'index']);
     Route::post('store-users', [UsersController::class, 'store']);
     Route::put('appoint-admin/{id}', [UsersController::class, 'appointAdmin']);
     Route::put('remove-admin/{id}', [UsersController::class, 'removeAdmin']);
     Route::put('update-users/{id}', [UsersController::class, 'update']);
     Route::delete('delete-users/{id}', [UsersController::class, 'destroy']);
     Route::get('all-users', [UsersController::class, 'allusers']);


    // Products
    Route::post('store-product', [ProductController::class, 'store']);
    Route::get('view-product', [ProductController::class, 'index']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductController::class, 'destroy']);

    // Dashboard
    Route::get('/total-sales', [OrderController::class, 'getTotalSales']);
    Route::get('/getUsersTotalPrice', [OrderController::class, 'getUsersTotalPrice']);
});

// Chatbot route (public)
Route::post('/chatbot', function (Request $request) {
    $message = strtolower($request->input('message'));
    $response = '';

    // Keyword-based response logic
    if (strpos($message, 'rent a cloth') !== false) {
        $response = 'You can rent clothes by visiting our category page!';
    } elseif (strpos($message, 'return policy') !== false) {
        $response = 'Our return policy allows you to return items within allocated days you chose.';
    } elseif (strpos($message, 'register my account') !== false) {
        $response = 'Just simply click on Get Started button and then you can register for new account or you can click register on the navbar';
    } elseif (strpos($message, 'how to rent') !== false) {
        $response = 'Renting from our website is simple! Just select the items you like, choose your rental dates, and proceed to checkout. Would you like a step-by-step guide?';
    } else {
        $response = 'I am sorry, I did not understand that. Please ask something else!';
    }

    return response()->json(['response' => $response]);
});
