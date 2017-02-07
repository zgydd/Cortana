<?php

/*
 * Libra's test demo
 * base 2017-02-07 Barton Joe
 */

require_once 'routeSelector.php';

//echo  date("Y-m-d H:i:s", time());
$routeSelector = new \Lucy\ZRouteSelector();
$chooseRoute = $routeSelector->selectRoute();
echo $chooseRoute;
