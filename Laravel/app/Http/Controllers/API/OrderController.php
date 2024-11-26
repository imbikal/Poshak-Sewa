<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Orderitems;
use Illuminate\Http\Request;
use App\Models\Users;


class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json([
            'status' => 200,
            'orders' => $orders,
        ]);
    }

    public function viewitems($orderId)
    {
        // Retrieve order items from the database using the order ID
        $orderItems = Orderitems::where('order_id', $orderId)
        ->join('products', 'orderitems.product_id', '=', 'products.id')
        ->select('orderitems.*', 'products.name as product_name')
        ->get();

        // Return the order items as a JSON response
        return response()->json([
            'status' => 200,
            'data' => [
                'orderItems' => $orderItems
            ]
        ]);
    }

    public function viewmyorders()
{

    if(auth('sanctum')->check())
    {
        $user_id = auth('sanctum')->user()->id;
        $orderitems = Order::where('user_id', $user_id)
            ->where('returned', '=', 0)
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->join('orderitems', 'orders.id', '=', 'orderitems.order_id')
            ->join('products', 'orderitems.product_id', '=', 'products.id')
            ->select('orders.*', 'users.name as user_name', 'products.id as product_id', 'products.name as product_name', 'products.image as product_image')
            ->get();

        return response()->json([
            'status' => 200,
            'orders' => $orderitems,
        ]);
    }
    else
    {
        return response()->json([
            'status' => 401,
            'message' => 'Login to View My Orders Data',
        ]);
    }
}
public function cancelOrder($orderId)
{
    // Check if the user is authenticated and is an admin
    if (auth('sanctum')->check() && auth('sanctum')->user()->role_as === 1) {
        // Attempt to find the order
        $order = Order::find($orderId);

        // If the order exists, delete it
        if ($order) {
            $order->delete();
            // You may also want to delete related order items here
            // Orderitems::where('order_id', $orderId)->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Order canceled by admin successfully.',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found.',
            ]);
        }
    } else {
        return response()->json([
            'status' => 401,
            'message' => 'Unauthorized. Only admin users can cancel orders.',
        ]);
    }
}



public function getTotalSales()
    {
        $orderItems = Orderitems::all();

        $totalQty = $orderItems->sum('qty');
        $totalPrice = $orderItems->sum(function ($item) {
            return $item->qty * $item->price;
        });

        return [
            'total_qty' => $totalQty,
            'total_price' => $totalPrice,
        ];
    }
}
