const totalpatients = document.getElementById('totalp');
const activepatients = document.getElementById('activep');
const dischargedpatients = document.getElementById('discharged');
const fatal = document.getElementById('fatal');
// if no data
const hide = document.getElementById('hide');
const error = document.querySelector('.error');
const errorMessage = "Sorry! Something went terribly wrong. Please try again later";

fetch('https://api.rootnet.in/covid19-in/stats/latest').then((response) => {
    response.json().then((data) => {
        // console.log(data.data.regional);
        totalpatients.innerHTML = data.data.summary.total;
        dischargedpatients.innerHTML = data.data.summary.discharged;
        fatal.innerHTML = data.data.summary.deaths;
        activepatients.innerHTML = data.data.summary.total - (data.data.summary.discharged + data.data.summary.deaths);

    })
}).catch((error) => {

})