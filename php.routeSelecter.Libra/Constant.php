<?php

/*
 * Constant defination for Libra
 * base 2017-02-07 Barton Joe
 */

namespace Lucy;

class LIBRA_CONSTANT {

    private $_PROTOCOL;
    private $_MAXWAITTIMESTAMP;
    private $_TIMEOUT;
    private $_MAPDEFINATION;
    private $_INFODATA;

    public function __construct() {
        $this->_PROTOCOL = 'http';
        $this->_MAXWAITTIMESTAMP = 9.9;
        $this->_TIMEOUT = 300;

        $this->_MAPDEFINATION = new \stdClass();
        $this->_MAPDEFINATION->fileName = 'map.json';
        $this->_MAPDEFINATION->ipKey = 'serviceIp';
        $this->_MAPDEFINATION->portKey = 'servicePort';

        $this->_MAPDEFINATION->errUnFormatableData = 'unformatable data';
        $this->_MAPDEFINATION->errEmptyRecord = 'no route in map';
        $this->_MAPDEFINATION->errNoFile = 'no route map';
        $this->_MAPDEFINATION->errEnReachable = 'no reachble route';

        $this->_INFODATA = new \stdClass();
        $this->_INFODATA->testMsg = 'TEST_TIMESTAMP';
    }

    public function getProtocol() {
        return $this->_PROTOCOL;
    }

    public function getMaxWaitTime() {
        return $this->_MAXWAITTIMESTAMP;
    }

    public function getTimeOut() {
        return $this->_TIMEOUT;
    }

    public function getMapDefination() {
        return $this->_MAPDEFINATION;
    }

    public function getInfoData() {
        return $this->_INFODATA;
    }

}
