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
netanyahu = [];
netanyahu_parties = [];
netanyahu_colors = [];
netanyahu_votes = 0;
lapid = [];
lapid_parties = [];
lapid_colors = [];
lapid_votes = 0;
arabs = [];
arabs_parties = [];
arabs_colors = [];
arabs_votes = 0;

var validValues = [];

var sortedBigParties = [];
var sortedColors = [];

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

    for(h = 0; h < afterAllMandatsParties.length; h++){
        for(t = 0; t < bigParties.length; t++){
            if(parties[h].includes(bigParties[t]) ||
            (parties[h].includes("התאחדות הספרדים") && bigParties[t].includes('ש"ס')) ||
            (parties[h].includes("הרשימה הערבית המאוחדת") && bigParties[t].includes('רעם')) ||
			(parties[h].includes("חד\"ש תע\"") && bigParties[t].includes('חדש תעל')) ||
			(parties[h].includes("בל\"ד") && bigParties[t].includes('בלד'))){
                sortedBigParties.push(bigParties[t]);
                sortedColors.push(colors[t]);
            }
        }
    }
}

function showTable2(){
	for(i = 0; i < votesParties.length; i++)
		if(!(votesParties[i] > precentReject))
			trashVotes += parseFloat(votesParties[i]);
	
	
	// graph

	for(k = 0; k < afterAllMandatsParties.length; k++){
		if(parties[k].includes("הליכוד") || parties[k].includes("הציונות הדתית") || parties[k].includes("יהדות התורה") || parties[k].includes("התאחדות הספרדים") || parties[k].includes("הבית היהודי") || parties[k].includes("צעירים בוערים") || parties[k].includes("חופש כלכלי") || parties[k].includes("הכלכלית")){
			netanyahu_parties.push(sortedBigParties[k]);
			netanyahu.push(parseInt(afterAllMandatsParties[k]));
			netanyahu_colors.push(sortedColors[k]);
            netanyahu_votes += parseInt(votesParties[k]);
		} else if (parties[k].includes("חד\"ש תע\"") || parties[k].includes("בל\"ד") || parties[k].includes("הרשימה הערבית המאוחדת")){
			arabs_parties.push(sortedBigParties[k]);
			arabs.push(parseInt(afterAllMandatsParties[k]));
			arabs_colors.push(sortedColors[k]);
            arabs_votes += parseInt(votesParties[k]);
		} else {
			lapid_parties.push(sortedBigParties[k]);
			lapid.push(parseInt(afterAllMandatsParties[k]));
			lapid_colors.push(sortedColors[k]);
            lapid_votes += parseInt(votesParties[k]);
		}
	}

	// Charts Part

	// Register the plugin to all charts:
	//Chart.register(ChartDataLabels);

    const ctxBlocks = document.getElementById('blocks');
	const dataBlocks = {
		labels: [
			'גוש לפיד',
			'ערבים',
			'גוש נתניהו'
		],
		datasets: [{
		  label: 'My First Dataset',
		  data: [lapid.reduce((a, b) => a + b, 0), arabs.reduce((a, b) => a + b, 0), netanyahu.reduce((a, b) => a + b, 0)],
		  backgroundColor: [
			'rgb(255, 99, 132)',
			'rgb(255, 205, 86)',
			'rgb(54, 162, 235)',
		  ],
		  hoverOffset: 4
		}]
	  };
	  const configBlocks = {
		type: 'doughnut',
		data: dataBlocks,
		options: {
			responsive: true,
			maintainAspectRatio: false,		
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					callbacks: {
                        title: function(context){
                            return context[0].label + " - " + context[0].raw + " מנדטים";
                        },
						label: function(context){
                            var tempArr = [];
                            if(context.label.includes("נתניהו")){
                                for (c = 0; c < netanyahu_parties.length; c++)
                                    tempArr.push(netanyahu_parties[c]);    
                            } else if(context.label.includes("לפיד")) {
                                for (c = 0; c < lapid_parties.length; c++)
                                    tempArr.push(lapid_parties[c]);
                            } else {
                                for (c = 0; c < arabs_parties.length; c++)
                                    tempArr.push(arabs_parties[c]);
                            }

                            return tempArr;
                        }
					},
				},
				datalabels: {
					display: true,
					align: 'center',
					textAlign: 'center',
					formatter: (value, context) => {
						return value;
					},
					font : {
						size: 22,
						family: "Alef, Arial, sans-serif",
					},
					color: '#000'
				},
				legend: {
					position: function() {
						/* if (window.innerWidth < 600) {
							return "bottom";
						} */
						return "right";
					},
					rtl: true,
					reverse: true,
					onClick: function (e) {
						
					},
					position: function() {
						if (window.innerWidth < 992) {
							return "bottom";
						} 
						return "left";
					},
					labels: {
						// This more specific font property overrides the global property
						font: {
							family: "Alef, Arial, sans-serif",
							size: 14
						}
					}
				},
			},
			rotation: 180,
		},
		plugins: [{
			beforeDraw: function(chart, a, b){
				var width = chart.width,
				height = chart.height,
				ctx = chart.ctx;

				ctx.restore();
				var fontSize = (height / 125).toFixed(2);
				ctx.font = fontSize + "rem Alef";
				ctx.textBaseline = "middle";

				var text = "מנדטים";
				if (window.innerWidth < 992)
					textX = Math.round((width - ctx.measureText(text).width) / 2);
				else
					textX = Math.round((width + ctx.measureText(text).width) / 2 + chart.legend.width / 2);
				if (window.innerWidth < 992)
					textY = height / 2 - chart.legend.height / 2;
				else
					textY = height / 2;
				

				ctx.fillText(text, textX, textY);
				ctx.save();

			},
		}, ChartDataLabels],
	  };
	  
	  var myChart = new Chart(ctxBlocks, configBlocks);
	  /* myChart.Line
	  document.getElementById("pie_legend").innerHTML = myChart.genereateLegend(); */

      const ctx2 = document.getElementById('myChart2');
      const data2 = {
		labels: [
			'גוש לפיד',
			'ערבים',
			'גוש נתניהו'
		],
		datasets: [{
		  label: 'My First Dataset',
		  data: [lapid_votes / parseFloat(acceptedVotes.replace(/,/g,'')) * 100, arabs_votes / parseFloat(acceptedVotes.replace(/,/g,'')) * 100, netanyahu_votes / parseFloat(acceptedVotes.replace(/,/g,'')) * 100],
		  backgroundColor: [
			'rgb(255, 99, 132)',
			'rgb(255, 205, 86)',
			'rgb(54, 162, 235)',
		  ],
		  hoverOffset: 4
		}]
	  };
	  const config2 = {
		type: 'doughnut',
		data: data2,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					displayLabel: false,
					callbacks: {
                        title: function(context){
                            return context[0].label + " - " + context[0].raw.toFixed(2) + "%";
                        },
						label: function(context){
                            var tempArr = [];
                            if(context.label.includes("נתניהו")){
                                for (c = 0; c < netanyahu_parties.length; c++)
                                    tempArr.push(netanyahu_parties[c]);    
                            } else if(context.label.includes("לפיד")) {
                                for (c = 0; c < lapid_parties.length; c++)
                                    tempArr.push(lapid_parties[c]);
                            } else {
                                for (c = 0; c < arabs_parties.length; c++)
                                    tempArr.push(arabs_parties[c]);
                            }

                            return tempArr;
                        }
					},
				},
				datalabels: {
					display: true,
					align: 'center',
					textAlign: 'center',
					formatter: (value, context) => {
						return value.toFixed(0) + "%";
					},
					font : {
						size: 22,
						family: "Alef, Arial, sans-serif",
					},
					color: '#000'
				},
				legend: {
					display: false,
					rtl: true,
					reverse: true,
					onClick: function (e) {
						
					},
				},			
			},
			rotation: 180,
		},
		plugins: [{
			beforeDraw: function(chart, a, b){
				var width = chart.width,
				height = chart.height,
				ctx = chart.ctx;

				ctx.restore();
				var fontSize = (height / 125).toFixed(2);
				ctx.font = fontSize + "rem Alef";
				ctx.textBaseline = "middle";

				var text = "קולות",
					textX = Math.round((width + ctx.measureText(text).width) / 2),
					textY = height / 2;

				ctx.fillText(text, textX, textY);
				ctx.save();

			}	
		}, ChartDataLabels]
	  };
	  const myChart2 = new Chart(ctx2, config2);

    const ctxParties = document.getElementById('parties');
	const dataParties = {
		labels: sortedBigParties,
		datasets: [{
		  data: afterAllMandatsParties,
		  backgroundColor: sortedColors,
		  hoverOffset: 4
		}]
	  };
	  const configParties = {
		type: 'bar',
        label: '',
		data: dataParties,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					displayLabel: false,
					callbacks: {
                        title: function(context){
                            return context[0].label;
                        },
						label: function(context){
                            return context.raw + " מנדטים";
                        }
					}
				},
				legend: {
					display: false,
				},			
			},
			scales: {
                y: {
                    max: afterAllMandatsParties[0] != null ? (afterAllMandatsParties[0] + 10) : 120,
					ticks: {
						stepSize: 5
					}
                }
            }
		}
	  };
	const partiesChar = new Chart(ctxParties, configParties);

	const ctxNetanyahu = document.getElementById('netanyahu-block');
	const dataNetanyahu = {
		labels: netanyahu_parties,
		datasets: [{
		  label: 'My First Dataset',
		  data: netanyahu,
		  backgroundColor: netanyahu_colors,
		  hoverOffset: 4
		}]
	  };
	  const configNetanyahu = {
		type: 'pie',
		data: dataNetanyahu,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					displayLabel: false,
					callbacks: {
                        title: function(context){
                            return context[0].label;
                        },
						label: function(context){
                            return context.raw + " מנדטים";
                        }
					}
				},
				legend: {
					position: function() {
						/* if (window.innerWidth < 600) {
							return "bottom";
						} */
						return "right";
					},
					rtl: true,
					onClick: function (e) {
						
					},
				},			
			},
		},
	  };
	const Netanyahu = new Chart(ctxNetanyahu, configNetanyahu);

	const ctxLapid = document.getElementById('lapid-block');
	const dataLapid = {
		labels: lapid_parties,
		datasets: [{
		  label: 'My First Dataset',
		  data: lapid,
		  backgroundColor: lapid_colors,
		  hoverOffset: 4
		}]
	  };
	  const configLapid = {
		type: 'pie',
		data: dataLapid,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					displayLabel: false,
					callbacks: {
                        title: function(context){
                            return context[0].label;
                        },
						label: function(context){
                            return context.raw + " מנדטים";
                        }
					}
				},
				legend: {
					position: function() {
						/* if (window.innerWidth < 600) {
							return "bottom";
						} */
						return "left";
					},
					rtl: true,
					onClick: function (e) {
						
					},
				},			
			},
		},
	  };
	const Lapid = new Chart(ctxLapid, configLapid);

    const ctxWasted = document.getElementById('wasted-votes');
	const dataWasted = {
		labels: ["קולות מבוזבזים", "שאר הקולות"],
		datasets: [{
		  label: 'My First Dataset',
		  data: [trashVotes / (precentReject / 3.25 * 100 / 120), 120 - trashVotes / (precentReject / 3.25 * 100 / 120)],
		  backgroundColor: [
			'rgb(255, 99, 132)',
			'rgb(54, 162, 235)',
		  ],
		  hoverOffset: 4
		}]
	  };
	  const configWasted = {
		type: 'pie',
		data: dataWasted,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					displayLabel: false,
					callbacks: {
                        title: function(context){
                            return context[0].label;
                        },
						label: function(context){
                            return context.raw.toFixed(2) + " מנדטים";
                        }
					}
				},
				legend: {
					position: function() {
						/* if (window.innerWidth < 600) {
							return "bottom";
						} */
						return "right";
					},
					rtl: true,
					onClick: function (e) {
						
					},
				},			
			},
		},
	  };
	const wasted = new Chart(ctxWasted, configWasted);

	const ctxWastedParties = document.getElementById('wasted-parties');
	const dataWastedParties = {
		labels: [parties[afterAllMandatsParties.length].slice(0, 20) + "...", parties[afterAllMandatsParties.length + 1].slice(0, 20) + "...", parties[afterAllMandatsParties.length + 2].slice(0, 20) + "...", "כל השאר"],
		datasets: [{
		  label: 'My First Dataset',
		  data: [votesParties[afterAllMandatsParties.length] / (precentReject / 3.25 * 100 / 120), votesParties[afterAllMandatsParties.length + 1] / (precentReject / 3.25 * 100 / 120), votesParties[afterAllMandatsParties.length + 2] / (precentReject / 3.25 * 100 / 120), votesParties.slice(afterAllMandatsParties.length + 3).reduce((a, b) => a + b, 0) / (precentReject / 3.25 * 100 / 120)],
		  backgroundColor: sortedColors,
		  hoverOffset: 4
		}]
	  };
	  const configWastedParties = {
		type: 'pie',
		data: dataWastedParties,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					displayLabel: false,
					callbacks: {
                        title: function(context){
                            return context[0].label;
                        },
						label: function(context){
                            return context.raw.toFixed(2) + " מנדטים";
                        }
					}
				},
				legend: {
					position: function() {
						/* if (window.innerWidth < 600) {
							return "bottom";
						} */
						return "left";
					},
					rtl: true,
					onClick: function (e) {
						
					},
				},
			},
		},
	  };
	const wastedParties = new Chart(ctxWastedParties, configWastedParties);

	const ctxAlmost = document.getElementById('almost-enter');
	const dataAlmost = {
		labels: parties.slice(afterAllMandatsParties.length, afterAllMandatsParties.length + 3),
		datasets: [{
		  data: votesParties.slice(afterAllMandatsParties.length, afterAllMandatsParties.length + 3).map(function(v){return v / (precentReject / 3.25 * 100 / 120)}),
		  backgroundColor: sortedColors,
		  hoverOffset: 4
		}]
	  };
	  const configAlmost = {
		type: 'bar',
        label: '',
		data: dataAlmost,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					rtl: true,
                    textDirection: 'rtl',
                    displayColors: true,
                    bodyAlign: "right",
                    titleAlign: "center",
                    displayColors: false,
					displayLabel: false,
					callbacks: {
                        title: function(context){
                            return context[0].label;
                        },
						label: function(context){
                            return context.raw.toFixed(2) + " מנדטים";
                        }
					}
				},
				legend: {
					display: false,
				},			
			},
			scales: {
                y: {
                    max: 4
                },
				x: {
					ticks: {
						callback: function(val, index){
							if(this.getLabelForValue(index).length > 13 && window.innerWidth < 992)
								return this.getLabelForValue(index).slice(0, 13) + "...";
							return this.getLabelForValue(index);
						}
					}
				}
            },
		},
	  };
	const almost = new Chart(ctxAlmost, configAlmost);
}

