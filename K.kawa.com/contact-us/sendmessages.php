<?php
header("Content-Type: text/html; charset=utf-8");
require 'class.phpmailer.php';
require 'class.smtp.php';

function get_ip(){
   if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown"))
	   $ip = getenv("HTTP_CLIENT_IP");
   else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown"))
	   $ip = getenv("HTTP_X_FORWARDED_FOR");
   else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown"))
	   $ip = getenv("REMOTE_ADDR");
   else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown"))
	   $ip = $_SERVER['REMOTE_ADDR'];
   else
	   $ip = "unknown";
   return($ip);
}

$contact_person=$_POST['contact-person'];
$email=$_POST['email'];
$company=$_POST['company'];
$phone=$_POST['phone'];
$fax=$_POST['fax'];
$address=$_POST['address'];
$subject=$_POST['subject'];
$content=$_POST['content'];
$mail = new PHPMailer();
$mail->CharSet = "utf8";
$mail->Encoding = "base64";
$mail->SMTPDebug = 1;
$mail->IsSMTP();
$mail->SMTPAuth = true;         
$mail->Port = 465; 
$mail->IsSendmail();
$mail->From = "{$email}"; 
$mail->FromName = "{$name}"; 
$mail->AddAddress("p_songui@163.com");

	$mail->Subject = "Feedback";
	date_default_timezone_set('Asia/Shanghai');
	$time = date("Y-m-d H:i:s",time());
	$html ="
	<br/>
	<br/>
	Customer Message:<br/>
	<strong>Please pay attention to the following information and reply as soon as possible.</strong><br/><br/>
	<strong>Inquirer's name:</strong> {$contact_person}<br/><br/>
	<strong>Inquirer's email address:</strong> {$email}<br/><br/>
	<strong>Inquirer's company:</strong> {$company}<br/><br/>
	<strong>Inquirer's phone:</strong> {$phone}<br/><br/>
	<strong>Inquirer's fax:</strong> {$fax}<br/><br/>
	<strong>Inquirer's address:</strong> {$address}<br/><br/>
	<strong>Inquirer's subject:</strong> {$subject}<br/><br/>
	<strong>Tell us your needs (as specific as possible):</strong><br/>{$content}<br/><br/>
	<strong>Time:</strong> {$time}<br/><br/>";
	$mail->MsgHTML($html);
	$mail->IsHTML(true); 
	if(!$mail->Send()) {
		echo "Mail Error :".$mail->ErrorInfo;
		echo '<script>alert("Submission Failed!");history.back();</script>';
	} else {
		echo '<script>alert("Submitted successfully! Thank you for your feedback!");history.go(-1);</script>';
	}
?>