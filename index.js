let even = document.createElement('div')
let currentPage = 1
let odd = document.createElement('div')
const FILEPATH = './catalogo1.csv'
let catalogueData = []
const cardsPerPage = 5;

function appendProductCard(productList, productData, dataColumns, reversed) {
    let productCardTemplate = reversed ?
        document.querySelector('#productReverse') : document.querySelector('#productTemplate');

    const productCard = productCardTemplate.content.cloneNode(true);
    const titleDiv = productCard.querySelector('.title');
    titleDiv.innerHTML = `<br> ${productData[0]}`;

    const detailsList = productCard.querySelector('.caracteristicas');
    const imagePath = productData[1];
    const imageDiv = productCard.querySelector('.image');
    if (productData[14] == 'SI') {
        const ribbon = document.createElement('div');
        ribbon.classList.add('ribbon', 'left');
        ribbon.textContent = 'nuevo';
        imageDiv.appendChild(ribbon);
    }
    const image = productCard.querySelector('img');
    image.src = imagePath
    let detailCount = 0;
    for (let i = 2; i < productData.length; i++) {
        if (detailCount === 8) break;
        if (productData[i] === '' || !productData[i] || productData[i] === ' ' || productData[i] === '-' || i == 14 || i == 16) continue;
        const detail = document.createElement('li');
        detail.innerHTML = productData[i];
        if (i == 3 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9 || i == 10 || i == 11 || i == 12 || i == 15) detail.innerHTML = `${dataColumns[i]}: ${productData[i]}`;
        detailsList.appendChild(detail);
        detailCount++;
    }
    productList.appendChild(productCard);
};

async function readCatalogue() {
    const resp = await fetch(FILEPATH)
    const text = await resp.text()
    const rows = await Papa.parse(text)
    const data = rows.data

    for (let i = 1; i < data.length; i += cardsPerPage) {
        if (!data[i][0] || data[i][0] == '' || data[i][0] == ' ' || data[i][0] == '-') continue

        let templateToUse = '#templatePrueba';
        let productReverse = true;

        if (currentPage % 2 !== 0) {
            templateToUse = '.even';
            productReverse = false;
        };

        const templatePage = document.querySelector(templateToUse).content.cloneNode(true);
        let productCount = 0
        const list = templatePage.querySelector('.product-list');
        const footerPageNum = templatePage.querySelector('.pageNum')
        footerPageNum.innerHTML = `0${currentPage}`;

        for (let j = i; j < data.length; j++) {
            if (productCount === cardsPerPage) break;
            if (!data[j][0] || data[j][0] == '' || data[j][0] == ' ' || data[j][0] == '-') continue;

            appendProductCard(list, data[j], data[0], productReverse);
            productCount++
        }
        document.body.appendChild(templatePage);
        currentPage++
    }
};

readCatalogue();

