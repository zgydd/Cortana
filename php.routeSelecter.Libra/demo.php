<?php

require_once 'routeSelector.php';

//echo '<>' date("Y-m-d H:i:s", time());
$routeSelector = new \ZRouteSelector();
$chooseRoute = $routeSelector->selectRoute();
echo $chooseRoute;