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
		<title>תנאי שימוש</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Alef&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="css/infoStyle.css">
		<link rel="icon" href="/logo.png"><link rel="icon" href="/logo.png">
	</head>
	
	<body dir="rtl">
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
		</nav>
        <div class="container">
			<div class="row">
				<!-- צריך לסדר את סעיף 12 -->
				<div id="terms"><h2>תנאי שימוש ואבטחת פרטיות</h2>
	<p>1.      מפתח האתר מברך אותך על שבחרת להשתמש באתר "פאנל הבחירות", אשר נועד להציג מידע אודות הבחירות במחשב ובטלפון חכם.</p>
	<p>2.      בעצם השימוש באתר הינך מצהיר כי קראת והבנת את תנאי ההסכם וכי הינך מסכים לכל התנאים המפורטים בו. השימוש באתר כפוף לתנאי השימוש אותם אישרת. אם אינך מסכים לאי אילו מתנאי ההסכם, הנך מחויב, באופן מיידי, לצאת מהאתר במחשב ו/או במכשיר הנייד שברשותך ואינך רשאי לעשות כל שימוש באתר,  ובתוצרים שלו בכל אופן שהוא.</p>
	<p>3.      הנך רשאי להשתמש באתר לשימוש אישי, בלתי עביר, ובלתי ניתן להמחאה ו/או להענקת רישיונות משנה,  ואשר ניתן לביטול באופן מלא בכל עת, להשתמש באתר על גבי מחשב ו/או מכשיר נייד שבבעלותך או בשליטתך. אין בתנאי הרישיון בכדי להעביר אליך כל זכות באתר או בקשר אליה, אלא רק זכות מוגבלת להשתמש בה רק ואך ורק למטרה לשמה נועדה ובהתאם לתנאי ההסכם ולתנאי השימוש של המחשב ו/או המכשיר הנייד שעליו נעשה שימוש באתר.</p>
	<p>4.      מפתח האתר בדק את תקינותו. מפתח האתר לא ישא באחריות כלשהי למצב בו האתר לא יוכל להציג נתונים ו/או שהפלט של האתר יהיה משובש ו/או לנזקים שיגרמו למכשיר בו נעשה שימוש כתוצאה מכך.</p>
	<p>5.      המשתמש יודע כי האתר מבצע הצגה באמצעות שילוב טכני של מידע שנאסף מהאינטרנט. לפיכך, אחריותו של המשתמש בלבד לשקול אם להסתמך או לעשות שימוש בפלט שהתקבל מהאתר. המשתמש הבוחר להשתמש באתר ו/או להסתמך על המידע שנוצר ממנה נוטל על עצמו  בלבד את כל האחריות לכל הפסד ו/או הוצאה ו/ואו נזק ו/או אובדן שיגרם לו או לצד שלישי.</p>
	<p>6.     חלקים מהקוד ששימש לבניית האתר נוצרו ע"י גורמי צד שלישי. מפתח האתר השתמש במקורות קוד  תקינים ומהימנים כמיטב יכולתו. עם זאת, גורמים אלו אינם בשליטתו של המפתח. לפיכך אין ביכולתו ו/או בשליטתו של המפתח למנוע את חדירתן ופעולתן של תוכנות מזיקות וגורמים עוינים כגון וירוסים, סוסים טרויאניים, באגים, רוגלות, נוזקות שעשויים לפגוע בפרטיותך, לפרוץ או לצותת למכשירך. המשתמש באתר מודע ומסכים לכך.</p>
	<p>7.      המפתח אוסר להשתמש באתר ואין לראות אותו כשותף או כאחראי לכל פעולה בלתי חוקית, בלתי מוסרית, בלתי מורשית עבירה ו/או הפרת דין שתגרם בידי המשתמש באתר ו/או באמצעותו.</p>
	<p>8.    האתר, זכויות היוצרים, הסמל המסחרי שלה וכל זכויות הקניין הרוחני הנוגעות לו הם בבעלות המפתח ו/או נמסרו לו ברישיון ומוגנים על ידי דיני הקניין הרוחני. אינך רשאי להעתיק, להפיץ, לשנות, או לבצע הנדסה-לאחור של האתר בכל דרך שהיא.</p>
	<p>9.  המפתח עשה מירב המאמצים שהאתר אותו בנה יהיה יציב ויתאפשר שימוש רציף, ללא שיבושים וזמין. עם זאת פעולת האתר תלויה בשירותים שונים במכשיר, ברשתות, בחומרה, בתוכנה ובמערכת ההפעלה המותקנת במכשיר שלך ותלויה בשירותים של צדדים שלישיים שאינם בשליטת המפתח. למפתח האתר לא תהיה כל אחריות לכל שיבוש או תקלה או נזק או לאי-פעולה של האתר.</p>
	<p>10.  המפתח רשאי לבצע באתר שינויים, תוספות והסרה של תכונות, שינויים ויזואלים וכן לשנות את תנאי השימוש באתר. המשך שימוש באתר ו/או בתוצריה יעיד על הסכמת המשתמש לקבל את תנאי ההסכם המעודכנים.</p>
	<p>11.  למפתח האתר שמורה הזכות לשלב באתר תוכן פרסומי ושיווקי. למפתח האתר אין כל אחריות לתוכן זה ואינו לראות בו כממליץ או מעודד לצרוך או לרכוש את התוכן המוצג.</p>
	<p>12.  מדיניות הפרטיות של האתר אינה חלה על מפרסמים או אתרים אחרים. לפיכך אנו ממליצים לך לקרוא את מדיניות הפרטיות המתאימה של שרתי מודעות אלה של צדדים שלישיים לקבלת מידע מפורט יותר. זה עשוי לכלול שיטות שלהם והוראות כיצד לבטל את הסכמתם לאופציות מסוימות. תוכל למצוא רשימה מלאה של מדיניות הפרטיות והקישורים שלהם <a href="https://common.aliexpress.com/aeregion/aliexpress.com/buyer_backend/@langField/adcms/affiliate/vip/io/agreement.htm?spm=a2g22.b78943455.0.0.23ca2f395co1Ep" target="_blank">כאן</a>.</p>
	<p>13.  מפתח האתר רואה חשיבות עליונה בשמירה על פרטיות המשתמש. עם זאת, למפתח האתר אין שליטה על איסוף מידע ו/או זיהוי המשתמש שנובע משימוש בתקשורת אלקטרונית ושעשוי להאסף על-ידי הפרסומות המשולבות באתר ו/או חברת התקשורת ו/או אפליקציות אחרות הפועלות על המכשיר ו/או מערכת ההפעלה או החומרה של המכשיר. מפתח האתר לא ישא בכל אחריות להפרת פרטיות המשתמש על-ידם.</p>
	<p>14.  תנאי השימוש נוסחים בלשון זכר מטעמי נוחות בלבד והם מתייחסים לגברים ולנשים כאחד.</p>
				</div>
			</div>
		</div>

		<footer class="mt-auto" >
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