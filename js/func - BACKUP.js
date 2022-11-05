agreements = [['פה', 'אמת', 'שס', 'מחל', 'נק'],
			['כן', 'מרצ', 'ג', 'ט', 'ף']];

/* 21 */
/* agreements = [['מרצ', 'נ', 'ום', 'מחל', 'שס', 'ףז'],
			['אמת', 'ל', 'דעם', 'טב', 'ג', 'ףץ']]; */

/* 22 */
/* agreements = [['מחל', 'פה', 'אמת', 'שס'],
			['טב', 'ל', 'מרצ', 'ג']]; */

/* 23 */
/* agreements = [['מחל', 'פה', 'שס'],
			['טב', 'אמת', 'ג']]; */

/* DONT CHANGE */

var precentPartiesInd = 1;
var votesPartiesInd = 2;
var content = "";
var chart = "";
var precentReject;
var acceptedMandat = 0;
var mandatsParties = [];
var afterAllMandatsParties = [];
var leftMandats = 120;
var connectedParties = [[], []];
var connectedPartiesChar = [[], []];
var connectedvotesParties = [];
var connectedMandatsParties = [];
var Moded = [];
var connected = false;
var biggestModed, partyModed;
var trashVotes = 0;
var parties_to_share = "";
//colors = ["#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#ff6348", "#ffa502", "#01a3a4", "#ff7675", "#fd79a8", "#636e72", "#badc58", "#5f27cd", "#7ed6df"];
green_arrows = [[], []];
red_arrows = [];
netanyahu = 0;
netanyahu_parties = [];
lapid = 0;
lapid_parties = [];
joint_list = 0;

var validValues = [];

/* MOBILES */
//short_parties = ["הליכוד", "יש עתיד", 'ש"ס', "כחול לבן", "ימינה", "העבודה", "יהדות התורה", "ישראל ביתנו", "הציונות הדתית", "הרשימה המשותפת", "תקווה חדשה", "מרצ", 'רע"ם'];


function chooseParties(){
	//calc the limit in order to enter the Knesset
	precentReject = (parseFloat(acceptedVotes.replace(/,/g,'')) * 3.25) / 100;
	for(i = 0; i < votesParties.length; i++){
		//calc the num of Kosher votes of the parties that enter the Knesset
		if(votesParties[i] > precentReject)
			acceptedMandat += parseFloat(votesParties[i]);
	}
	dividingMandats();
}

function dividingMandats(){
	var generalIndex = acceptedMandat / 120;
	
	for (i = 0; i < votesParties.length; i++){
		if(votesParties[i] > precentReject){
			mandatsParties[i] = parseInt(votesParties[i] / generalIndex);
			afterAllMandatsParties[i] = parseInt(votesParties[i] / generalIndex);
			leftMandats -= parseInt(mandatsParties[i]);
		}
	}
	
	// second dividing
	for(k = 0; k < parseInt(leftMandats); k++){
		connectedParties = [[], []];
		connectedPartiesChar = [[], []];
		connectedvotesParties = [[], []];
		connectedMandatsParties = [[], []];
		biggestModed = 0;
		partyModed = -1;
		connected = false;
		for(i = 0; i < parties.length; i++){
			if(alreadyInConnected(parties[i]) == -1){
				if (!check_connected(partiesChar[i], i)){
					connectedParties[0].push(parties[i]);
					connectedPartiesChar[0].push(partiesChar[i]);
					connectedvotesParties[0].push(parseFloat(votesParties[i]));
					connectedMandatsParties[0].push(parseInt(afterAllMandatsParties[i]));
					connectedParties[1].push('');
					connectedPartiesChar[1].push('');
					connectedvotesParties[1].push(0);
					connectedMandatsParties[1].push(0);
				}
			}
		}
		
		for(q = 0; q < connectedParties[0].length; q++){
			Moded[q] = (connectedvotesParties[0][q] + connectedvotesParties[1][q]) / (connectedMandatsParties[0][q] + connectedMandatsParties[1][q] + 1);
			if(Moded[q] > biggestModed){
				biggestModed = Moded[q];
				partyModed = q;
				if(connectedPartiesChar[1][q] != '')
					connected = true;
				else
					connected = false;
			}
		}
		
		if(connected)
			thirdDivide(partyModed);
		else {
			//adds Mandat to the party
			for(s = 0, cont = true; s < partiesChar.length && cont; s++){
				if(partiesChar[s] == connectedPartiesChar[0][partyModed]){
					afterAllMandatsParties[s] += 1;
					cont = false;
					green_arrows[0].push(s);
					green_arrows[1].push('חוק בדר-עופר');
				}
			}
		}
			
	}
	
	sorting();
	
	showTable2();
}

/* Checks whther the party is already in the connected array */
function alreadyInConnected(party){
	for(e = 0; e < connectedParties[0].length; e++){
		if(connectedParties[0][e].includes(party) || connectedParties[1][e].includes(party))
			return e;
	}
	return -1;
}

/* Checks if the party connected with other party and if so - adds them together */
function check_connected(partyChar, i){
	for(a = 0; a < agreements[0].length; a++){
		if(agreements[0][a] == partyChar || agreements[1][a] == partyChar){
			if(agreements[0][a] == partyChar){
				var other = agreements[1][a];
			} else {
				var other = agreements[0][a];
			}
			for(j = 0; j < parties.length; j++){
				if(partiesChar[j] == other){
					connectedParties[0].push(parties[i]);
					connectedPartiesChar[0].push(partiesChar[i]);
					connectedvotesParties[0].push(parseFloat(votesParties[i]));
					connectedMandatsParties[0].push(parseInt(afterAllMandatsParties[i]));
					connectedParties[1].push(parties[j]);
					connectedPartiesChar[1].push(partiesChar[j]);
					connectedvotesParties[1].push(parseFloat(votesParties[j]));
					connectedMandatsParties[1].push(parseInt(afterAllMandatsParties[j]));
					return true;
				}
			}
		}
	}
	return false;
}

function thirdDivide(q){
	/* var insideModed = (connectedvotesParties[0][q] + connectedvotesParties[1][q]) / (connectedMandatsParties[0][q] + connectedMandatsParties[1][q] + 1);
	var party1, party2; */
	var party1Moded, party2Moded;
	for(i = 0, cont = true; i < parties.length && cont; i++){
		if(partiesChar[i] == connectedPartiesChar[0][q]){
			/* party1 = parseInt(votesParties[i] / insideModed);
			party1Moded2 = votesParties[i] / (party1 + 1); */
			party1Moded = votesParties[i] / (afterAllMandatsParties[i] + 1);
		}
		else if(partiesChar[i] == connectedPartiesChar[1][q]){
			/* party2 = parseInt(votesParties[i] / insideModed);
			party2Moded2 = votesParties[i] / (party2 + 1); */
			party2Moded = votesParties[i] / (afterAllMandatsParties[i] + 1);
		}
	}

	var foundInBigParties = false;
	
	if(party1Moded > party2Moded){
		for(i = 0, cont = true; i < parties.length && cont; i++)
			if(partiesChar[i] == connectedPartiesChar[0][q]){
				afterAllMandatsParties[i] += 1;
				cont = false;
				for(l = 0; l < bigParties.length; l++){
					if(connectedParties[1][alreadyInConnected(parties[i])].includes(bigParties[l]) ||
					(connectedParties[1][alreadyInConnected(parties[i])].includes("התאחדות הספרדים") && bigParties[l] == 'ש"ס') ||
					(connectedParties[1][alreadyInConnected(parties[i])].includes("הרשימה הערבית המאוחדת") && bigParties[l] == 'רע"ם') ||
					(connectedParties[1][alreadyInConnected(parties[i])].includes("חד\"ש תע\"") && bigParties[l] == 'חדש תעל') ||
					(connectedParties[1][alreadyInConnected(parties[i])].includes("בל\"ד") && bigParties[l] == 'בלד')){
						green_arrows[0].push(i);
						green_arrows[1].push(bigParties[l]);
						foundInBigParties = true;
					}
				}
				if(!foundInBigParties){
					green_arrows[0].push(i);
					green_arrows[1].push(connectedParties[1][q]);
				}
			}
		/* for(i = 0, cont = true; i < parties.length && cont; i++)
			if(partiesChar[i] == connectedPartiesInside[1].trim()){
				for(l = 0; l < short_parties.length; l++){
					if(connectedParties[alreadyInConnected(parties[i])].split('&')[0].includes(short_parties[l]) || (connectedParties[alreadyInConnected(parties[i])].split('&')[0].includes("התאחדות הספרדים") && short_parties[l] == 'ש"ס') || connectedParties[alreadyInConnected(parties[i])].split('&')[0].includes("הרשימה הערבית המאוחדת") && short_parties[l] == 'רע"ם'){
						red_arrows.push(i + '&' + short_parties[l]);
					}
				}
			} */
	} else {
		for(i = 0; i < parties.length; i++)
			if(partiesChar[i] == connectedPartiesChar[1][q]){
				afterAllMandatsParties[i] += 1;
				cont = false;
				for(l = 0; l < bigParties.length; l++){
					if(connectedParties[0][alreadyInConnected(parties[i])].includes(bigParties[l]) ||
					(connectedParties[0][alreadyInConnected(parties[i])].includes("התאחדות הספרדים") && bigParties[l] == 'ש"ס') ||
					(connectedParties[0][alreadyInConnected(parties[i])].includes("הרשימה הערבית המאוחדת") && bigParties[l] == 'רע"ם') ||
					(connectedParties[0][alreadyInConnected(parties[i])].includes("חד\"ש תע\"") && bigParties[l] == 'חדש תעל') ||
					(connectedParties[0][alreadyInConnected(parties[i])].includes("בל\"ד") && bigParties[l] == 'בלד')){
						green_arrows[0].push(i);
						green_arrows[1].push(bigParties[l]);
						foundInBigParties = true;
					}
				}
				if(!foundInBigParties){
					green_arrows[0].push(i);
					green_arrows[1].push(connectedParties[0][q]);
				}
			}
		/* for(i = 0; i < parties.length; i++)
			if(partiesChar[i] == connectedPartiesInside[0].trim()){
				for(l = 0; l < short_parties.length; l++){
					if(connectedParties[alreadyInConnected(parties[i])].split('&')[1].includes(short_parties[l]) || (connectedParties[alreadyInConnected(parties[i])].split('&')[1].includes("התאחדות הספרדים") && short_parties[l] == 'ש"ס') || connectedParties[alreadyInConnected(parties[i])].split('&')[1].includes("הרשימה הערבית המאוחדת") && short_parties[l] == 'רע"ם')
						red_arrows.push(i + '&' + short_parties[l]);
				}
			} */
	}
}

function sorting(){
    var temp;
    for(h = 0; h < afterAllMandatsParties.length; h++){
        for(t = h; t < afterAllMandatsParties.length; t++){
            if(t == h)
                continue;
            
            if(afterAllMandatsParties[t] > afterAllMandatsParties[h]){
                temp = afterAllMandatsParties.splice(h, 1, afterAllMandatsParties[t]);
                afterAllMandatsParties.splice(t, 1, temp[0]);
                temp = parties.splice(h, 1, parties[t]);
                parties.splice(t, 1, temp[0]);
                temp = partiesChar.splice(h, 1, partiesChar[t]);
                partiesChar.splice(t, 1, temp[0]);
                temp = precentParties.splice(h, 1, precentParties[t]);
                precentParties.splice(t, 1, temp[0]);
                temp = votesParties.splice(h, 1, votesParties[t]);
                votesParties.splice(t, 1, temp[0]);
                temp = mandatsParties.splice(h, 1, mandatsParties[t]);
                mandatsParties.splice(t, 1, temp[0]);
				for(x = 0; x < green_arrows[0].length; x++){
					if(green_arrows[0][x] == t){
						green_arrows[0][x] = h;
					}else if(green_arrows[0][x] == h){
						green_arrows[0][x] = t;
					}
				}
            }
        }
    }
}

function showTable2(){
	for(i = 0; i < votesParties.length; i++)
		if(!(votesParties[i] > precentReject))
			trashVotes += parseFloat(votesParties[i]);
	
	
	// graph
	var styleSheet = document.createElement("style");
	var tmp = '';
    var currTickMark = 0;
	if(afterAllMandatsParties.length > 0){
		for(i = 0; i < bigPartiesChar.length; i++){
			for(k = 0; k < afterAllMandatsParties.length; k++){
				if(bigPartiesChar[i] == partiesChar[k]){
					tmp += "<div id='mandat" + i + "' class='parties-mandats mandat" + i + "' style='width: " + (afterAllMandatsParties[k] / 120 * 100) + "%;'>";
					tmp += "<div class='progress-bar parties-mandats-inside' role='progressbar' style='width: 100%; background-color: " + colors[i] + ";' aria-valuenow='" + (afterAllMandatsParties[k] / 120 * 100) + "' aria-valuemin='0' aria-valuemax='100' onclick='window.location.href = \"#" + bigPartiesCharShort[i] + "\"'>";
					tmp += afterAllMandatsParties[k];
					tmp += "</div>";
					if(bigParties[i].split(' ').length > 1 && bigParties[i] != "יש עתיד"){
						tmp += "<div class='parties-names d-lg-none'>" + bigParties[i].split(' ')[0] + "\n       " + bigParties[i].split(' ')[1] + "</div>";
						tmp += "<div class='parties-names d-none d-lg-block'>" + bigParties[i] + "</div>";
					} else
						tmp += "<div class='parties-names'>" + bigParties[i] + "</div>";
					tmp += "</div>";
					document.getElementById("tickmarks").innerHTML += "<option value='" + currTickMark + "'></option>";
					validValues.push(currTickMark);
					currTickMark += afterAllMandatsParties[k];
				}

				if(i == 0){
					if(parties[k].includes("הליכוד") || parties[k].includes("הציונות הדתית") || parties[k].includes("יהדות התורה") || parties[k].includes("התאחדות הספרדים")){
						netanyahu_parties.push(parties[k]);
						netanyahu += parseInt(afterAllMandatsParties[k]);
					} else if (parties[k].includes("הרשימה המשותפת")){
						joint_list += parseInt(afterAllMandatsParties[k]);
					} else {
						lapid_parties.push(parties[k]);
						lapid += parseInt(afterAllMandatsParties[k]);
					}
				}
			}
		}
	} else {
		tmp += "<h4 class='mx-auto'>טרם נספרו קולות</h4>";
		document.getElementById("rangeslider").style.display = "none";
		document.getElementById("righty").style.display = "none";
		document.getElementById("lefty").style.display = "none";
	}
    document.getElementById("tickmarks").innerHTML += "<option value='120'></option>";
    validValues.push(120);
	document.getElementById("prog_bar").innerHTML = tmp;

	//sets range input thumb in the correct place
	if (newOrder != null)
		document.getElementById("rangeslider").value = newOrder[2];

	document.getElementById("electionsUrl").href = url;
	if(lastUpdate.includes("דמה")){
		document.getElementById("refToElecWeb").innerText = "תוצאות דמה";
        document.getElementById("updateTime").innerText = "תוצאות דמה";
	} else if(lastUpdate.includes("סופיות")){
		document.getElementById("lastUpdate").innerText = "נלקח";
        document.getElementById("updateTime").innerText = "תוצאות סופיות";
	} else if(lastUpdate.includes("טרם")){
		document.getElementById("refToElecWeb").innerText = "טרם נספרו קולות";
        document.getElementById("updateTime").innerText = "טרם נספרו קולות";
	}else{
		document.getElementById("lastUpdate").innerText = "עודכן לאחרונה בתאריך " + lastUpdate.substr(lastUpdate.length - 16, 10) + " בשעה " + lastUpdate.substr(lastUpdate.length - 5, 5);
        document.getElementById("updateTime").innerText = "עודכן לאחרונה בתאריך " + lastUpdate.substr(lastUpdate.length - 16, 10) + " בשעה " + lastUpdate.substr(lastUpdate.length - 5, 5);
	}

	// general info
	tmp = '';
	tmp += "<th>";
	tmp += "<table class='table table-borderless moblie_general_info'><tr><td class='d-lg-none'>קולות כשרים</td><td>";
	tmp += (acceptedVotes == '' ? "0" : acceptedVotes) + "</td></tr></table>";
	tmp += "</th>";
	tmp += "<th>";
	tmp += "<table class='table table-borderless moblie_general_info'><tr><td class='d-lg-none'>קולות למנדט</td><td>";
	tmp += (acceptedVotes == '' ? "0" : (precentReject / 3.25 * 100 / 120).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "</td></tr></table>";
	tmp += "</th>";
	tmp += "<th>";
	tmp += "<table class='table table-borderless moblie_general_info'><tr><td class='d-lg-none'>קולות מבוזבזים <a href='' onclick='return false;'  data-bs-toggle='tooltip' data-placement='bottom' title='סך הקולות של מפלגות שלא עברו את אחוז החסימה' data-toggle='tooltip'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-info-circle' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/><path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'/></svg></a></td><td>";
	tmp += trashVotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td></tr></table>";
	tmp += "</th>";
	tmp += "<th>";
	tmp += "<table class='table table-borderless moblie_general_info'><tr><td class='d-lg-none'>מנדטים עודפים <a href='' onclick='return false;' data-bs-toggle='tooltip' data-placement='bottom' title='מספר המנדטים שנותרו לחלק בין המפלגות שעברו את אחוז החסימה' data-toggle='tooltip'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-info-circle' viewBox='0 0 16 16'><path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/><path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'/></svg></a></td><td>";
	tmp += leftMandats + "</td></tr></table>";
	tmp += "</th>";
	tmp += "<th id='explain'>";
	tmp += "<table class='table table-borderless moblie_general_info'><tr><td class='d-lg-none' id='explain_name'>מקרא</td><td>";
	tmp += "<table id='explain_table' class='table table-borderless'><tr>";
	tmp += '<td><div class="col-md-3 text-center" style="display: inline-table"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill text-success" viewBox="0 0 16 16"><path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg>';
	//tmp += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill text-danger" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';
	tmp += '<div class="parties_excesses">מפלגה</div></div>';
	tmp += '<span class="color_explain d-none d-lg-block" id="madnats_explain_span"> - קבלת מנדט <a href="" id="mandats_explain_comp" class="d-none d-lg-inline-block" onclick="return false;" data-bs-toggle="tooltip" data-placement="bottom" title="האם המפלגה הרוויחה מנדט נוסף מהסכם עודפים עם המפלגה המצויינת למטה או מחוק בדר-עופר" data-toggle="tooltip"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a>\n - הסכם עודפים</span>';
	tmp += '</td><td class="d-lg-none" style="vertical-align: bottom;"><span class="color_explain">קבלת מנדט <a href="" class="d-lg-none" onclick="return false;" data-bs-toggle="tooltip" data-placement="bottom" title="האם המפלגה הרוויחה מנדט נוסף מהסכם עודפים עם המפלגה המצויינת למטה או מחוק בדר-עופר" data-toggle="tooltip"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a>\nהסכם עודפים</span></td>';
	tmp += '</td></tr></table>';
	tmp += "</tr></table>";
	tmp += "</th>";

	document.getElementById("general_info_data").innerHTML = tmp;
	
	
	// table
	var found = false;
	for(i = 0; i < parties.length; i++){
		for(k = 0; k < bigPartiesCharShort.length; k++)
			if(bigPartiesChar[k] == partiesChar[i])
				chart += "<tr id='" + bigPartiesCharShort[k] + "'>";
		chart += "<td class='d-none d-lg-table-cell'>";
		chart += parties[i];
		chart += "</td><td class='d-lg-none'>";
		for (j = 0; j <= bigParties.length; j++){
			if (parties[i].includes(bigParties[j])){
				chart += bigParties[j];
				found = true;
			} else if(parties[i].includes("התאחדות הספרדים") && bigParties[j] == 'ש"ס'){
				chart += bigParties[j];
				found = true;
			} else if(parties[i].includes("הרשימה הערבית המאוחדת") && bigParties[j] == 'רעם'){
				chart += bigParties[j];
				found = true;
			} else if(parties[i].includes("חד\"ש תע\"") && bigParties[j] == 'חדש תעל'){
				chart += bigParties[j];
				found = true;
			} else if(parties[i].includes("בל\"ד") && bigParties[j] == 'בלד'){
				chart += bigParties[j];
				found = true;
			}
		}
		if (!found)
			chart += parties[i];
		found = false;

		chart += "</td><td class='d-none d-lg-table-cell'>";
		chart += partiesChar[i];
		chart += "</td><td class='d-none d-lg-table-cell'>";
		chart += votesParties[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		chart += "</td><td class='d-none d-lg-table-cell'>";
		chart += precentParties[i];
		chart += "</td>";
		chart += "<td class='d-lg-none' style='white-space:pre-line'>";
		chart += votesParties[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\n(" + precentParties[i] + ")";
		chart += "</td>"
		chart += "<td style='text-align: center;' class='d-none d-lg-table-cell'>";
		if(i > mandatsParties.length - 1)
			chart += "0";
		else
			chart += parseInt(mandatsParties[i]);
		chart += "</td><td style='text-align: center;' class='table-secondary party'><table id='mandats_table' class='table table-borderless'><tr><td>";
		if(i > afterAllMandatsParties.length - 1)
			chart += "<span class='mandats'>0</span></td>";
		else {
			chart += "<span class='badge badge-secondary mandats' style='background-color: " + getColor(parties[i]) + ";'>";
			chart += parseInt(afterAllMandatsParties[i]);
			chart += "</span></td>";
		}
		chart += "<td>";
		for(k = 0; k < green_arrows[0].length; k++){
			if(parties[i] == parties[green_arrows[0][k]]){
				chart += '<div class="col-md-3 text-center arrows" style="display: inline-table"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill text-success" viewBox="0 0 16 16"><path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg><div class="parties_excesses">' + green_arrows[1][k] + '</div></div>';
			}
		}
		/* for(k = 0; k < red_arrows.length; k++){
			if(parties[i] == parties[red_arrows[k].split('&')[0]] && !(green_arrows.some((x) => x.includes(red_arrows[k].split('&')[1])))){
				chart += '<div class="col-md-3 text-center" style="display: inline-table"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill text-danger" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg><div class="parties_excesses">' + red_arrows[k].split('&')[1] + '</div></div>';
			}
		} */
		chart += '</td></tr></table></td></tr>';
	}
	
	document.getElementById("parties").innerHTML += chart;

	document.getElementById("electionsUrl2").href = url;

	tooltips();

	getTableHeader();


	if(afterAllMandatsParties.length > 0){
		$( function() {
			$( "#prog_bar" ).sortable({
			revert: true,
			cursor: "move",
			/* start: function(e, ui) {
				// creates a temporary attribute on the element with the old index
				$(this).attr('data-previndex', ui.item.index());
			},
			update: function(event, ui){
				var id = ui.item.attr("id");
				var party_name = document.getElementById(id + "party");
				add = 0;
				if (ui.item.index() > $(this).attr('data-previndex'))
					add = 1;
				party_name.parentNode.insertBefore(party_name, document.getElementsByClassName("parties-names")[ui.item.index() + add]);
			} */
			update: function(event, ui){
				var currTickMark = 0;
				validValues = [];
				document.getElementById("tickmarks").innerHTML = "";
				for(m = 0; m < document.getElementsByClassName("parties-mandats-inside").length; m++){
					document.getElementById("tickmarks").innerHTML += "<option value='" + currTickMark + "'></option>";
					validValues.push(currTickMark);
					currTickMark += parseInt(document.getElementsByClassName("parties-mandats-inside")[m].innerText);
				}
				validValues.push(120);
				document.getElementById("tickmarks").innerHTML += "<option value='120'></option>";
				setInput();
			}
			});
		});
	}

    setPointerFirstTime();

	setInput();
}

function getColor(party){
	for (k = 0; k < bigParties.length; k++){
		if (party.includes(bigParties[k]) || (bigParties[k] == 'ש"ס' && party.includes("התאחדות הספרדים")) || (bigParties[k] == 'רעם' && party.includes("הרשימה הערבית המאוחדת")) || (bigParties[k] == 'חדש תעל' && party.includes("חד\"ש תע\"ל")) || (bigParties[k] == 'בלד' && party.includes("בל\"ד")))
			return colors[k];
	}
	return "";
}

function tooltips(){
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});
}

function getTableHeader(){
	document.getElementsByTagName('html')[0].style.scrollPaddingTop = document.getElementsByTagName('thead')[2].offsetHeight + "px";
}


function share(){
	
	//alert(toBinary(parties_to_share));
	navigator.clipboard.writeText(document.getElementById("link_to_share").value);
	document.getElementById("btn_copy").innerText = "הועתק";
	document.getElementById("btn_copy").classList.remove("btn-primary");
	document.getElementById("btn_copy").classList.add("btn-success");

	setTimeout(() => {
		document.getElementsByClassName("flip-box-inner")[0].style.transform = "rotateX(0deg)";
		setTimeout(() => {
			document.getElementById("btn_copy").innerText = "העתקה";
			document.getElementById("btn_copy").classList.remove("btn-success");
			document.getElementById("btn_copy").classList.add("btn-primary");
		}, "1000")
	}, "1300")
	
}

/* function toBinary(string) {
	const codeUnits = new Uint16Array(string.length);
	for (let i = 0; i < codeUnits.length; i++) {
	  codeUnits[i] = string.charCodeAt(i);
	}
	return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
} */

function on(type) {
	//document.getElementById("overlay").style.display = "flex";
	document.getElementsByClassName("flip-box-inner")[0].style.transform = "rotateX(180deg)";
	parties_to_share = "";
    var sum = 0;

    if(document.getElementById("rangeslider").value == 0)
        parties_to_share += "P";

	for(q = 0; q < document.getElementById("prog_bar").children.length; q++){
		partyName = document.getElementById("prog_bar").children[q].children[1].innerHTML.replace("\n       ", " ");

		for(c = 0 ; c < bigParties.length; c++){
            for(o = 0; o < afterAllMandatsParties.length; o++){
                if(bigPartiesChar[c] == partiesChar[o] && bigParties[c] == partyName){
                    parties_to_share += bigPartiesCharShort[c];
                    sum += afterAllMandatsParties[o];
                    if(sum == document.getElementById("rangeslider").value)
                        parties_to_share += "P";
                }
            }
		}
	}

	if(type == "share"){
		document.getElementById("link_to_share").value = "https://elect25.com/" + parties_to_share;
	} else {
		document.getElementById("link_to_share").value = "<iframe src='https://elect25.com/embed/" + parties_to_share + "' title='elections_bar' style='height:max-content;width:100%;border:none;overflow:hidden;' scrolling='no'></iframe>";
	}
}
  
function off() {
	//document.getElementById("overlay").style.display = "none";
	document.getElementsByClassName("flip-box-inner")[0].style.transform = "rotateX(0deg)";
}

/* function explain(){
	document.getElementById("explanation").style.display = "inline-grid";
	document.getElementsByTagName("body")[0].classList.add("notscrollable");
}

function offExplanation(){
	document.getElementById("explanation").style.display = "none";
	document.getElementsByTagName("body")[0].classList.remove("notscrollable");
} */

var inputElement = document.getElementById('rangeslider');

inputElement.oninput = setInput;
inputElement.onchange = setInput;   // IE fix

function setInput(){
    inputElement.value = closestValue(inputElement.value);
    document.getElementById("lefty").style.right = ((document.getElementById("rangeslider").value) * document.getElementById("prog_bar").offsetWidth / 120 + 10) + "px";
	document.getElementById("lefty").innerHTML = parseInt(120 - document.getElementById("rangeslider").value);
	document.getElementById("righty").style.left = ((120 - document.getElementById("rangeslider").value) * document.getElementById("prog_bar").offsetWidth / 120 + 10) + "px";
	document.getElementById("righty").innerHTML = parseInt(document.getElementById("rangeslider").value);
}

function closestValue(input)
{
    var differences = [];
    for (var i = 0; i < validValues.length; i++)    
        differences.push( Math.abs(validValues[i] - input));

    var index = indexOfSmallest(differences);
    return validValues[index];      
}

function indexOfSmallest(inputArray) {
    var lowest = 0;
    for (var i = 1; i < inputArray.length; i++) {
        if (inputArray[i] < inputArray[lowest]) lowest = i;
    }
    return lowest;
}

function setPointerFirstTime(){
    if(linePlace == -1){
        var sum = 0;
        for(i = 0; i < bigPartiesChar.length; i++){
            for(k = 0; k < afterAllMandatsParties.length; k++){
                if(bigPartiesChar[i] == partiesChar[k]){
                    sum += afterAllMandatsParties[k];
					break;
				}

            }
			if(bigPartiesChar[i] == "יז"){
				inputElement.value = sum;
			}
        }
    } else {
        var sum = 0;
        for(i = 0; i < linePlace; i++){
            for(k = 0; k < afterAllMandatsParties.length; k++){
                if(bigPartiesChar[i] == partiesChar[k])
                    sum += afterAllMandatsParties[k];
            }
        }
        inputElement.value = sum;
    }
}