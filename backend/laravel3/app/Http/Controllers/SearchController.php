<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class SearchController extends Controller
{
    public function getPostByKeyword(Request $request)
    {
        $keyword = $request->input('keyword');
      

        $posts = Post::with('user', 'photos', 'comments.user')
            ->withCount('likes')
            ->where('content', 'like', "%$keyword%")
            ->orderBy('created_at', 'desc')
            ->paginate(2);
        return response()->json($posts);
    }
}
