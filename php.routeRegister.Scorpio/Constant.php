<?php

/*
 * Constant defination for Scorpio
 * base 2017-02-07 Barton Joe
 */

namespace Lucy;

require_once 'commFunc.php';

class SCORPIO_CONSTANT {

    private $_SCORPIO_DEFINATION = ["serviceId" => 'Z_SRV_0',
        "serviceName" => 'sample', "serviceIp" => '', "servicePort" => '20001'];
    private $_TIMEOUT = 2;
    private $_TARGET_CANCERS = array();

    public function __construct() {
        $this->_SCORPIO_DEFINATION["serviceIp"] = _getLocalIP();

        $mapFile = 'map.json';
        if (file_exists($mapFile) && abs(filesize($mapFile)) > 0) {
            $arr = (array) json_decode(file_get_contents($mapFile));
            if (count($arr)) {
                foreach ($arr as $row) {
                    if (array_key_exists('serviceProtocol', $row) && array_key_exists('serviceIp', $row) && array_key_exists('servicePort', $row)) {
                        array_push($this->_TARGET_CANCERS, $row->serviceProtocol . '://' . $row->serviceIp . ':' . $row->servicePort);
                    } else {
                        //Exception unformatable data
                    }
                }
            } else {
                //Exception no data
            }
        } else {
            //Exception no file
        }
    }

    public function __destruct() {
        $this->_SCORPIO_DEFINATION = NULL;
        $this->_TIMEOUT = NULL;
        $this->_TARGET_CANCERS = NULL;
    }

    public function getDefination() {
        return $this->_SCORPIO_DEFINATION;
    }

    public function getTimeOut() {
        return $this->_TIMEOUT;
    }

    public function getTargets() {
        return $this->_TARGET_CANCERS;
    }

}
