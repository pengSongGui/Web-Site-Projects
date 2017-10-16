<?php
/**
 * 会员操作日志记录管理
 *
 * @version        $Id: member_operations.php 1 11:24 2010年7月20日Z 
 */
require_once(dirname(__FILE__)."/config.php");
CheckPurview('member_Operations');
setcookie("ENV_GOBACK_URL",$gemelNowurl,time()+3600,"/");
require_once(GEMELINC.'/datalistcp.class.php');

if(empty($buyid)) $buyid = '';
$addsql = " WHERE buyid LIKE '%$buyid%' ";
if(isset($sta)) $addsql .= " AND sta='$sta' ";

$sql = "SELECT * FROM `#@__member_operation` $addsql ORDER BY aid DESC";
$dlist = new DataListCP();

//设定每页显示记录数（默认25条）
$dlist->pageSize = 25;
$dlist->SetParameter("buyid",$buyid);
if(isset($sta)) $dlist->SetParameter("sta",$sta);

$dlist->dsql->SetQuery("SELECT * FROM #@__moneycard_type ");
$dlist->dsql->Execute('ts');
while($rw = $dlist->dsql->GetArray('ts'))
{
    $TypeNames[$rw['tid']] = $rw['pname'];
}
$tplfile = GEMELADMIN."/templets/member_operations.htm";

//这两句的顺序不能更换
$dlist->SetTemplate($tplfile);      //载入模板
$dlist->SetSource($sql);            //设定查询SQL
$dlist->Display();                  //显示

function GetMemberID($mid)
{
    global $dsql;
    if($mid==0)
    {
        return '0';
    }
    $row = $dsql->GetOne("SELECT userid FROM `#@__member_list` WHERE mid='$mid' ");
    if(is_array($row))
    {
        return "<a href='member_view.php?id={$mid}'>".$row['userid']."</a>";
    }
    else
    {
        return '0';
    }
}

function GetPType($tname)
{
    if($tname=='card') return '点数卡';
    else if($tname=='archive') return '购买文章';
    else if($tname=='stc') return '兑换金币';
    else return '会员升级';
}

function GetSta($sta)
{
    if($sta==0)
    {
        return '未付款';
    }
    else if($sta==1)
    {
        return '已付款';
    }
    else
    {
        return '已完成';
    }
}