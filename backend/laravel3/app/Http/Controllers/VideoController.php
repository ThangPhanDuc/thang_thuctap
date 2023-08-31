<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Video;
use App\Models\VideoLike;
use App\Models\VideoComment;

class VideoController extends Controller
{
    public function getVideos(Request $request)
    {
        $user = Auth::user();
        $videos = Video::with('post.user', 'comments.user')
            ->withCount('likes')
            ->orderBy('videos.created_at', 'desc')
            ->paginate(10);


        foreach ($videos as $video) {
            $video->liked_by_user = $video->likes()->where('user_id', $user->id)->exists();
        }

        return response()->json($videos);
    }

    public function likeVideo(Request $request)
    {
        $videoId = $request->video_id;
        $video = Video::findOrFail($videoId);
        $user = Auth::user();

        $existingLike = VideoLike::where('user_id', $user->id)
            ->where('video_id', $video->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            return response()->json(['message' => 'Unlike successful'], 200);
        } else {
            $like = new VideoLike();
            $like->user_id = $user->id;
            $like->video_id = $video->id;
            $like->save();
            return response()->json(['message' => 'Like successful'], 201);
        }
    }

    public function commentVideo(Request $request)
    {
        $videoId = $request->video_id;
        $video = Video::findOrFail($videoId);
        $user = Auth::user();

        $comment = new VideoComment();
        $comment->user_id = $user->id;
        $comment->video_id = $video->id;
        $comment->content = $request->input('content');
        $comment->save();

        return response()->json(['message' => 'Comment added'], 201);
    }

    public function getVideoById(Request $request, $videoId)
    {
        $user = Auth::user();
        $video = Video::with('post.user', 'comments.user')
            ->withCount('likes')
            ->findOrFail($videoId);

        $video->liked_by_user = $video->likes()->where('user_id', $user->id)->exists();

        return response()->json($video);
    }


    public function searchVideos(Request $request)
    {
        $user = Auth::user();
        $query = $request->input('query');

        $videos = Video::with('post.user', 'comments.user')
            ->withCount('likes')
            ->whereHas('post', function ($queryBuilder) use ($query) {
                $queryBuilder->where('content', 'like', '%' . $query . '%');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        foreach ($videos as $video) {
            $video->liked_by_user = $video->likes()->where('user_id', $user->id)->exists();
        }

        return response()->json($videos);
    }
}
