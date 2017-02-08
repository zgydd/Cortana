<?php

namespace Lucy;

class CANCER_CONSTANT {

    private $_MAPDEFINATION;

    public function __construct() {
        $this->_MAPDEFINATION = new \stdClass();
        $this->_MAPDEFINATION->fileName = 'map.json';
        $this->_MAPDEFINATION->ipKey = 'serviceIp';
        $this->_MAPDEFINATION->portKey = 'servicePort';

        $this->_MAPDEFINATION->errUnFormatableData = 'unformatable data';
        $this->_MAPDEFINATION->errExistRecord = 'exist route in map';
    }

    public function __destruct() {
        $this->_MAPDEFINATION = NULL;
    }

    public function getMapDefination() {
        return $this->_MAPDEFINATION;
    }

}
