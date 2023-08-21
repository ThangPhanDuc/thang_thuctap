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
        Schema::create('dating_criterias', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->unique();
            $table->integer('min_age')->nullable();
            $table->integer('max_age')->nullable();
            $table->integer('min_height')->nullable();
            $table->integer('max_height')->nullable();
            $table->string('education')->nullable();
            $table->string('relationship_status')->nullable();
            $table->string('dating_goal')->nullable();

            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dating_criterias');
    }
};
