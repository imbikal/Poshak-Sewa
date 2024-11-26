<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    function forgetPassword(){
        return view("forget-password");
    }
    function forgetPasswordPost(Request $request){
        
    }
}
