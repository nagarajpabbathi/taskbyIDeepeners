
var something

const getTableHead = (data) => {
    let tableHead = []
    let typesOfAds = Object.keys(data);
    let categories = Object.keys(data[typesOfAds[0]])
    let heads = Object.keys(data[typesOfAds[0]][categories[0]])
    tableHead = tableHead.concat(heads)
    tableHead.push('metrics')
    tableHead.reverse()
    return tableHead;
}

const getTypeOfAds = (data) => {
    let typesOfAds = Object.keys(data);
    return typesOfAds
}
const getCategories = (data) => {
    let typesOfAds = Object.keys(data);
    let categories = Object.keys(data[typesOfAds[0]])
    return categories
}

const getRowData = (data, typeOfAd, category) => {
    let rowData = []
    let obj = data[typeOfAd][category]
    let keys = Object.keys(obj)
    keys.forEach(key => {
        rowData.push(obj[key])
    });
    rowData.push(category)
    return rowData
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let tableHead = getTableHead(data)
    for (let key of tableHead) {
        let th = document.createElement("th");
        th.className='table-head-items'
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  
function generateTable(table, data,typeOfAd) {
      data = data.reverse()
      let row = table.insertRow();
    for (let i = 0; i < data.length; i++) {
        let element =data[i]
        let cell = row.insertCell();
        var x='null'
        if (i<(data.length-1) && i>0) {
            if (data[i] > data[i +1]) {
                cell.className = 'green'
                x = document.createElement("SPAN");
                x.className='percent'
                let per = data[i] / data[i + 1]
                per=per.toFixed(1)
                x.textContent=" "+per+"%"
            } 
        }   
        if (i == 0) {
            cell.className = typeOfAd;
        }

        let text = document.createTextNode(element);
        cell.appendChild(text);
        if (x != 'null') {
            cell.appendChild(x);

        }
      }
    
  }
  
fetch('./data.json').then(response => response.json())
    .then(data => {

        let table = document.querySelector("table");
        something = data;
        generateTableHead(table, data);

        let typesOfAds = getTypeOfAds(data)
        typesOfAds.forEach(typesOfAd => {
            var categories = getCategories(data)
            categories.forEach(category => {
                let rowData = getRowData(data, typesOfAd, category)
                generateTable(table,rowData,typesOfAd)
            })
        });
})