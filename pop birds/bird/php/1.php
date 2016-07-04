<?php
$db=mysql_connect("localhost","root","");
$aa=mysql_selectdb("newgame");
$result=mysql_query("select * from bird");
$data=mysql_fetch_assoc($result);

if(isset($_POST["step"])){
  if($_POST["step"]>$data["step"]){
  $aa=$_POST["step"];
   mysql_query("update bird set step='{$aa}'");
  }
}
$result=mysql_query("select * from bird");
$data=mysql_fetch_assoc($result);
echo $data["step"];
?>