const tbody = document.getElementById('data');

fetch('https://api.covid19india.org/data.json').then((response) => {
    response.json().then((data) => {
        console.log(data.statewise);
        var count = data.statewise.length;
        temp = "";
        for (var i = 1; i < count; i++) {
            var stateData = data.statewise[i];
            console.log(stateData.state);
            //Add the data rows.
            temp += "<tr>";
            temp += "<td>" + stateData.state + "</td>";
            temp += "<td>" + stateData.active + "</td>";
            temp += "<td>" + stateData.recovered + "</td>";
            temp += "<td>" + stateData.deaths + "</td>";
            temp += "</tr>";


        }
        tbody.innerHTML = temp;
    })
}).catch((error) => {

})