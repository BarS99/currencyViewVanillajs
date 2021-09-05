const generateTable = (currencyViewer) => {
    let htmlItems = (localStorage.getItem('htmlItems') === undefined || localStorage.getItem('htmlItems') === null) ? 0 : JSON.parse(localStorage.getItem('htmlItems'));
    console.log(htmlItems);
    if (htmlItems != 0) {
        htmlItems.forEach(item => {
            let row = document.createElement('tr');
            console.log(item.date);
            row.innerHTML += `<td>${item.date}</td>`;
            row.innerHTML += `<td>${item.key}</td>`;
            row.innerHTML += `<td>${item.rate}</td>`;
            currencyViewer.appendChild(row);
        });
    } else {
        console.log("No Items");
    }
}

window.addEventListener('DOMContentLoaded', () => {

    const currencySelect = document.getElementById('currencySelect');
    const currencyViewer = document.getElementById('currencyViewer');
    const currencyClearButton = document.getElementById('currencyClearButton');
    //localStorage.removeItem("htmlItems");

    generateTable(currencyViewer);

    currencySelect.addEventListener('change', (e) => {
        const currencyFetchResponse = fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=3719758393144ca351490d4c1baef720&symbols=${e.target.value}`)
            .then(resp => {
                if (resp.ok) {
                    console.log('Success!')
                } else {
                    throw new Error('Not success!');
                }

                return resp.json();
            })
            .then(data => {
                for (let key in data.rates) {
                    let date = new Date().toLocaleTimeString('pl-PL');
                    let row = document.createElement('tr');

                    row.innerHTML += `<td>${date}</td>`;
                    row.innerHTML += `<td>${key}</td>`;
                    row.innerHTML += `<td>${data.rates[key]}</td>`;

                    let htmlItems = (localStorage.getItem('htmlItems') === undefined || localStorage.getItem('htmlItems') === null) ? new Array() : JSON.parse(localStorage.getItem('htmlItems'));

                    htmlItems.push({
                        date: date,
                        key: key,
                        rate: data.rates[key]
                    });

                    currencyViewer.appendChild(row);
                    localStorage.setItem('htmlItems', JSON.stringify(htmlItems));
                }
            })
            .catch(error => console.log(error));
    });

    currencyClearButton.addEventListener('click', () => {
        localStorage.removeItem("htmlItems");
        let rows = currencyViewer.querySelectorAll('tr:not(:first-child)');

        rows.forEach((item) => {
            item.remove();
        })
    })

})