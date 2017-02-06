<?php

class LIBRA_CONSTANT {

    private $_PROTOCOL;
    private $_MAXWAITTIMESTAMP;

    public function __construct() {
        $this->_PROTOCOL = 'http';
        $this->_MAXWAITTIMESTAMP = 9.9;
    }
    
    public function getProtocol(){
        return $this->_PROTOCOL;
    }
    public function getMaxWaitTime(){
        return $this->_MAXWAITTIMESTAMP;
    }
}

