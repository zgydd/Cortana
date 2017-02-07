<?php

/*
 * Libra: Choose a route from map JSON by response
 * base 2017-02-07 Barton Joe
 */

namespace Lucy;

require_once 'commFunc.php';
require_once 'Constant.php';

class ZRouteSelector {

    private $config;
    private $filename;
    private $routeMap;
    private $route;

    public function __construct() {
        $this->config = new \Lucy\LIBRA_CONSTANT();
        $mapData = $this->config->getMapDefination();
        $this->filename = $mapData->fileName;
        $this->routeMap = array();
        $arr = array();
        if (file_exists($this->filename) && abs(filesize($this->filename)) > 0) {
            $arr = (array) json_decode(file_get_contents($this->filename));
            if (count($arr)) {
                foreach ($arr as $row) {
                    if (array_key_exists($mapData->ipKey, $row) && array_key_exists($mapData->portKey, $row)) {
                        array_push($this->routeMap, $this->config->getProtocol() . '://' . $row->serviceIp . ':' . $row->servicePort);
                    } else {
                        //Exception unformatable data
                        $this->route = $mapData->errUnFormatableData;
                    }
                }
            } else {
                //Exception no route in map
                $this->route = $mapData->errEmptyRecord;
            }
        } else {
            //Exception no route map
            $this->route = $mapData->errNoFile;
        }
    }

    public function __destruct() {
        $this->filename = NULL;
        $this->routeMap = NULL;
        $this->route = NULL;
    }

    private function _setMyRoute($row, $minTimeStamp) {
        $start = microtime(true);
        $ret = _getRequireTimeStamp($row, $this->config->getTimeOut(), $this->config->getInfoData()->testMsg);
        if (!$ret) {
            //Remove this route
        } else {
            if ($minTimeStamp > ($ret - $start)) {
                $this->route = $row;
            }
        }
        if (empty($this->route)) {
            $mapData = $this->config->getMapDefination();
            //Exception unformatable data
            $this->route = $this->config->getMapDefination()->errEnReachable;
        }
    }

    public function selectRoute() {
        $minTimeStamp = $this->config->getMaxWaitTime();
        foreach ($this->routeMap as $row) {
            $this->_setMyRoute($row, $minTimeStamp);
        }
        return $this->route;
    }

}
