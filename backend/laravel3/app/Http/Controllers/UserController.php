<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use app\Models\User;

class UserController extends Controller
{
    public function updateUser(Request $request)
    {

        $validator = Validator::make($request->all(), [
            // 'name' => 'required',
            // 'age' => 'required|numeric',
            // 'phone' => 'required',
            // 'address' => 'required',
            // 'image' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads'), $imageName);
        }

        $user = Auth::user();
        $user->name = $request->name;
        $user->age = $request->age;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->profile = $request->profile;
        if (isset($imageName)) {
            $user->img = 'uploads/' . $imageName;
        }
        $user->save();

        return response()->json(['message' => 'User updated successfully.']);
    }

    public function getAllUser()
    {
        $users = User::all();
        return $users;
    }

    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 5); 
        $users = User::paginate($perPage);

        return $users;
    }

    public function getUserById(Request $request)
    {
        $id = $request->id;
        $user = User::findOrFail($id);
        return $user;
    }
}
