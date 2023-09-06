<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_post_videos', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('group_post_id');
            $table->string('video_path');
            $table->timestamps();

            $table->foreign('group_post_id')->references('id')->on('group_posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_post_videos');
    }
};
