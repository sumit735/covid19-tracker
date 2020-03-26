const totalpatients = document.getElementById('totalp');
const activepatients = document.getElementById('activep');
const dischargedpatients = document.getElementById('discharged');
const fatal = document.getElementById('fatal');
// daily increased/decreased data
const increasedTotalpatients = document.getElementById('increasedTotalPatients');
const increasedActivepatients = document.getElementById('increasedActivePatients');
const increasedDischargedpatients = document.getElementById('increasedDischargedPatients');
const increasedFatal = document.getElementById('increasedFatalPatients');
// if no data
const hide = document.getElementById('hide');
const error = document.querySelector('.error');
const errorMessage = "Sorry! Something went terribly wrong. Please try again later";

fetch('https://api.rootnet.in/covid19-in/stats/latest').then((response) => {
    response.json().then((data) => {
        // console.log(data.data);
        totalpatients.innerHTML = data.data.summary.total;
        dischargedpatients.innerHTML = data.data.summary.discharged;
        fatal.innerHTML = data.data.summary.deaths;
        activepatients.innerHTML = data.data.summary.total - (data.data.summary.discharged + data.data.summary.deaths);
        fetch('https://api.rootnet.in/covid19-in/stats/daily').then((response) => {
            response.json().then((dailyData) => {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
                var yesterday = yyyy + '-' + mm + '-' + (parseInt(dd) - 1);
                console.log(yesterday);
                console.log(today);
                console.log(dailyData.data);
                var count = dailyData.data.length;
                for (var i = 0; i < count; i++) {
                    var eachDailyData = dailyData.data[i];

                    // console.log(eachDailyData);
                    if (eachDailyData.day == yesterday) {
                        yesterdayData = eachDailyData;
                    }
                    if (eachDailyData.day == today) {
                        todayData = eachDailyData;
                    }

                }
                // get active patient
                var yesterdayActivePatient = yesterdayData.summary.total - (yesterdayData.summary.discharged + yesterdayData.summary.deaths);
                var todayActivePatient = todayData.summary.total - (todayData.summary.discharged + todayData.summary.deaths);

                // get all data
                var totalPatientIncreased = todayData.summary.total - yesterdayData.summary.total;
                var activePatientIncreased = todayActivePatient - yesterdayActivePatient;
                var dischargedPatientIncreased = todayData.summary.discharged - yesterdayData.summary.discharged;
                var fatalPatientIncreased = todayData.summary.deaths - yesterdayData.summary.deaths;

                // send all data to html
                const checkPosOrNeg = (number) => {
                    if (Math.sign(number) === 1) {
                        return '+' + number;
                        // console.log('+' + number);
                    }

                    if (Math.sign(number) === -1) {
                        return number;
                        // console.log(number);
                    }
                }

                increasedTotalpatients.innerHTML = "(" + checkPosOrNeg(totalPatientIncreased) + ")";
                increasedActivepatients.innerHTML = "(" + checkPosOrNeg(activePatientIncreased) + ")";
                increasedDischargedpatients.innerHTML = "(" + checkPosOrNeg(dischargedPatientIncreased) + ")";
                increasedFatal.innerHTML = "(" + checkPosOrNeg(fatalPatientIncreased) + ")";

            })
        })
    })
}).catch((error) => {

})