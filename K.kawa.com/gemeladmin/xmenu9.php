<?php
require(dirname(__FILE__).'/config.php');
require(GEMELADMIN.'/inc/xmenu9.php');
require(GEMELADMIN.'/inc/inc_menu_func.php');
$openitem = (empty($openitem) ? 1 : $openitem);
include GEMELINClude('templets/xmenu9.htm');
?>
