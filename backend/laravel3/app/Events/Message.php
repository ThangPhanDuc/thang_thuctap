<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

 

    /**
     * Create a new event instance.
     *
     * @return void
     */

    public $sender_id;
    public $recipient_id;
    public $content;

    public function __construct(int $sender_id, int $recipient_id, string $content)
    {
        $this->sender_id = $sender_id;
        $this->recipient_id = $recipient_id;
        $this->content = $content;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        // return new PrivateChannel('channel-name');

        return new PrivateChannel('chat.' . $this->recipient_id);

        // return ['chat.'];
    }

    public function broadcastAs()
    {

        return 'message';
    }
}
