

const fetchHyperLiquidData = async () => {
    try {
        let response = await fetch(`https://autovault-g9v7.onrender.com/hl-get-data`, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (response.status !== 200) {
            console.log("Cannot get hyperliquid data!", error)
            throw "Cannot get hyperliquid data"
        }
        const result = await response.json();
        document.getElementById('hl-message').textContent = ''
        document.querySelector('#hl-loader').hidden = true;
        const tbody = document.querySelector('#hyperliquid');
        tbody.innerHTML = '';
        for(const field in result){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = field
            tr.appendChild(td1);
            const td2 = document.createElement('td');
            td2.textContent = Number(result[field]).toFixed(5)
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }

    } catch (error) {
        document.querySelector('#hl-loader').hidden = true;
        document.getElementById('hl-message').textContent = 'Cannot get data'
        console.log("Cannot get hyperliquid data",error)
    }
  };

  const fetchAaveLiquidData = async () => {
    try {
        let response = await fetch(`https://autovault-g9v7.onrender.com/aave-get-data`, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (response.status !== 200) {
            console.log("Cannot get aave data!",error)
            throw "Cannot get aave data"
        }
        const result = await response.json();
        document.getElementById('aave-message').textContent = ''
        document.querySelector('#aave-loader').hidden = true;
        const tbody = document.querySelector('#aave');
        tbody.innerHTML = '';
    
        for(const field in result){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = field
            tr.appendChild(td1);
            const td2 = document.createElement('td');
            td2.textContent = Number(result[field]).toFixed(5)
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    } catch (error) {
       document.querySelector('#aave-loader').hidden = true;
        document.getElementById('aave-message').textContent = 'Cannot get data'
        console.log("Cannot get aave data",error)
    }
  };

  window.addEventListener('load', () => {
    document.querySelector('#hl-loader').hidden = false;
    document.querySelector('#aave-loader').hidden = false;
    fetchHyperLiquidData();
    fetchAaveLiquidData();
    setInterval(fetchHyperLiquidData, 5000);
    setInterval(fetchAaveLiquidData, 5000);
});
  