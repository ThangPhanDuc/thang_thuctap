<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Hello;

class HelloController extends Controller
{


    public function index()
    {
        // $hellos = DB::table("hellos")
        //     // ->where('id',1)
        //     ->where('title','hello')
        //     ->get();

        $hellos = Hello::
        // find(1);
        all();
        
        // dd($hellos);
        // return view("hello",[
        //     'hellos'=>$hellos,
        // ]);
        return response()->json($hellos);
    }
}
