const FILEPATH = '/catalogo1.csv'
let catalogueData = []
let currentPage = 1
//manejar el product[0] vacío en el loop de afuera y ni llamar a la función si no está
function appendProductCard(productList, productData) {
    const productCardTemplate = document.querySelector('#productTemplate');
    const productCard = productCardTemplate.content.cloneNode(true);
    productCard.querySelector('.title').innerText = productData[0];
    const detailsList = productCard.querySelector('.caracteristicas');
    const imagePath = data[1];
    const imageDiv = productCard.querySelector('.image');
    if (data[14] === 'SI') {
        const ribbon = document.createElement('div');
        ribbon.classList.add('ribbon', 'left');
        ribbon.textContent = 'nuevo';
        imageDiv.appendChild(ribbon);
    }
    const image = productCardClone.querySelector('img');
    image.src = imagePath
    let detailCount = 0;
    for (let i = 2; i < productData.length; i++) {
        if (detailCount == 6) break
        if (productData[i] = '' || !productData[i] || productData[i] == ' ') continue;
        const detail = document.createElement('li');
        detail.innerText = productData[i];
        detailsList.appendChild(detail);
        detailCount++;
    }
    productList.appendChild(productCard);
}

async function readCatalogue() {
    const resp = await fetch(FILEPATH)
    const text = await resp.text()
    const rows = await Papa.parse(text)
    const data = rows.data
    for (let i = 1; i < data.length; i++) {

    }
}