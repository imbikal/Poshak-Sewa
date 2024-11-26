<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;

class UsersController extends Controller
{
    public function index()
    {
        $users = Users::all();
        return response()->json([
            'status'=>200,
            'users'=>$users,
        ]);
    }

    public function allusers()
    {
        $users = Users::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'users'=>$users,
        ]);
    }

    public function edit($id)
    {
        $users = Users::find($id);
        if($users)
        {
            return response()->json([
                'status'=>200,
                'users'=>$users
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Users Id Found'
            ]);
        }

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',


        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $users = new Users;
            $users->name = $request->input('name');
            $users->email = $request->input('email');
            $users->password = Hash::make($request->input('password'));


            $users->save();
            return response()->json([
                'status'=>200,
                'message'=>'Users Added Successfully',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191',
            'password'=>'required|max:191',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $users = Users::find($id);
            if($users)
            {
                $users->name = $request->input('name');
                $users->email = $request->input('email');
                $users->password = $request->input('password');

                $users->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Users Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No Users ID Found',
                ]);
            }

        }
    }

    public function destroy($id)
    {
        $users = Users::find($id);
        if($users)
        {
            $users->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Users Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Users ID Found',
            ]);
        }
    }

    public function appointAdmin($id)
   {
    $users = Users::find($id);

    if ($users) {
        $users->role_as = 1; // Assign admin role (assuming 1 represents the admin role)
        $users->save();

        return response()->json([
            'status' => 200,
            'message' => 'User assigned admin role successfully',
        ]);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'User not found',
        ]);
    }
    }
    public function removeAdmin($id)
   {
    $users = Users::find($id);

    if ($users) {
        $users->role_as = 0; // Assign user role (assuming 0 represents the user role)
        $users->save();

        return response()->json([
            'status' => 200,
            'message' => 'User removed from admin role successfully',
        ]);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'User not found',
        ]);
    }
    }

}

