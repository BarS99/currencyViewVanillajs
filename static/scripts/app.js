window.addEventListener('DOMContentLoaded', () => {

    const currencySelect = document.getElementById('currencySelect');
    const currencyViewer = document.getElementById('currencyViewer');

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

                    currencyViewer.appendChild(row);
                }
            })
            .catch(error => console.log(error));
    })
})