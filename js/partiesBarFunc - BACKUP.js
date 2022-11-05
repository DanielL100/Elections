agreements = [['פה', 'אמת', 'שס', 'מחל', 'נק'],
			['כן', 'מרצ', 'ג', 'ט', 'ף']];

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

var validValues = [];
//colors = ["#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#ff6348", "#ffa502", "#01a3a4", "#ff7675", "#fd79a8", "#636e72", "#badc58", "#5f27cd", "#7ed6df"];

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
	
	if(party1Moded > party2Moded){
		for(i = 0, cont = true; i < parties.length && cont; i++)
			if(partiesChar[i] == connectedPartiesChar[0][q]){
				afterAllMandatsParties[i] += 1;
				cont = false;
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
					tmp += "<div class='progress-bar parties-mandats-inside' role='progressbar' style='width: 100%; background-color: " + colors[i] + ";' aria-valuenow='" + (afterAllMandatsParties[k] / 120 * 100) + "' aria-valuemin='0' aria-valuemax='100'>";
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

	if(afterAllMandatsParties.length > 0){
		if(lastUpdate.includes("דמה")){
			document.getElementById("updateTime").innerText = "תוצאות דמה";
		} else if(lastUpdate.includes("סופיות")){
			document.getElementById("updateTime").innerText = "תוצאות סופיות";
		} else if(lastUpdate.includes("טרם")){
			document.getElementById("updateTime").innerText = "טרם נספרו קולות";
		} else {
			document.getElementById("updateTime").innerText = "עודכן לאחרונה בתאריך " + lastUpdate.substr(lastUpdate.length - 16, 10) + " בשעה " + lastUpdate.substr(lastUpdate.length - 5, 5);
		}
	} else {
		document.getElementById("updateTime").style.display = "none";
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

var inputElement = document.getElementById('rangeslider');

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