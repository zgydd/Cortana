<?php

/*
 * Scorpio: Regist me to one or more cancers by map
 * base 2017-02-07 Barton Joe
 */

namespace Lucy;

require_once 'Constant.php';

class Scorpio {

    private $config;

    public function __construct() {
        $this->config = new \Lucy\SCORPIO_CONSTANT();
    }

    public function __destruct() {
        $this->config = NULL;
    }

    public function registMe() {

        $data = $this->config->getDefination();
        $cancerList = $this->config->getTargets();
        $waitTimeOut = $this->config->getTimeOut();
        
        $result = array();

        foreach ($cancerList as $target) {

            $tmpRecord = ["target" => $target, "result" => ''];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $target);
            curl_setopt($ch, CURLOPT_TIMEOUT, $waitTimeOut);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            $tmpRecord["result"] = curl_exec($ch);
            if (curl_errno($ch)) {
                print curl_error($ch);
            }
            curl_close($ch);
            array_push($result, $tmpRecord);
        }

        return $result;
    }

}
