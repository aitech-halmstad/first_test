<?PHP
	
	$cmd = $_GET['cmd'];
	$parent = $_GET['parent'];

	$con = mysql_connect("localhost", "brn", "ringen2012");
	mysql_select_db("wecotech_db1_stena");

	if($cmd == "getPlantInfo")
	{
		$query = "SELECT id, name FROM halmstad_stop_positions_sections";
		$sql = mysql_query($query) or die(mysql_error());

		$jsonArray['plant'] = array();

		while($row = mysql_fetch_array($sql))
		{
			$plant = array('id' => $row['id'], 'name' => $row['name']);
			array_push($jsonArray['plant'], $plant);
		}
		die(json_encode($jsonArray));
	}
	if($cmd == "getPositionInfo")
	{
		$query = "SELECT id, name FROM halmstad_stop_positions WHERE section_id = '$parent'";
		$sql = mysql_query($query) or die(mysql_error());

		$jsonArray['positions'] = array();

		while($row = mysql_fetch_array($sql))
		{
			$positions = array('id' => $row['id'], 'name' => $row['name']);
			array_push($jsonArray['positions'], $positions);
		}
		die(json_encode($jsonArray));
	}

	if($cmd == "getStops")
	{
		if(isset($_GET['StoppTidpunkt']) && isset($_GET['StartTidpunkt']))
		{
			$stop = $_GET['StoppTidpunkt'];
			$start = $_GET['StartTidpunkt'];
		}
		else
		{
			$stop = '2012-12-13 00:00:00';
			$start = '2012-12-18 23:59:59';
		}

		$query = "SELECT * FROM plastlinje_stopp WHERE StoppTidpunkt BETWEEN '$stop' AND '$start'";
		$sql = mysql_query($query) or die(mysql_error());

		$Stopp['data'] = array();
		while($row = mysql_fetch_array($sql))
		{
			$arr1 = array('name' => 'rand1', 'rating' => rand(1,10));
			$arr2 = array('name' => 'rand2', 'rating' => rand(1,10));
			$arr3 = array('name' => 'rand3', 'rating' => rand(1,10));
			$arr4 = array('name' => 'rand4', 'rating' => rand(1,10));

			$randVals = array($arr1, $arr2, $arr3, $arr4);



			//$randomValues = array('name' => 'Rand1' => $random1, 'Rand2' => $random2, 'Rand3' => $random3, 'Rand4' => $random3);
			$stopp = array('StoppTidpunkt' => $row['StoppTidpunkt'], 'StartTidpunkt' => $row['StartTidpunkt'], 'Stopporsak' => $row['Stopporsak'], 'Quality' => $randVals);
			array_push($Stopp['data'], $stopp);
			$randVals = null;
		}

		die(json_encode($Stopp));
	}


