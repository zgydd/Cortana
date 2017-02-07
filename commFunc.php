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

function _getLocalIP() {
    $preg = "/\A((([0-9]?[0-9])|(1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))\.){3}(([0-9]?[0-9])|(1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))\Z/";
//    exec("ipconfig", $out, $stats);
//    if (!empty($out)) {
//        foreach ($out AS $row) {
//            if (strstr($row, "IP") && strstr($row, ":") && !strstr($row, "IPv6")) {
//                $tmpIp = explode(":", $row);
//                if (preg_match($preg, trim($tmpIp[1]))) {
//                    return trim($tmpIp[1]);
//                }
//            }
//        }
//    }
    exec("ifconfig", $out, $stats);
    if (!empty($out)) {
        if (isset($out[1]) && strstr($out[1], 'addr:')) {
            $tmpArray = explode(":", $out[1]);
            $tmpIp = explode(" ", $tmpArray[1]);
            if (preg_match($preg, trim($tmpIp[0]))) {
                return trim($tmpIp[0]);
            }
        }
    }
    return '127.0.0.1';
}
