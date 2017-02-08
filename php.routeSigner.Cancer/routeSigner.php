<?php

namespace Lucy;

require_once 'Constant.php';

class Cancer {

    private $config;

    public function __construct() {
        $this->config = new \Lucy\CANCER_CONSTANT();
    }

    public function __destruct() {
        $this->config = NULL;
    }

    public function signARoute($postData) {
        $mapDefination = $this->config->getMapDefination();
        
        if (!array_key_exists($mapDefination->ipKey, $postData) || !array_key_exists($mapDefination->portKey, $postData)) {
            return $mapDefination->errUnFormatableData;
        } else {
            $content = json_encode($postData);
        }
        
        if (file_exists($mapDefination->fileName) && abs(filesize($mapDefination->fileName)) > 0) {
            $arr = (array) json_decode(file_get_contents($mapDefination->fileName));
            foreach ($arr as $row) {
                if ($row->serviceIp == $postData[$mapDefination->ipKey] && $row->servicePort == $postData[$mapDefination->portKey]) {
                    return $mapDefination->errExistRecord;
                }
            }

            array_push($arr, $postData);
            $content = json_encode($arr);
        } else {
            $content = '[' . $content . ']';
        }

        file_put_contents($mapDefination->fileName, $content);
        return $content;
    }

}
