<?php

/*
 * Libra's test demo
 * base 2017-02-07 Barton Joe
 */

require_once 'routeSelecter.php';

//echo  date("Y-m-d H:i:s", time());

$selectRules =new \stdClass();
$selectRules->target = 'serviceId';
$selectRules->operator = 1;
$selectRules->condition = 'Z_SRV_0';

$routeSelecter = new \Lucy\Libra($selectRules);

$start = microtime(true);
$chooseRoute = $routeSelecter->selectRoute();
var_dump($chooseRoute);
$mid = microtime(true);
//$chooseRoute = $routeSelecter->selectMultiRoute();
//var_dump($chooseRoute);
//$end = microtime(true);
var_dump($mid - $start);
//var_dump($end-$mid);
