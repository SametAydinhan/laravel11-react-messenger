<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('online', function ($user) {
    return $user;
});
