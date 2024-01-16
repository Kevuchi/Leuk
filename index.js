let even = document.createElement('div')
let currentPage = 1
let odd = document.createElement('div')
const FILEPATH = '/catalogo1.csv'
//const file1 = fetch('https://docs.google.com/spreadsheets/d/1lJ5sEQ4Z95ydjyVKADxxvSflQOI32LX89ryOkZzXu-E/edit#gid=1552755221').then(file => file.text())
// (async function getFile() {
//     return await fetch('.\proeba.csv')
// })
//internet way

// const file1 = Papa.parse('./proeba.csv', {
//     header: true,
//     download: true,
//     dynamicTyping: true,
//     complete: function (results) {
//         // console.log('RESULTS', results.data);
//         data = results.data;
//     }
// });
//console.log(data)
//washi's way
let catalogueData = []
async function readCatalogue() {
    const resp = await fetch(FILEPATH)
    const text = await resp.text()
    const rows = await Papa.parse(text)
    const data = rows.data
    console.log('data!!', data)

    //return data


    for (let i = 1; i < data.length; i++) {

        if (!data[i][0] || data[i][0] == '' || data[i][0] == ' ') continue

        // if (i % 5 == 0) {
        //     currentPage++;
        //     const template = document.querySelector('.even')


        // }

        const product = document.createElement('div')
        const productTitle = data[i][0];
        const productPicPath = data[i][1] ? data[i][1] : '';
        // const productCategory = data[i][2] ? data[i][2] : '';
        // const productMaterial = data[i][3] ? data[i][3] : '';
        // const productLightType = data[i][4] ? data[i][4] : '';
        // const productPotency = data[i][5] ? data[i][5] : '';
        // const productTemperature = data[i][6] ? data[i][6] : '';
        // const productColor = data[i][7] ? data[i][7] : '';
        // const productHeight = data[i][8] ? data[i][8] : '';
        // const productWidth = data[i][9] ? data[i][9] : '';
        // const productLength = data[i][10] ? data[i][10] : '';
        // const productDepth = data[i][11] ? data[i][11] : '';
        // const productDiameter = data[i][12] ? data[i][12] : '';
        // const productAditional = data[i][13] ? data[i][13] : '';
        // const productNational = data[i][14];
        // const productPrice = data[i][15];
        const divImage = document.createElement('div')
        divImage.className = 'image'
        divImage.innerHTML = `  <img src=${productPicPath} alt="">`;
        if (data[i][14] === 'SI') {
            divImage.innerHTML =
                `<div class="ribbon left">nuevo</div>
                   <img src=${productPicPath} alt="">`;
        }

        const info = document.createElement('div');
        info.className = 'info';
        const details = document.createElement('div');
        details.className = 'details';
        const title = document.createElement('div');
        title.className = 'title';
        title.innerHTML = `<br> ${productTitle}`;
        const detailsList = document.createElement('ul');
        detailsList.className = 'caracteristicas';
        let detailCount = 0
        for (let j = 2; j < data[i].length; j++) {
            if (detailCount == 6) break;
            if (!data[i][j] || data[i][j] === '' || data[i][j] === ' ') continue;
            const detail = document.createElement('li')
            detail.innerHTML = data[i][j]
            detailsList.appendChild(detail)
            detailCount++;

        }
        details.innerHTML += `${title}`
        details.innerHTML += `${detailsList.innerHTML}`
        info.innerHTML = `${details.innerHTML}`
        product.className = 'product'
        product.innerHTML += `${divImage.innerHTML}`
        product.innerHTML += `${info.innerHTML}`
        console.log('products inside', product)
        // product.innerHTML = `<div class="image">
        //                             <div class="ribbon left">nuevo</div>
        //                             <img src=${productPicPath} alt="">
        //                         </div>
        //                             <div class="info">
        //                             <div class="details">
        //                                 <div class="title">
        //                                     <br> ${productTitle}
        //                                 </div>

        //                                 <ul class="caracteristicas">

        //                                     <li>${productCategory} </li>
        //                                     <li> ${productMaterial}</li>
        //                                     <li> ${productLightType}</li>
        //                                     <li> ${productTemperature}</li>

        //                                     <li> ${productColor}</li>
        //                                     <li> ${productHeight}</li>
        //                                     <li> Profundidad: 86 mm</li>
        //                                     <li> Con movimiento cardánico</li>

        //                                 </ul>
        //                             </div>
        //                         </div>`
        list.appendChild(product)
    }
}
readCatalogue()
//let data = readCatalogue().then(data => data = data.data)
const productList = document.querySelector('.product-list')
const template = document.querySelector('.even')
const productClone = template.content.cloneNode(true)
productClone.innerHTML = `<div class="image">
    <div class="ribbon left">PRUEBAA</div>
    <img src="https://m.media-amazon.com/images/I/81qY64-hIlL._AC_SX679_.jpg" alt="">
</div>
    <div class="info">
    <div class="details">
        <div class="title">
            <br> PRODUCTO TEMPLATE
        </div>

        <ul class="caracteristicas">

            <li>111 </li>
            <li> 222</li>
            <li>3333</li>
            <li> 4444</li>

            <li> 55555</li>
            <li> 666666</li>
            <li> Profundidad: 86 mm</li>
            <li> Con movimiento cardánico</li>

        </ul>
    </div>
</div>`
//productList.appendChild(productClone)
const product = document.createElement('div')
product.innerHTML = `<div class="image">
    <div class="ribbon left">nuevo</div>
    <img src="./Images/pruebalalala.png" alt="">
</div>
    <div class="info">
    <div class="details">
        <div class="title">
            <br> TITULO lalalal
        </div>

        <ul class="caracteristicas">
            <li> Aplique</li>
            <li> Material: Aluminio y acero</li>
            <li> Dicroica x 4</li>
            <li> Color: Negro</li>

            <li> Largo: 165 mm</li>
            <li> Ancho: 165 mm</li>
            <li> Profundidad: 86 mm</li>
            <li> Con movimiento cardánico</li>

        </ul>
    </div>
</div>`
product.className = 'product'
//product.innerHTML = data.data[1]// [0] 
const list = document.querySelector('.product-list')

console.log('list', list)
//list.appendChild(product)
//const templateEven = document.getElementsByClassName('even')
//list.appendChild(product)
// for (i = 1; i < data.length; i++) {
//     if (i % 5 == 0) {
//         currentPage++
//         const product = document.createElement('div')
//         //  product.className = 'product'
//         product.innerText = data[i][0]
//         const list = document.getElementsByClassName('product-list')
//         list.appendChild(product)
//     } else {
//         const product = document.createElement('div')
//         product.className = 'product'
//         currentPage++
//         //  product.className = 'product'
//         product.innerText = data[i][0]
//         const list = document.getElementsByClassName('product-list')
//         list.appendChild(product)

//     }
// }

