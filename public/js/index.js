const totalpatients = document.getElementById('totalp');
const activepatients = document.getElementById('activep');
const dischargedpatients = document.getElementById('discharged');
const fatal = document.getElementById('fatal');
const lastUpdated = document.getElementById('lastUpdated');
const tested = document.getElementById('tested');
// daily increased/decreased data
const increasedTotalpatients = document.getElementById('increasedTotalPatients');
const increasedActivepatients = document.getElementById('increasedActivePatients');
const increasedDischargedpatients = document.getElementById('increasedDischargedPatients');
const increasedFatal = document.getElementById('increasedFatalPatients');
// if no data
const hide = document.getElementById('hide');
const error = document.querySelector('.error');
const errorMessage = 'Sorry! Something went terribly wrong. Please try again later';

fetch('https://api.covid19india.org/data.json')
	.then((response) => {
		response.json().then((data) => {
			// console.log(data);
			totalpatients.innerHTML = data.statewise[0].confirmed;
			dischargedpatients.innerHTML = data.statewise[0].recovered;
			fatal.innerHTML = data.statewise[0].deaths;
			activepatients.innerHTML = data.statewise[0].active;
			increasedTotalpatients.innerHTML = '(' + data.statewise[0].deltaconfirmed + ')';
			increasedDischargedpatients.innerHTML = '(' + data.statewise[0].deltarecovered + ')';
			increasedFatal.innerHTML = '(' + data.statewise[0].deltadeaths + ')';

			function divideTimeDate(datetime) {
				// var datetime = data.statewise[0].lastupdatedtime;

				var index = datetime.indexOf(' '); // Gets the first index where a space occours
				return (datetimeData = {
					date: datetime.substr(0, index), // Gets the first part
					time: datetime.substr(index + 1) // Gets the text part
				});
			}
			divideTimeDate(data.statewise[0].lastupdatedtime);
			// console.log(datetimeData);
			// get today date
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			today = dd + '/' + mm + '/' + yyyy;
			if (datetimeData.date === today) {
				date = 'today';
			}

			function tConvert(time) {
				// Check correct time format and split into components
				time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

				if (time.length > 1) {
					// If time format correct
					time = time.slice(1); // Remove full string match value
					time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
					time[0] = +time[0] % 12 || 12; // Adjust hours
				}
				return time.join(''); // return adjusted time or original string
			}

			lastUpdated.innerHTML = 'Last updated on <span style="color: rgb(12, 194, 12)">' + tConvert(datetimeData.time) + ' ' + datetimeData.date + '</span>';
			// get tested data
			function getTestedData(testedCount) {
				while (testedCount >= 1) {
					testedData = data.tested[testedCount];
					if (testedData.totalsamplestested === "") {
						testedCount -= 1;
					} else {
						return testedData;
					}
				}
			}
			testedCount = data.tested.length - 1;
			getTestedData(testedCount);
			console.log(testedData);
			divideTimeDate(testedData.updatetimestamp);
			tested.innerHTML =
				'We have tested <span style="color: rgb(12, 194, 12)">' + testedData.totalsamplestested + '</span> individuals till <span style="color: rgb(12, 194, 12)">' + datetimeData.date + '</span>';
		});
	})
	.catch((error) => {
		console.log(error);
	});