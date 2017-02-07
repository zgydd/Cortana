<?php

/*
 * Scorpio's test demo
 * base 2017-02-07 Barton Joe
 */

require_once 'routeRegister.php';

//echo  date("Y-m-d H:i:s", time());
$routeRegister = new \Lucy\Scorpio();
$registResult = $routeRegister->registMe();
var_dump($registResult);
