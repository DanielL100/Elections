<!doctype html>
<html lang="en">
  	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
        <?php 
		//gets data from JSON file
		$file = fopen("data/data.json", 'r');
		if (flock($file, LOCK_SH)) { 
			if(fileSize("data/data.json") != 0){
				$json = fread($file, filesize("data/data.json"));
				$data = json_decode($json, true);
			
				//prepare data to js
				$url = $data["url"];
				$lastUpdate = $data["lastUpdate"];
				$acceptedVotes = array_values($data["general"])[3];
				$parties = $data["parties"];
				$partiesChar = $data["partiesChar"];
				$precentParties = $data["precentParties"];
				$votesParties = $data["votesParties"];
				flock($file, LOCK_UN);
			} else {
				flock($file, LOCK_UN);
				header("Refresh:0");
			}
		} else {
			header("Refresh:0");
		}
		fclose($file);

		$order = htmlspecialchars(trim($_SERVER['REQUEST_URI'], '/'),ENT_QUOTES,'UTF-8');
		
		?>
		<script type="text/javascript">
			var url = '<?=$url?>';
			var lastUpdate = '<?=$lastUpdate?>';
			var acceptedVotes = '<?=$acceptedVotes?>';
			var parties = <?=json_encode($parties)?>;
			var partiesChar = <?=json_encode($partiesChar)?>;
			var precentParties = <?=json_encode($precentParties)?>;
			var votesParties = <?=json_encode($votesParties)?>;

			//obfuscate
			var _0x51e9c5=_0x2a8b;(function(_0x3669dd,_0x43ee8){var _0xaab6d6=_0x2a8b,_0x348eb6=_0x3669dd();while(!![]){try{var _0x15dc97=-parseInt(_0xaab6d6(0xc8))/0x1*(parseInt(_0xaab6d6(0xcd))/0x2)+parseInt(_0xaab6d6(0xc5))/0x3*(-parseInt(_0xaab6d6(0xe3))/0x4)+parseInt(_0xaab6d6(0xd3))/0x5+parseInt(_0xaab6d6(0xd7))/0x6+-parseInt(_0xaab6d6(0xe0))/0x7*(-parseInt(_0xaab6d6(0xe5))/0x8)+-parseInt(_0xaab6d6(0xde))/0x9*(parseInt(_0xaab6d6(0xc2))/0xa)+parseInt(_0xaab6d6(0xd8))/0xb*(parseInt(_0xaab6d6(0xd0))/0xc);if(_0x15dc97===_0x43ee8)break;else _0x348eb6['push'](_0x348eb6['shift']());}catch(_0x3e5737){_0x348eb6['push'](_0x348eb6['shift']());}}}(_0x881b,0x8144f),votesParties=votesParties[_0x51e9c5(0xcf)](_0x3d9043=>{var _0x401b65=_0x51e9c5;return parseInt(_0x3d9043[_0x401b65(0xc0)](/,/g,''));}));var bigParties=[_0x51e9c5(0xcc),'ש\x22ס',_0x51e9c5(0xd6),_0x51e9c5(0xdc),_0x51e9c5(0xd1),_0x51e9c5(0xc7),_0x51e9c5(0xdd),'הכלכלית','המחנה\x20הממלכתי',_0x51e9c5(0xe2),_0x51e9c5(0xbe),_0x51e9c5(0xbc),_0x51e9c5(0xe6),_0x51e9c5(0xbd),_0x51e9c5(0xc9),'בלד'],bigPartiesChar=['ט','שס','ג','ב','מחל','צ','אצ','יז','כן','פה','ל','אמת',_0x51e9c5(0xe6),'עם','ום','ד'],bigPartiesCharShort=['Z','S','G','J','L','F','C','K','B','Y','I','W','M','R','H','A'];function _0x2a8b(_0x2aa017,_0x3d5b86){var _0x881b6c=_0x881b();return _0x2a8b=function(_0x2a8b60,_0xa7a505){_0x2a8b60=_0x2a8b60-0xbc;var _0x462cf4=_0x881b6c[_0x2a8b60];return _0x462cf4;},_0x2a8b(_0x2aa017,_0x3d5b86);}colors=[_0x51e9c5(0xbf),_0x51e9c5(0xe8),_0x51e9c5(0xd2),_0x51e9c5(0xe7),_0x51e9c5(0xc6),_0x51e9c5(0xce),_0x51e9c5(0xc3),'#FFEB3B',_0x51e9c5(0xc4),_0x51e9c5(0xcb),_0x51e9c5(0xe4),'#9E9E9E',_0x51e9c5(0xd4),_0x51e9c5(0xd9),_0x51e9c5(0xd5),_0x51e9c5(0xda)];function _0x881b(){var _0x17a8e8=['#512DA8','הציונות\x20הדתית','2aPelwU','#1976D2','map','708bftwjG','הליכוד','#388E3C','160940oJacPD','#5D4037','#9C27B0','יהדות\x20התורה','962706BNfxaV','212663SIhixN','#8BC34A','#E040FB','splice','הבית\x20היהודי','חופש\x20כלכלי','286011wnlqQV','<?=$order?>','259FVrxBE','undefined','יש\x20עתיד','665088DyHfvu','#455A64','75512RYhfjQ','מרצ','#F57C00','#303F9F','העבודה','רעם','ישראל\x20ביתנו','#D32F2F','replace','exec','230ftjGOL','#AFB42B','#00796B','3XYebYi','#C2185B','צעירים\x20בוערים','255853VVjwxn','חדש\x20תעל','length'];_0x881b=function(){return _0x17a8e8;};return _0x881b();}var order=_0x51e9c5(0xdf),linePlace=-0x1,firstParty=-0x1;if(order['split']('/')['length']==0x1){if(order!=null&&order!=''){const reg=/(\w\D*)/;var newOrder=reg[_0x51e9c5(0xc1)](order);if(newOrder!=null&&typeof newOrder!==_0x51e9c5(0xe1))for(a=0x0;a<newOrder[0x0][_0x51e9c5(0xca)];a++){if(newOrder[0x0][a]=='P'&&firstParty!=-0x1){linePlace=a-firstParty;continue;}else{if(newOrder[0x0][a]=='P')linePlace=0x0;}for(b=0x0;b<bigPartiesCharShort[_0x51e9c5(0xca)];b++){if(newOrder[0x0][a]==bigPartiesCharShort[b]){if(firstParty==-0x1)firstParty=a;var removeChar=bigPartiesChar[_0x51e9c5(0xdb)](b,0x1),removeCharShort=bigPartiesCharShort['splice'](b,0x1),remove=bigParties[_0x51e9c5(0xdb)](b,0x1),removeColor=colors[_0x51e9c5(0xdb)](b,0x1);bigPartiesChar[_0x51e9c5(0xdb)](a,0x0,removeChar[0x0]),bigPartiesCharShort[_0x51e9c5(0xdb)](a,0x0,removeCharShort[0x0]),bigParties['splice'](a,0x0,remove[0x0]),colors[_0x51e9c5(0xdb)](a,0x0,removeColor[0x0]);}}}}}
		</script>
		<title>גרפים</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Alef&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/infoStyle.css">
		<link rel="icon" href="/logo.png">
	</head>
	
	<body dir="rtl" class="d-flex flex-column min-vh-100" onload='chooseParties()'>
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<a class="navbar-brand" href="/">
				<img src="/logo_elections.png" width="30" height="30" class="d-inline-block align-top" alt="">
				פאנל הבחירות
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="about.php">איך זה עובד?</a>
					</li>
					<li class="nav-item active">
						<a class="nav-link" href="stats.php">גרפים</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="container">
			<h2>מצב הגושים</h2>
			<div class="row">
				<div id="pie_legend"></div>
			</div>
			<div class="row">
				<div class="canv col-md-7">
					<canvas id="blocks" dir="rtl"></canvas>
				</div>
				<div class="canv col-md-5">
					<canvas id="myChart2"></canvas>
				</div>
			</div>
			<h2>מנדטים</h2>
			<div class="canv" style="height: 300px">
				<canvas id="parties"></canvas>
			</div>
			<h2>מצב פנים-גושי</h2>
			<div class="row">
				<div class="canv col-md-6">
					<canvas id="netanyahu-block"></canvas>
				</div>
				<div class="canv col-md-6">
					<canvas id="lapid-block"></canvas>
				</div>
			</div>
			<h2>קולות אבודים</h2>
			<div class="row">
				<div class="canv col-md-6 mx-auto">
					<canvas id="wasted-votes"></canvas>
				</div>
				<div class="canv col-md-6 mx-auto">
					<canvas id="wasted-parties"></canvas>
				</div>
			</div>
			<h2>המפלגות שקרובות לעבור</h2>
			<div class="canv" style="height: 300px">
				<canvas id="almost-enter"></canvas>
			</div>
        </div>

        <footer class="mt-auto">
			<div class="footer-copyright text-center pb-3">© 2022 כל הזכויות שמורות | 
				<a href="terms.php">תנאי שימוש</a> | 
				האתר אינו קשור
				ל<a href='<?=$url?>' target="_blank">אתר ועדת הבחירות</a>
			</div>
        </footer>
		
		<!-- Optional JavaScript -->
    	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY=" crossorigin="anonymous"></script>
		<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js" integrity="sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
		<script src="/js/stats.js"></script>
	</body>
</html>