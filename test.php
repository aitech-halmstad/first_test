<?php
//test
	print 'var chartData = [';
	
	for($i = 0; $i < 1440; $i++)
	{
		$hh = floor($i/60);
		if($hh < 10)
			$hh = '0'.$hh;
			
		$mm = floor($i%60);
		if($mm < 10)
			$mm = '0'.$mm;
			
		$data = rand(0,1);	
		
		if($data == 1)
			$neg = 0;
		else
			$neg = 1;
			
		print '
			}, <br>{
			LogDt: "2012-01-01 '.$hh.':'.$mm.':00",
                Run: '.$data.', 
				Stop: '.$neg;
	}

	print '}];';

?>