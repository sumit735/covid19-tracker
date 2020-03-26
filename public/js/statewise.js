const tbody = document.getElementById('data');
const error = document.querySelector('.error');
const errorMessage = "Sorry! Something went terribly wrong. Please try again later";

fetch('https://api.rootnet.in/covid19-in/stats/latest').then((response) => {
    response.json().then((data) => {
        // console.log(data.data.regional);
        var count = data.data.regional.length;
        temp = "";
        for (var i = 0; i < count; i++) {
            var stateData = data.data.regional[i];

            // console.log(stateData);
            //Add the data rows.
            temp += "<tr>";
            temp += "<td>" + stateData.loc + "</td>";
            temp += "<td>" + (stateData.confirmedCasesIndian + stateData.confirmedCasesForeign) + "</td>";
            temp += "<td>" + stateData.discharged + "</td>";
            temp += "<td>" + stateData.deaths + "</td>";
            temp += "</tr>";


        }
        tbody.innerHTML = temp;
    })
}).catch((error) => {

})