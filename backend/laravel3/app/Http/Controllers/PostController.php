<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use App\Models\Photo;
use App\Models\Like;
use App\Models\Comment;
use Illuminate\Support\Facades\File;

class PostController extends Controller
{
    public function createPost(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $content = $request->content;

        $post = new Post();
        $post->user_id = $user_id;
        $post->content = $content;
        $post->save();

        // $images = $request->file('images');

        // foreach ($images as $image) {
        //     $imageName = time() . '_' . $image->getClientOriginalName();
        //     $image->move(public_path('Post_Images'), $imageName);
        // }

        $image = $request->file('images');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->move(public_path('Post_Images'), $imageName);

        $photo = new Photo();
        $photo->post_id = $post->id;
        $photo->path  = 'Post_Images/' . $imageName;
        $photo->save();


        return response()->json(['status' => 'create post successfully']);
    }

    public function getAllPost(Request $request)
    {
        $posts = Post::with('user', 'photos')
            ->withCount('likes')
            ->get();
        return $posts;
    }

    public function likePost(Request $request)
    {
        $user  = Auth::user();
        $post_id = $request->post_id;

        $like = new Like();
        $like->user_id = $user->id;
        $like->post_id = $post_id;
        $like->save();

        return response()->json(['status' => 'like post successfully']);
    }

    public function commentPost(Request $request)
    {
        $user  = Auth::user();
        $post_id = $request->post_id;
        $content = $request->content;

        $comment = new Comment();
        $comment->user_id = $user->id;
        $comment->post_id = $post_id;
        $comment->content = $content;
        $comment->save();

        return response()->json(['status' => 'comment post successfully']);
    }
}
