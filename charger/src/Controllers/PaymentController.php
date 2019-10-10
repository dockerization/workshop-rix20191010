<?php


namespace Charger\Controllers;


use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Class PaymentController
 * @package Charger\Controllers
 */
class PaymentController
{
    /**
     * @var array
     */
    private $cardsData;

    /**
     * @var array
     */
    private $paymentData;

    /**
     * @var string
     */
    private $pathToCardsCache = '../storage/cache/cards.cache';

    /**
     * @var string
     */
    private $pathToCardsStorage = '../storage/data/cards.json';

    /**
     * PaymentController constructor.
     */
    public function __construct()
    {
        $this->loadData();
    }

    /**
     * Load data from storage
     */
    private function loadData()
    {
        $data = @file_get_contents($this->pathToCardsCache);

        if ($data === false) {
            $rawData = file_get_contents($this->pathToCardsStorage);
            $rawData = json_decode($rawData, true);
            $data = serialize($rawData);
            file_put_contents($this->pathToCardsCache, $data);
        }

        $this->cardsData = unserialize($data);
    }

    /**
     * Check requested JSON for validity
     *
     * @param array $json
     * @return bool
     */
    private function isRequestJsonValid($json)
    {
        $mandatoryKeys = [
            'ccnum',
            'pin',
            'name',
            'description',
            'price',
        ];

        foreach ($mandatoryKeys as $key) {
            if (!isset($json[$key])) {
                return false;
            }
        }

        $this->paymentData = $json;
        return true;
    }

    /**
     * Get card by credit card number in payment data
     *
     * @return array
     */
    private function getCardByCC()
    {
        foreach ($this->cardsData as $card) {
            if ($card['ccnum'] == $this->paymentData['ccnum'])
            {
                return $card;
            }
        }

        return [];
    }

    /**
     * Check if card is valid
     *
     * @param array $card
     * @return bool
     */
    private function isCardValid($card)
    {
        return $card['pin'] == $this->paymentData['pin']
        &&  $card['balance'] >= $this->paymentData['price'];
    }

    private function updateBalanceInCache($ccnum, $newBalance)
    {
        for ($i=0, $c = count($this->cardsData); $i < $c; $i++) {
            if ($this->cardsData[$i]['ccnum'] == $ccnum) {
                $this->cardsData[$i]['balance'] = $newBalance;
            }
        }

        file_put_contents($this->pathToCardsCache, serialize($this->cardsData));
    }

    /**
     * Charge card
     *
     * @return bool
     */
    private function charge()
    {
        $card = $this->getCardByCC();

        if (!empty($card)) {
            if ($this->isCardValid($card)) {
                $newBalance = $card['balance'] - $this->paymentData['price'];
                $this->updateBalanceInCache($card['ccnum'], $newBalance);
                return true;
            }
        }

        return false;
    }

    /**
     * Process payment
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return \Psr\Http\Message\MessageInterface
     */
    public function payment(ServerRequestInterface $request, ResponseInterface $response)
    {
        $parsedBody = $request->getParsedBody();

        if (! $this->isRequestJsonValid($parsedBody)) {
            $response->write(json_encode(["message" => "Invalid data passed"]));

            return $response
                ->withStatus(400)
                ->withHeader('Content-Type', 'application/json');
        }

        if ($this->charge()) {
            $response->write(json_encode([
                'success' => true,
                'message' => 'Payment has been done successfully'
            ]));

        } else {
            $response->write(json_encode([
                'success' => false,
                'message' => 'Payment has been failed'
            ]));
        }

        return $response->withHeader('Content-Type', 'application/json');
    }
}