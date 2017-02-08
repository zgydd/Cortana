<?php

require_once 'routeSigner.php';

$postData = (array) json_decode(file_get_contents("php://input"));

$routeSigner = new \Lucy\Cancer();

$signResult = $routeSigner->signARoute($postData);

echo $signResult;
