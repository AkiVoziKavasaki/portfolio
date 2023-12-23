let trenutniFilteri = [];

function compareAscending(igrica1, igrica2){
    return igrica1.ReviewScore - igrica2.ReviewScore;
}

function compareDescending(igrica1, igrica2){
    return igrica2.ReviewScore - igrica1.ReviewScore;
}

function napraviRedoveTabele(igrica){
    const row = document.createElement('tr');

    const ime = document.createElement('td');
    ime.textContent = igrica.Ime;
    row.appendChild(ime);

    const listaZanrova = document.createElement('td');
    listaZanrova.textContent = igrica.ListaZanrova.join(", ");
    row.appendChild(listaZanrova);

    const reviewScore = document.createElement('td');
    reviewScore.textContent = igrica.ReviewScore;
    row.appendChild(reviewScore);

    const url = document.createElement('td');
    const img = document.createElement('img');
    img.src = igrica.CoverURL;
    url.appendChild(img);
    row.appendChild(url);

    return row;
}

function filtriraj(data){
    const dataClone = [];

    for (let i = 0; i < data.length; i++) {
        let igrica = data[i];
        let flag = true;

        for (let trenutniFilter of trenutniFilteri) {
            if (!igrica.ListaZanrova.includes(trenutniFilter)) {
                flag = false;
                break;
            }
        }
        if (flag) {
            dataClone.push(igrica);
        }
    }
    return dataClone;
}

function napraviHeadereTabele(){
    const tableHeaders = ['Ime igre', 'Lista zanrova', 'Skor Recenzija', 'Ikonica'];
    const headerRow = document.createElement('tr');
    tableHeaders.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    return headerRow;
}

// Load JSON file
function initializeData(){
    // Get reference to table container
    const tableContainer = document.getElementById('table-container');

    // Create table headers
    let headerRow = napraviHeadereTabele();
    tableContainer.appendChild(headerRow);

    let myListaZanrova = [];
    myListaZanrova.length = 0;
    
    // Create table rows
    data.forEach(igrica => {
        // Dodavanje novog zanra u niz
        igrica.ListaZanrova.forEach(zanr => {
            if(!myListaZanrova.includes(zanr)){
                myListaZanrova.push(zanr);
            }
        });

        let row = napraviRedoveTabele(igrica);
        tableContainer.appendChild(row);
    });

    myListaZanrova.sort()

    let filterEl = document.getElementById("filter");

    for (var i = 0; i < myListaZanrova.length; i++){
        var checkbox = document.createElement('input');
        checkbox.id = myListaZanrova[i];
        checkbox.type = "checkbox";
        checkbox.class = "cbs"
        checkbox.value = myListaZanrova[i];
        checkbox.name = "check";
        filterEl.appendChild(checkbox);

        document.getElementById(myListaZanrova[i]).addEventListener('click', function(event) {
            var target = event.target
            if(target.checked == true){
                trenutniFilteri.push(target.value);
            }
            else{
                let index = trenutniFilteri.indexOf(target.value);
                if (index > -1) { 
                    trenutniFilteri.splice(index, 1); 
                    }
            }

            let dataClone = filtriraj(data);

            const tableContainer = document.getElementById('table-container');            
            tableContainer.innerHTML = "";

            let headerRow = napraviHeadereTabele();
            tableContainer.appendChild(headerRow);

            dataClone.forEach(igrica => {    
                let row = napraviRedoveTabele(igrica);
                tableContainer.appendChild(row);
            });

        });


        var label = document.createElement('label');
        label.for = myListaZanrova[i];
        label.innerHTML = myListaZanrova[i];
        filterEl.appendChild(label);

        filterEl.appendChild(document.createElement('br'));
    }

    document.getElementById("sort-asc").addEventListener('click', function(event) {
        data.sort(compareAscending);

        const tableContainer = document.getElementById('table-container');            
        tableContainer.innerHTML = "";

        let headerRow = napraviHeadereTabele();
        tableContainer.appendChild(headerRow);

        let dataClone = filtriraj(data);

        dataClone.forEach(igrica => {    
            let row = napraviRedoveTabele(igrica);
            tableContainer.appendChild(row);
        });
    });

    document.getElementById("sort-desc").addEventListener('click', function(event) {
        data.sort(compareDescending);

        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = "";
        
        let headerRow = napraviHeadereTabele();
        tableContainer.appendChild(headerRow);

        let dataClone = filtriraj(data);

        dataClone.forEach(igrica => {    
            let row = napraviRedoveTabele(igrica);
            tableContainer.appendChild(row);
        });
    });

    document.getElementById("filter-reset").addEventListener('click', function(event) {
        let myInputs = document.getElementsByName("check");
        
        for (let i = 0; i < myInputs.length; i++) {
            myInputs[i].checked = false;
        }

        trenutniFilteri = [];

        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = "";
        
        let headerRow = napraviHeadereTabele();
        tableContainer.appendChild(headerRow);

        data.forEach(igrica => {    
            let row = napraviRedoveTabele(igrica);
            tableContainer.appendChild(row);
        });
    });
}

initializeData();