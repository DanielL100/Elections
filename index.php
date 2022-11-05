<!doctype html>
<html lang="en">
  	<head>
		<!-- Google tag (gtag.js) -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-RT5L5C94QQ"></script>
		<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-RT5L5C94QQ');
		</script>
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
		<title>פאנל בחירות</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Alef&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="css/style.css">
		<link rel="icon" href="/logo.png">
	</head>
	
	<body dir="rtl" onload='chooseParties()' onresize='getTableHeader();'>
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
					<li class="nav-item">
						<a class="nav-link" href="stats.php">גרפים</a>
					</li>
				</ul>
			</div>
			<span class="navbar-text d-none d-lg-block">
				<p id="updateTime" class="lead"></p>
			</span>
			<!--<button class="btn btn-outline-warning ml-2" type="explain" onclick="explain()">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-lg" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"/>
				</svg>
			</button>
	-->
		</nav>

		<a href="https://s.click.aliexpress.com/e/_Dls3Ok7?bz=160*600" target="_parent" class="aliexpress" style="float: right;"><img width="160" height="600" src="https://ae01.alicdn.com/kf/Sf11bfbdaa0c847cb85dd045484d61a67N.jpg" /></a>
		<a href="https://s.click.aliexpress.com/e/_DcyQuaB?bz=160*600" target="_parent" class="aliexpress" style="float: left; left: 0%;"><img width="160" height="600" src="https://ae01.alicdn.com/kf/Se2141269689d4dba8cf42dbc72a442f1c.jpg" /></a>
		<a href="https://s.click.aliexpress.com/e/_DmeYlX9?bz=725*90" target="_parent" class="aliexpress_mobile"><img width="725" height="90" src="https://ae01.alicdn.com/kf/S718c6a06247b4af2b2487a01e14ab5c7c.jpg" /></a>

		<div class="container">
			<!--<div id="explanation">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" id="closeExplanation" onclick="offExplanation()">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg>
				<span id="explanationText" class="h4">
					שלום ותודה שבחרת להשתמש באתר שלנו!
					<br /><br />
					אתר זה מאפשר לך לצפות במספר המנדטים שכל מפלגה מקבלת על פי המידע מאתר ועדת הבחירות <b>בזמן אמת</b>.
					<br />
					לצורך קביעת מספר המנדטים מבוצע חישוב חלוקה של המנדטים העודפים על פי חוק בדר-עופר ותוך התחשבות בהסכמי החלוקה שנקבעו בין המפלגות.
					<br /><br />
					באתר ישנם 2 חלקים:
					<br />
					הראשון, נמצא בראשו, והוא מציג את המפה הפוליטית נכון לזמן המצויין מתחתיה. המפה מכילה מצביע אדום אשר מראה את מספר המנדטים של המפלגות מצידיו.
					<br />
					בגרסה למחשב - ניתנת אפשרות לגרור מפלגות ולסדר את המפה הפוליטית כרצונך. כמו כן, ניתנת האפשרות להזיז את המצביע האדום ולראות את מצב המנדטים של המפלגות מצידיו.
					<br />
					בגרסה לטלפון הנייד - ניתנת האפשרות ללחוץ על מפלגה במפה הפוליטית, דבר אשר יוביל את הדף למיקומה של המפלגה שנלחצה בטבלת המנדטים.
					<br /><br />
					בחלקו השני של האתר מופיעה טבלת המידע הכללי וטבלת המנדטים.
					<br />
					- טבלת המידע הכללי מכילה מידע אודות הבחירות שאינו שייך לאף מפלגה, כדוגמת "מנדטים עודפים". בחלק מהתאים מופיע הסימן
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle text-primary" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
					</svg>, אשר עמידה עליו עם העכבר, או לחיצה עליו בטלפון הנייד, מציגים הסבר קצר על משמעות המידע אשר מופיע בתא.
					<br />
					- טבלת המנדטים מכילה את כל המפלגות אשר משתתפות בבחירות ומציגה בזמן אמת את מספר הקולות שקיבלה ואת מספר המנדטים אחרי חלוקת המנדטים העודפים (במחשב מופיעות עמודות נוספות, למשל מספר המנדטים לפני חלוקת המנדטים העודפים). כמו כן, בעמדות "מנדטים - סופי" מצויין באם מפלגה קיבלה מנדט נוסף, האם הוא התקבל בזכות הסכם עודפים שעשתה או בזכות חוק בדר-עופר.
				</span>
			</div>-->
			<h2>מפת המפלגות</h2>
			<div id="prev_overflow">
				<div id='prog_outer' class="flip-box">
					<div class="flip-box-inner">
						<div class="flip-box-front">
							<span id="lefty">60</span>
							<span id="righty">60</span>
							<div class='progress' id='prog_bar'></div>
							<input type="range" class="form-range" min=0 max=120 id="rangeslider" list="tickmarks" step="any">
							<datalist id="tickmarks">
								
							</datalist>
							<div class="row">
								<div id="infoUser" class='d-none d-lg-inline-block col'>הידעת? ניתן לגרור כל מפלגה למיקום כרצונך,<br>וכן להזיז את הסמן האדום ולראות מה מצב המנדטים של המפלגות מצדדיו</div>
								<div id="infoUser" class='d-lg-none'>הידעת? במחשב ניתן לסדר את המפה הפוליטית כרצונך</div>
								<div class="btn-toolbar col-auto" role="toolbar" aria-label="Toolbar with button groups" dir='ltr'>
									<div class="btn-group me-2" role="group" aria-label="First group">
										<button id="btn_share" type="button" class="btn btn-primary d-none d-lg-table-cell" onclick="on('share')">שיתוף <i class="bi-share"></i>
										</button>
										<button id="btn_embed" type="button" class="btn btn-primary d-none d-lg-table-cell" onclick="on('embed')">הטמעה <i class="bi-file-earmark-code"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div id="overlay" class="flip-box-back">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" id="close" onclick="off()">
								<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
							</svg>
							<div class="input-group" id="overlay_content" dir="ltr">
								<div class="input-group-prepend">
									<button id="btn_copy" class="btn btn-primary" type="button" onclick="share()">העתקה</button>
								</div>
								<input type="text" id="link_to_share" class="form-control" placeholder="" aria-label="" aria-describedby="" readonly>
							</div>
						</div>
					</div>
				</div>
			</div>
			<h2>רשימת המפלגות</h2>
			<div id="refToElecWeb" class="blockquote-footer">
				המידע
				<span id="lastUpdate"></span>
				מ<a id="electionsUrl" target="_blank">אתר ועדת הבחירות</a>
			</div>

			<div id='general_info_border'>
				<table id='general_info' class='table table-bordered table-responsive-stack'>
					<thead class='thead-light'>
						<tr class="d-none d-lg-table-row">
							<th>קולות כשרים</th>
							<th>קולות למנדט</th>
							<th>
								קולות מבוזבזים
								<a href='' onclick='return false;'  data-bs-toggle="tooltip" data-placement="bottom" title='סך הקולות של מפלגות שלא עברו את אחוז החסימה' data-toggle="tooltip">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
										<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
									</svg>
								</a>
							</th>
							<th>
								מנדטים עודפים
								<a href='' onclick='return false;' data-bs-toggle="tooltip" data-placement="bottom" title='מספר המנדטים שנותרו לחלק בין המפלגות שעברו את אחוז החסימה' data-toggle="tooltip">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
										<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
									</svg>
								</a>
							</th>
							<th>
								מקרא
							</th>
						</tr>
					</thead>
					<thead class='thead-light'>
						<tr id="general_info_data">
						</tr>
					</thead>
				</table>
			</div>

			<table id='parties' class='table table-bordered'>
				<thead class='thead-light' style='border: 1px solid black'>
					<tr>
						<th><div>מפלגה</div></th>
						<th class='d-none d-lg-table-cell'><div>אות</div></th>
						<th><div>מספר קולות</div></th>
						<th class='d-none d-lg-table-cell'><div>אחוז קולות</div></th>
						<th class='d-none d-lg-table-cell'><div>מנדטים</div></th>
						<th><div>מנדטים - סופי</div></th>
					</tr>
				</thead>
			</table>
		</div>

		<footer class="page-footer">
			<div class="footer-copyright text-center pb-3">© 2022 כל הזכויות שמורות | 
				<a href="terms.php">תנאי שימוש</a> | 
				האתר אינו קשור
				ל<a id="electionsUrl2" target="_blank">אתר ועדת הבחירות</a>
			</div>
		</footer>
		


		<!-- Optional JavaScript -->
    	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY=" crossorigin="anonymous"></script>
		<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
		<script src="/js/func.js"></script>
	</body>
</html>