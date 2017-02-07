<?php

/*
 * common function for Lucy by PHP
 * base 2017-02-07 Barton Joe
 */

function _getRequireTimeStamp($url, $timeout = 300, $testMsg = 'TEST_TIMESTAMP') {
    $test_ch = curl_init();
    curl_setopt($test_ch, CURLOPT_URL, $url);
    curl_setopt($test_ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($test_ch, CURLOPT_TIMEOUT_MS, $timeout);
    curl_setopt($test_ch, CURLOPT_CONNECTTIMEOUT_MS, $timeout);

    curl_setopt($test_ch, CURLOPT_POSTFIELDS, $testMsg);
    $response = curl_exec($test_ch);
    curl_close($test_ch);
    return $response;
}
