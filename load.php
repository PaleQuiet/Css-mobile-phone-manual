<?php
    $parent = ltrim($_GET['parent']);
    $child = ltrim($_GET['child']);
    $sun = ltrim($_GET['sun']);
    if ($sun!='') {
        $url = "http://www.css88.com/book/css/".$_GET['parent']."/".$_GET['child']."/".$_GET['sun'].".htm";
        $page = file_get_contents($url);
        echo $page;
    }else if($child!=''){
        $url = "http://www.css88.com/book/css/".$_GET['parent']."/".$_GET['child'].".htm";
        $page = file_get_contents($url);
        echo $page;
    }else{
        $url = "http://www.css88.com/book/css/".$_GET['parent'].".htm";
        $page = file_get_contents($url);
        echo $page;
    }

?>
