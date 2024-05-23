function formatField(field) {
    return field
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const fetchData = async (source) => {
    try {
        let response = await fetch(`https://autovault-g9v7.onrender.com/${source}-get-data`, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (response.status !== 200) {
            console.log(`Cannot get ${source} data!`, error)
            throw `Cannot get ${source} data`
        }
        const result = await response.json();
        document.getElementById(`${source}-message`).textContent = ''
        document.getElementById(`${source}-loader`).hidden = true;
        const tbody = document.getElementById(`${source}`);
        tbody.innerHTML = '';
        for(const field in result){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = formatField(field);
            tr.appendChild(td1);
            const td2 = document.createElement('td');
            td2.textContent = Number(result[field]).toFixed(5);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }

    } catch (error) {
        document.getElementById(`${source}`).innerHTML = '';
        document.getElementById(`${source}-loader`).hidden = true;
        document.getElementById(`${source}-message`).textContent = 'Cannot get data'
        console.log(`Cannot get ${source} data`,error)
    }
  };

  window.addEventListener('load', () => {
    document.getElementById('hl-loader').hidden = false;
    document.getElementById('aave-loader').hidden = false;
    fetchData("hl");
    fetchData("aave");
    setInterval(() => fetchData("hl"), 5000);
    setInterval(() => fetchData("aave"), 5000);
});
  