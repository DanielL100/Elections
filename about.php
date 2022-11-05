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
				flock($file, LOCK_UN);
			} else {
				flock($file, LOCK_UN);
				header("Refresh:0");
			}
		} else {
			header("Refresh:0");
		}
		fclose($file);
		
		?>
		<title>איך זה עובד?</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Alef&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/infoStyle.css">
		<link rel="icon" href="/logo.png">
	</head>
	
	<body dir="rtl" class="d-flex flex-column min-vh-100">
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
					<li class="nav-item active">
						<a class="nav-link" href="about.php">איך זה עובד?</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="stats.php">גרפים</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="container">
			<div class="row">
                    <h1 class="display-5 text-center">שלום ותודה שבחרת להשתמש באתר שלנו!</h1>
                    <p class="lead">אתר זה מאפשר לך לצפות במספר המנדטים שכל מפלגה מקבלת על פי המידע מאתר ועדת הבחירות <b>בזמן אמת</b>.
                        <br />
                        לצורך קביעת מספר המנדטים מבוצע חישוב חלוקה של המנדטים העודפים על פי חוק בדר-עופר ותוך התחשבות בהסכמי החלוקה שנקבעו בין המפלגות.</p>
                        <hr/>
                    <hr class="w-100"/>
                    <p class="lead">לאתר שני חלקים:</p>
                    
                    <p class="lead">
                        <span class="text-primary">1.</span>
                        בראש הדף מוצגת המפה הפוליטית נכון לזמן המצויין מתחתיה. המפה מכילה מצביע אדום אשר מראה את מספר המנדטים של המפלגות מצידיו.
                        <br/>
                        <b>בגרסה למחשב</b> - ניתנת אפשרות לגרור מפלגות ולסדר את המפה הפוליטית כרצונך. כמו כן, ניתנת האפשרות להזיז את המצביע האדום ולראות את מצב המנדטים של המפלגות מצידיו.
                        <br/>
                        <b>בגרסה לטלפון הנייד</b> - ניתנת האפשרות ללחוץ על מפלגה במפה הפוליטית, דבר אשר יוביל את הדף למיקומה של המפלגה שנלחצה בטבלת המנדטים.</p>
                    <p class="lead">
                        <span class="text-primary">2.</span>
                        בחלקו השני של האתר מופיעה טבלת המידע הכללי וטבלת המנדטים.
                        <br/>
                        - טבלת המידע הכללי מכילה מידע אודות הבחירות שאינו שייך לאף מפלגה, כדוגמת "מנדטים עודפים". בחלק מהתאים מופיע הסימן
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle text-primary" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>, אשר עמידה עליו עם העכבר, או לחיצה עליו בטלפון הנייד, מציגים הסבר קצר על משמעות המידע אשר מופיע בתא.
                        <br />
                        - טבלת המנדטים מכילה את כל המפלגות אשר משתתפות בבחירות ומציגה בזמן אמת את מספר הקולות שקיבלה ואת מספר המנדטים אחרי חלוקת המנדטים העודפים (במחשב מופיעות עמודות נוספות, למשל מספר המנדטים לפני חלוקת המנדטים העודפים). כמו כן, בעמדות "מנדטים - סופי" מצויין אם מפלגה קיבלה מנדט נוסף, האם הוא התקבל בזכות הסכם עודפים שעשתה או בזכות חוק בדר-עופר.</p>
            </div>
			<br>
			<div class='row'>
				<p class="lead">
					שאלות? באגים? פידבקים?
					<br>
					ניתן לפנות אלי דרך: admin@elect25.com
				</p>
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
	</body>
</html>