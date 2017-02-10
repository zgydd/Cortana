<?php

/*
 * common function for Lucy by PHP
 * add _formatTimeStampToMS         2017-02-10                  Barton Joe
 * add _checkPostUrl                2017-02-10                  Barton Joe
 * add _checkRules                  2017-02-08                  Barton Joe
 * base                             2017-02-07                  Barton Joe
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
    exec("ipconfig", $out, $stats);
    if (!empty($out)) {
        foreach ($out AS $row) {
            if (strstr($row, "IP") && strstr($row, ":") && !strstr($row, "IPv6")) {
                $tmpIp = explode(":", $row);
                if (preg_match($preg, trim($tmpIp[1]))) {
                    return trim($tmpIp[1]);
                }
            }
        }
    }
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

function _checkRules($record, $rules) {

    $p_rules = (array) $rules;
    $p_record = (array) $record;

    if (!array_key_exists('target', $p_rules) || !array_key_exists('operator', $p_rules) || !array_key_exists('condition', $p_rules)) {
        return 102;
    }
    if (!array_key_exists($p_rules['target'], $p_record)) {
        return 103;
    }

    switch ($p_rules['operator']) {
        case 1:
            $arrCondition = explode(',', $p_record[$p_rules['target']]);
            foreach ($arrCondition as $condition) {
                if ($p_rules['condition'] == $condition) {
                    return 1;
                }
            }
            return 201;
        default :
            return 999;
    }
}

function _checkPostUrl($url) {
    //https://255.255.255.255:65535
    $preg = "/\A(http|https|ftp)\:\/\/((([0-9]?[0-9])|(1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))\.){3}(([0-9]?[0-9])|(1[0-9]{2})|(2[0-4][0-9])|(25[0-5]))\Z/";

    $tmpArr = explode(':', $url);

    switch (TRUE) {
        case (isset($tmpArr[2])):
            if (!preg_match($preg, $tmpArr[0] . ':' . $tmpArr[1])) {
                return FALSE;
            }
            if ($tmpArr[2] <= 0 || $tmpArr[2] > 65535) {
                return FALSE;
            }
            break;
        case (isset($tmpArr[1])):
            if (!preg_match($preg, $tmpArr[0] . ':' . $tmpArr[1])) {
                return FALSE;
            }
            break;
        default:
            return FALSE;
    }
    return TRUE;
}

function _formatTimeStampToMS($timeStamp) {
    list($usec, $sec) = explode(".", $timeStamp);
    $date = date('Y-m-d H:i:s:x', $usec);
    return str_replace('x', $sec, $date);
}
