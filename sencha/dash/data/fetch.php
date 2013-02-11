<?PHP
/*
$arr1 = array('StoppTidpunkt'=>'2012-10-10 10:10:10', 'StartTidpunkt' => '2012-10-11 11:11:11', 'Stopporsak' => 'Neger fastnade i ugnen');
$arr2 = array('StoppTidpunkt'=>'2012-10-12 10:10:10', 'StartTidpunkt' => '2012-10-13 11:11:11', 'Stopporsak' => 'Jude fastnade i ugnen');
$arr3 = array('StoppTidpunkt'=>'2012-10-14 10:10:10', 'StartTidpunkt' => '2012-10-15 11:11:11', 'Stopporsak' => 'Muslim fastnade i ugnen');

$Stopp['data'] = array($arr1, $arr2, $arr3);
die(json_encode($Stopp));
*/

$con = mysql_connect("localhost", "root", "XomonaD");
mysql_select_db("wecotech_db5_stena_ee");

$query = "SELECT * FROM plastlinje_stopp WHERE StoppTidpunkt BETWEEN '2012-12-13 00:00:00' AND '2012-12-18 23:59:59'";
$sql = mysql_query($query) or die(mysql_error());

$Stopp['data'] = array();
while($row = mysql_fetch_array($sql))
{
	$Stopp['data'] += array('StoppTidpunkt' => $row['StoppTidpunkt'], 'StartTidpunkt' => $row['StartTidpunkt'], 'Stopporsak' => $row['Stopporsak'])
}
die(json_encode($Stopp));