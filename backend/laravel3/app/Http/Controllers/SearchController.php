<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class SearchController extends Controller
{
    public function getPostByKeyword(Request $request)
    {
        $keyword = $request->keyword;
    
        $posts = Post::with('user', 'photos', 'comments.user')
            ->withCount('likes')
            ->where('content', 'like', "%$keyword%")
            ->orderBy('created_at', 'desc')
            ->paginate(2);
        return response()->json($posts);
    }

    public function getUserByKeyword(Request $request)
    {
        $keyword = $request->keyword;
    
        $users = User::where('name', 'like', '%' . $keyword . '%')->get();
    
        return response()->json($users);
    }
    
}
