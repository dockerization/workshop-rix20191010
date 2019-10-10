<?php

use Charger\Controllers\PaymentController;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

require '../vendor/autoload.php';

$app = new Slim\App();

$app->post('/payment', function(ServerRequestInterface $request, ResponseInterface $response) {
    return (new PaymentController())->payment($request, $response);
});

$app->run();
