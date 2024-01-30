let even = document.createElement('div')
let currentPage = 1
let odd = document.createElement('div')
const FILEPATH = '/catalogo1.csv'
let catalogueData = []


// Example usage within your loop
// for (let i = 1; i < data.length; i++) {
//     if (!data[i][0] || data[i][0] == '' || data[i][0] == ' ') continue;

//     if (i % 5 == 0 || i == 1) {
//         if (currentPage % 2 !== 0) {
//             const oddTemplate = document.querySelector('#odd');
//             const oddTemplateClone = oddTemplate.content.cloneNode(true);

//             // Now, select the product list within the cloned odd template
//             const productList = oddTemplateClone.querySelector('.product-list');

//             // Call the function to append product card
//             appendProductCard(productList, data[i]);

//             document.body.appendChild(oddTemplateClone);
//         }
//     }
// }
function appendProductCard(productList, productData) {
    // console.log(productData)
    const productCardTemplate = document.querySelector('#productTemplate');
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
        if (detailCount === 6) break;
        if (productData[i] === '' || !productData[i] || productData[i] === ' ' || productData[i] === '-') continue;
        const detail = document.createElement('li');
        detail.innerText = productData[i];
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

    for (let i = 1; i < data.length; i++) {
        if (!data[i][0] || data[i][0] == '' || data[i][0] == ' ') continue

        if (i % 5 == 0 || i == 1) {

            if (currentPage % 2 !== 0) {
                let productCount = 0
                const evenTemplate = document.querySelector('.even').content.cloneNode(true);
                const list = evenTemplate.querySelector('.product-list');
                const footerPageNum = evenTemplate.querySelector('.pageNum')
                footerPageNum.innerHTML = currentPage;
                //console.log(data[i])
                for (let i = 1; i < data.length; i++) {
                    if (productCount == 5) break

                    appendProductCard(list, data[i])
                    productCount++
                }
                document.body.appendChild(evenTemplate)
                currentPage++

            } else if (currentPage % 2 == 0) {
                let productCount = 0
                const tryTemplate = document.querySelector('#templatePrueba').content.cloneNode(true);
                const list = tryTemplate.querySelector('.product-list');
                const footerPageNum = tryTemplate.querySelector('.pageNum')
                footerPageNum.innerHTML = currentPage;
                for (let i = 1; i < data.length; i++) {
                    if (productCount == 5) break
                    appendProductCard(list, data[i])
                    productCount++
                }
                currentPage++
                document.body.appendChild(tryTemplate)
            }


        }
        // appendProductCard(document.querySelector('.product-list'), data[i])

    }
}
// document.addEventListener('DOMContentLoaded', function () {
//     readCatalogue()
// })
readCatalogue()

