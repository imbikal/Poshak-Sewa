<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'user_id',
        'firstname',
        'lastname',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'zipcode',
        'payment_id',
        'payment_mode',
        'returned',
        'tracking_no',
        'status',
        'remark'
    ];

    public function orderitems()
    {
        return $this->hasMany(Orderitems::class, 'order_id', 'id');
    }
    
    public function returned()
    {
        return $this->hasOne(Returns::class, 'order_id', 'id');
    }

}
