<?php
/**
 * 站内新闻发布
 *
 * @version        $Id: mynews_add.php 1 15:27 2010年7月20日Z 
 */
require_once(dirname(__FILE__)."/config.php");
CheckPurview('plus_站内新闻发布');
if(empty($dopost)) $dopost = "";

if($dopost=="save")
{
    $dtime = GetMkTime($sdate);
    $query = "INSERT INTO `#@__mynews`(title,writer,senddate,body)
     VALUES('$title','$writer','$dtime','$body')";
    $dsql->ExecuteNoneQuery($query);
    ShowMsg("成功发布一条站内新闻！", "mynews_main.php");
    exit();
}
include GEMELINClude('templets/mynews_add.htm');