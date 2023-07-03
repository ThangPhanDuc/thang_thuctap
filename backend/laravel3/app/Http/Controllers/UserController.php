<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function updateUser(Request $request){
        $user=Auth::user();

        $user->name=$request->name;
        $user->age=$request->age;
        $user->phone=$request->phone;
        $user->address=$request->address;

        $user->save();

        return $user;
    }
}
