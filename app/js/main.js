const body = document.querySelector('body') 
const main = document.querySelector('main') 
const nav = document.querySelector('nav')
const header = document.querySelector('header')
const menu = document.querySelector('#menu')
const cerrar = document.querySelector('#cerrar')

const links = document.querySelectorAll('#link > a')
const inicio = document.querySelector('#combo')

const verCarrito = document.querySelector('#carrito')

const carritoGuardado = localStorage.getItem('carrito')
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []

let contador= carrito.reduce((total, producto) => total + producto.cantidad, 0)
verCarrito.textContent = `🛒CARRITO(${contador}) $ ${total()}`

menu.addEventListener('click', function () {
    nav.classList.add('menu_visible')
})
cerrar.addEventListener('click', function () {
    nav.classList.remove('menu_visible')
})  

document.addEventListener('DOMContentLoaded', () => {
    body.style.overflow = 'hidden'

    inicio.click()
    setTimeout(() =>{
        header.scrollIntoView({ behavior: 'smooth'})
    }, 500)

    const respuestaGuardada = localStorage.getItem('mayorEdad')
    if (respuestaGuardada === 'si') {
        body.style.overflow = 'auto'
        return
    }

    const modalAskContainer = document.createElement('div')
    modalAskContainer.className = 'modal_pregunta'
    body.appendChild(modalAskContainer)

    const modalAskContent = document.createElement('div')
    modalAskContent.className = 'modal_pregunta_contenido'
    modalAskContainer.appendChild(modalAskContent)

    const modalAskLogo = document.createElement('img')
    modalAskLogo.setAttribute('src', '../img/DRINKING.png')
    modalAskLogo.setAttribute('alt', 'DRINKING')
    modalAskContent.appendChild(modalAskLogo)

    const modalAsk = document.createElement('span')
    modalAsk.textContent = '¿Eres mayor de 18 años?'
    modalAskContent.appendChild(modalAsk)

    const buttonAskYes = document.createElement('a')
    buttonAskYes.textContent = 'Sí'
    buttonAskYes.className = 'boton_pregunta_si'
    buttonAskYes.addEventListener('click', () => {
        localStorage.setItem('mayorEdad', 'si')
        modalAskContainer.remove()
        body.style.overflow = 'auto'
    })
    modalAskContent.appendChild(buttonAskYes)

    const buttonAskNo = document.createElement('a')
    buttonAskNo.textContent = 'No'
    buttonAskNo.className = 'boton_pregunta_no'
    buttonAskNo.addEventListener('click', () => {
        window.location.href = 'https://www.youtube.com/watch?v=vcuMw5ODKa0&t=2s'
    })
    modalAskContent.appendChild(buttonAskNo)
})

const logo = document.querySelector('.logo')
logo.addEventListener('click', () =>{
    header.scrollIntoView({ behavior: 'smooth' })
})
let bannerGenerated = false

links.forEach(link => {
    link.addEventListener('click',() => {
        main.textContent = ''
        nav.classList.remove('menu_visible')
        const category = link.id;
        const filterByCategory = (Productos, categoria) => {
            return Productos.filter(producto => producto.categoria === categoria)
        }
        const filteredProducts = filterByCategory(Productos, category);

        let cardProduct = document.createElement('section')
        cardProduct.classList.add('container_card')
        let titleCategory = document.createElement('h2')
        titleCategory.className = 'titulo'
        titleCategory.textContent = category.toUpperCase() 
        main.appendChild(titleCategory)

        const datosAlumno = {
            Alumno: 'Christian Olivera',
            Carrera: 'Diseño y Desarrollo Web',
            Materia: 'IDM',
            Comision: 'DWN2B',
            Turno: 'Noche',
            Año: '2024',
            Cuatrimestre: '2° Cuatrimestre',
            Docente: 'Pamela Iglesias',
            Entrega: 'Final',
        }

        const info = document.createElement('button')
        info.className = 'info_button'
        info.textContent = '👨🏽‍💻'
        main.appendChild(info)
        info.addEventListener('click', () =>{
            body.style.overflow = 'hidden'
            const infoModal = document.createElement('div')
            infoModal.className = 'info_modal'
            infoModal.addEventListener('click', () =>{
                body.style.overflow = 'auto'
                infoModal.remove()
            })
            main.append(infoModal)

            const infoContainer = document.createElement('div')
            infoContainer.className = 'info_container'
            infoModal.append(infoContainer)

            const infoImage = document.createElement('img')
            infoImage.setAttribute('src', '../img/foto_info.jpg')
            infoImage.setAttribute('alt', 'Foto Alumno')
            infoContainer.append(infoImage)

            for (const [clave, valor] of Object.entries(datosAlumno)) {
                const infoData = document.createElement('p')
                infoData.innerHTML = `<strong>${clave}:</strong> ${valor}`
                infoContainer.append(infoData)
            }
            document.addEventListener('keydown', (event) => {
                if(event.key === 'Escape'){
                    infoModal.remove()
                    body.style.overflow = 'auto'
                }
            })
        })

        filteredProducts.forEach(producto => {

            let productItem = document.createElement('a')
            productItem.setAttribute('id', 'card')
            productItem.classList.add('card')

            let img = document.createElement('img')
            img.src = producto.imagenes[0]
            img.alt = producto.descripcion
            img.addEventListener('click', (detalle))
            img.addEventListener('mouseenter' , () =>{
                let viewDetail = document.createElement('span')
                viewDetail.className = 'detalle_ver'
                viewDetail.addEventListener('click', (detalle))
                productItem.append(viewDetail)
                img.addEventListener('mouseleave', () =>{
                    viewDetail.remove()
                })
            })
            productItem.append(img)

            let title = document.createElement('h3')
            title.textContent = producto.nombre
            productItem.append(title)

            let price = document.createElement('span')
            price.textContent =`$ ${producto.precio} `
            productItem.append(price)

            let comprar = document.createElement('a')
            comprar.innerHTML = 'Agregar al Carrito'
            comprar.setAttribute('id', 'comprar')
            comprar.addEventListener('click', (e) =>{
                e.stopPropagation()
                let comparar = carrito.some((verificarProducto) => verificarProducto.id === producto.id)
                if(comparar){
                    carrito.map((product)=>{
                        if(product.id === producto.id){
                            product.cantidad++
                        }
                    })
                }else{
                    carrito.push({
                        id: producto.id,
                        imagen: producto.imagenes[0],
                        nombre: producto.nombre,
                        precio: producto.precio,
                        cantidad: producto.cantidad
                    })
                }
                contador++
                verCarrito.textContent = `🛒CARRITO(${contador}) $ ${total()}`
                localStorage.setItem('carrito', JSON.stringify(carrito))               
                let toast = document.createElement('span')
                toast.className = 'mensaje'
                toast.textContent = '✅ Producto Agregado'
                main.append(toast)
                setTimeout( () =>{
                    toast.classList.add('mostrar')
                    setTimeout( () =>{
                        toast.remove()
                    }, 2000)
                }, 50)
            })

            productItem.append(comprar)
            
            cardProduct.appendChild(productItem)

            main.appendChild(cardProduct)

            function banner(){
                bannerGenerated = true
                let bannerConteiner = document.createElement('div')
                bannerConteiner.classList.add('banner')
                main.append(bannerConteiner)
                
                let bannerButton = document.createElement('a')
                bannerButton.className = 'banner_button'
                bannerButton.addEventListener('click', () =>{
                    const targetCombo = document.querySelector('#combo')
                    targetCombo.click()
                })
                bannerConteiner.append(bannerButton)

                setTimeout(() => {
                    bannerConteiner.remove()
                }, 10000)
            }

            if(category !== 'combo' && !bannerGenerated){
                const targetCard = document.querySelector('.titulo')
                targetCard.scrollIntoView({ behavior: 'smooth' })
                banner()
            }else{
                nav.scrollIntoView({ behavior: 'smooth'})
                setTimeout(() =>{
                    const comboCard = document.querySelector('.titulo')
                    comboCard.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }

            function detalle(){
                body.style.overflow = 'hidden'
                let container_detail = document.createElement('section')
                container_detail.className = 'detalle_fondo'
                container_detail.addEventListener('click', () =>{
                    container_detail.remove()
                    body.style.overflow = 'auto'
                })
                document.addEventListener('keydown', (event) => {
                    if(event.key === 'Escape'){
                        container_detail.remove()
                        body.style.overflow = 'auto'
                    }
                })

                let detail = document.createElement('div')
                detail.className = 'detalle_container'
                detail.addEventListener('click',(e) =>{
                    e.stopPropagation()
                })
                container_detail.append(detail)

                let detailPic = document.createElement('div')
                detailPic.className = 'detalle_fotos'
                detail.append(detailPic)
                
                let detailImg = document.createElement('img')
                detailImg.src = producto.imagenes[0]
                detailPic.append(detailImg)

                let detailGalery = document.createElement('div')
                detailGalery.className = 'detalle_galeria'
                detailPic.append(detailGalery)

                for(let i = 0; i < producto.imagenes.length; i++){
                    let detailImages = document.createElement('img')
                    detailImages.className = 'detalle_imagenes'
                    detailImages.src = producto.imagenes[i]
                    detailImages.setAttribute('data-index', i)
                    detailImages.addEventListener('mouseenter', (event) =>{
                        const clickIndex = event.target.getAttribute('data-index')
                        detailImg.src = producto.imagenes[clickIndex]
                    })
                    detailGalery.append(detailImages)
                }

                let detailInfo = document.createElement('div')
                detailInfo.className = 'detalle_info'
                detail.append(detailInfo)

                let detailName = document.createElement('h3')
                detailName.textContent = producto.nombre
                detailInfo.append(detailName)

                let detailText = document.createElement('p')
                detailText.textContent = producto.descripcion
                detailInfo.append(detailText)

                let detailPrice = document.createElement('span')
                detailPrice.textContent = `$ ${producto.precio} `
                detailInfo.append(detailPrice)
                
                let detailBuy = document.createElement('a')
                detailBuy.textContent = 'Agregar al Carrito'
                detailBuy.setAttribute('id', 'detalle_comprar')
                detailBuy.addEventListener('click', (e) =>{
                    e.stopPropagation()
                    let comparar = carrito.some((verificarProducto) => verificarProducto.id === producto.id)
                    if(comparar){
                        carrito.map((product)=>{
                            if(product.id === producto.id){
                                product.cantidad++
                            }
                        })
                    }else{
                    carrito.push({
                        id: producto.id,
                        imagen: producto.imagenes[0],
                        nombre: producto.nombre,
                        precio: producto.precio,
                        cantidad: producto.cantidad
                    })
                    }
                    contador++
                    verCarrito.textContent = `🛒CARRITO(${contador}) $ ${total()}`
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    container_detail.remove()
                    body.style.overflow = 'auto'
                })
                detailInfo.append(detailBuy)

                let detailBack = document.createElement('a')
                detailBack.textContent = '← Volver a Productos'
                detailBack.classList.add('detalle_volver')
                detailBack.addEventListener('click', () =>{
                    container_detail.remove()
                    body.style.overflow = 'auto'
                })
                detailInfo.append(detailBack)


                main.appendChild(container_detail)
            }
        })
        bannerGenerated = false
    })
    
})


function total(){
    return carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
}


verCarrito.addEventListener('click', () =>{
    body.style.overflow = 'hidden'
    function carritoVacio(){
        if(contador === 0){
            let vacioCarrito  = document.createElement('p')
            vacioCarrito.textContent = 'EL CARRITO SE ENCUENTRA VACIO'
            vacioCarrito.className = 'modal_vacio'
            modalCarrito.append(vacioCarrito)
            containTotal.style.display = 'none'
            btnFinalizar.style.display = 'none'
        }
    }

    let modalContainer = document.createElement('section')
    modalContainer.className = 'modal_container' 
    modalContainer.addEventListener('click', () => {
        modalContainer.remove()
        body.style.overflow = 'auto'
    })
    document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape' || event.key === 'Enter'){
            modalContainer.remove()
            body.style.overflow = 'auto'
        }
    })

    let modalCarrito = document.createElement('div')
    modalCarrito.className = 'modal_carrito'
    modalCarrito.addEventListener('click',(e) =>{
        e.stopPropagation()
    })
    modalContainer.append(modalCarrito)

    let modalHeader = document.createElement('div')
    modalHeader.className = 'modal_header'
    modalCarrito.append(modalHeader)
    let cerrarModal = document.createElement('a')
    cerrarModal.className = 'cerrar_modal'
    cerrarModal.addEventListener('click', () =>{
        modalContainer.remove()
        body.style.overflow = 'auto'
    })
    modalHeader.append(cerrarModal)

    let titleModal = document.createElement('span')
    titleModal.textContent = 'CARRITO DE COMPRA'
    modalHeader.append(titleModal)
    
    carrito.forEach((producto) => {
        let carritoProducto = document.createElement('div')
        carritoProducto.classList.add('modal_producto')
        
        let containerCarrito = document.createElement('div')
        containerCarrito.className = 'modal_container_producto'
        carritoProducto.append(containerCarrito)

        let imgCarrito = document.createElement('img')
        imgCarrito.src = producto.imagen
        imgCarrito.alt = producto.descripcion
        containerCarrito.append(imgCarrito)

        let infoCarrito = document.createElement('div')
        infoCarrito.className = 'modal_info'
        containerCarrito.append(infoCarrito)

        let tituloCarrito = document.createElement('h3')
        tituloCarrito.textContent = producto.nombre
        infoCarrito.append(tituloCarrito)

        let numCarrito = document.createElement('span')
        numCarrito.textContent = `$ ${producto.precio}`
        infoCarrito.append(numCarrito)

        let cajaBtnCarrito = document.createElement('div')
        cajaBtnCarrito.className = 'modal_cajabtn'
        infoCarrito.append(cajaBtnCarrito)

        let menosBtnCarrito = document.createElement('button')
        menosBtnCarrito.className = 'modal_boton'
        menosBtnCarrito.textContent = '-'
        menosBtnCarrito.addEventListener('click', () =>{
            let comparar = carrito.some((verificarProducto) => verificarProducto.id === producto.id)
            if(comparar){
                carrito.map((product)=>{
                    if(product.id === producto.id){
                        product.cantidad--
                    }
                })
            }
            contarCarrito.textContent = producto.cantidad
            precioCarrito.textContent =`$ ${producto.precio * producto.cantidad}`
            subTotal.textContent = `$ ${total()}`
            contador--
            verCarrito.textContent = `🛒CARRITO(${contador}) $ ${total()}`
            if(contarCarrito.textContent <= 1){
                menosBtnCarrito.disabled = true
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
        cajaBtnCarrito.append(menosBtnCarrito)
        

        let contarCarrito = document.createElement('span')
        contarCarrito.className = 'modal_num'
        contarCarrito.textContent = producto.cantidad
        cajaBtnCarrito.append(contarCarrito)

        if(contarCarrito.textContent <= 1){
            menosBtnCarrito.disabled = true
        }

        let masBtnCarrito = document.createElement('button')
        masBtnCarrito.className = 'modal_boton'
        masBtnCarrito.textContent = '+'
        masBtnCarrito.addEventListener('click', () => {
            menosBtnCarrito.disabled = false
            let comparar = carrito.some((verificarProducto) => verificarProducto.id === producto.id)
            if(comparar){
                carrito.map((product)=>{
                    if(product.id === producto.id){
                        product.cantidad++
                    }
                })
            }
            contarCarrito.textContent = producto.cantidad
            precioCarrito.textContent =`$ ${producto.precio * producto.cantidad}`
            subTotal.textContent = `$ ${total()}`
            contador++
            verCarrito.textContent = `🛒CARRITO(${contador}) $ ${total()}`
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
        cajaBtnCarrito.append(masBtnCarrito)

        let containerPrecio = document.createElement('div')
        containerPrecio.className = 'modal_producto_precio'
        carritoProducto.append(containerPrecio)

        let precioCarrito = document.createElement('span')
        precioCarrito.textContent =`$ ${producto.precio * producto.cantidad}`
        containerPrecio.append(precioCarrito)

        let eliminarCarrito = document.createElement('div')
        eliminarCarrito.className = 'modal_borrar'
        eliminarCarrito.addEventListener('click', () =>{
            const eliminarId = carrito.findIndex((product) => product.id === producto.id)
            if(eliminarId > -1){
                carrito.splice(eliminarId, 1)
                carritoProducto.remove()
                subTotal.textContent = `$ ${total()}`
                contador -= contarCarrito.textContent
                verCarrito.textContent = `🛒CARRITO(${contador}) $ ${total()}`
            }
            localStorage.setItem('carrito', JSON.stringify(carrito))
            carritoVacio()
        })
        containerPrecio.append(eliminarCarrito)

        modalCarrito.append(carritoProducto)
        
    })

    const containTotal = document.createElement('div')
    containTotal.className = 'modal_total'

    let spanTotal = document.createElement('span')
    spanTotal.textContent = 'Total:'
    containTotal.append(spanTotal)

    let subTotal = document.createElement('span')
    subTotal.textContent = `$ ${total()}`
    containTotal.append(subTotal)
    
    modalCarrito.append(containTotal)

    let btnFinalizar = document.createElement('button')
    btnFinalizar.className = 'boton_finalizar'
    btnFinalizar.textContent = 'FINALIZAR COMPRA'
    btnFinalizar.addEventListener('click', (checkout))
    modalCarrito.append(btnFinalizar)

    function checkout () {
        modalContainer.remove()
        
        let checkoutConteiner = document.createElement('section')
        checkoutConteiner.className = 'checkout'
        
        let checkoutItems = document.createElement('div')
        checkoutItems.className = 'checkout_items'
        checkoutConteiner.append(checkoutItems)

        let checkoutreturn = document.createElement('a')
        checkoutreturn.textContent = '« Volver'
        checkoutreturn.className = 'checkout_return'
        checkoutreturn.addEventListener('click', () =>{
            checkoutConteiner.remove()
            body.style.overflow = 'auto'
        })
        checkoutItems.append(checkoutreturn)

        let checkoutTitle = document.createElement('span')
        checkoutTitle.textContent = 'Lista de Compra'
        checkoutItems.append(checkoutTitle)

        let checkoutProduct = document.createElement('ul')
        checkoutProduct.className = 'checkout_product'
        checkoutItems.append(checkoutProduct)
        
        carrito.forEach((producto) =>{
            let checkoutProductList = document.createElement('li')
            checkoutProductList.className = 'checkout_list'
            checkoutProduct.append(checkoutProductList)
            
            let checkoutProductImg = document.createElement('img')
            checkoutProductImg.className = 'checkout_img'
            checkoutProductImg.src = producto.imagen
            checkoutProductImg.alt = producto.descripcion
            checkoutProductList.append(checkoutProductImg)

            let checkoutProductInfo = document.createElement('div')
            checkoutProductInfo.className = 'checkout_product_info'
            checkoutProductList.append(checkoutProductInfo)

            let checkoutProductName = document.createElement('h3')
            checkoutProductName.textContent = producto.nombre
            checkoutProductInfo.append(checkoutProductName)

            let checkoutProductLot =  document.createElement('span')
            checkoutProductLot.textContent =`Cantidad: ${producto.cantidad}`
            checkoutProductInfo.append(checkoutProductLot)

            let checkoutProductPrice = document.createElement('span')
            checkoutProductPrice.className = 'checkout_product_price'
            checkoutProductPrice.textContent = `$ ${producto.precio * producto.cantidad}`
            checkoutProductList.append(checkoutProductPrice)
        })

        let checkoutTotal = document.createElement('div')
        checkoutTotal.className = 'checkout_total'
        checkoutItems.append(checkoutTotal)
        
        let checkoutProductSpan = document.createElement('span')
        checkoutProductSpan.className = 'checkout_product_span'
        checkoutProductSpan.textContent = 'Total:'
        checkoutTotal.append(checkoutProductSpan)

        let checkoutProductTotal = document.createElement('span')
        checkoutProductTotal.className = 'checkout_product_total'
        checkoutProductTotal.textContent = `$ ${total()}`
        checkoutTotal.append(checkoutProductTotal)


        let checkoutForm = document.createElement('div')
        checkoutForm.className = 'checkout_form'
        checkoutConteiner.append(checkoutForm)
        
        let checkoutFormSpan = document.createElement('span')
        checkoutFormSpan.textContent = 'Datos de Comprador'
        checkoutForm.append(checkoutFormSpan)

        let checkoutFormContainer = document.createElement('form') 
        checkoutFormContainer.setAttribute('id', 'form')
        checkoutForm.append(checkoutFormContainer)
        
        let checkoutLabelName = document.createElement('label')
        checkoutLabelName.setAttribute('for', 'nombre')
        checkoutLabelName.textContent = 'Nombre y Apellido:'
        checkoutFormContainer.append(checkoutLabelName)

        let checkoutFormName = document.createElement('input')
        checkoutFormName.setAttribute('type', 'text')
        checkoutFormName.setAttribute('id', 'nombre')
        checkoutFormName.setAttribute('name', 'nombre')
        checkoutFormName.setAttribute('placeholder', 'Ej: Drin King')
        checkoutFormContainer.append(checkoutFormName)

        let checkoutLabelPhone = document.createElement('label')
        checkoutLabelPhone.setAttribute('for', 'celular')
        checkoutLabelPhone.textContent = 'Celular:'
        checkoutFormContainer.append(checkoutLabelPhone)

        let checkoutFormPhone = document.createElement('input')
        checkoutFormPhone.setAttribute('type', 'number')
        checkoutFormPhone.setAttribute('id', 'celular')
        checkoutFormPhone.setAttribute('name', 'celular')
        checkoutFormPhone.setAttribute('placeholder', 'Ej: 1151234567')
        checkoutFormContainer.append(checkoutFormPhone)

        let checkoutLabelEmail = document.createElement('label')
        checkoutLabelEmail.setAttribute('for', 'email')
        checkoutLabelEmail.textContent = 'Email:'
        checkoutFormContainer.append(checkoutLabelEmail)

        let checkoutFormEmail = document.createElement('input')
        checkoutFormEmail.setAttribute('type', 'email')
        checkoutFormEmail.setAttribute('id', 'email')
        checkoutFormEmail.setAttribute('name', 'email')
        checkoutFormEmail.setAttribute('placeholder', 'Ej: drinking@gmail.com')
        checkoutFormContainer.append(checkoutFormEmail)

        let checkoutLabelPlace = document.createElement('label')
        checkoutLabelPlace.setAttribute('for', 'lugar')
        checkoutLabelPlace.textContent = 'Direccion de Envio:'
        checkoutFormContainer.append(checkoutLabelPlace)

        let checkoutFormPlace = document.createElement('input')
        checkoutFormPlace.setAttribute('type', 'text')
        checkoutFormPlace.setAttribute('id', 'lugar')
        checkoutFormPlace.setAttribute('name', 'lugar')
        checkoutFormPlace.setAttribute('placeholder', 'Ej: Av.Corrientes 2037')
        checkoutFormContainer.append(checkoutFormPlace)

        let checkoutLabelDate = document.createElement('label')
        checkoutLabelDate.setAttribute('for', 'fecha')
        checkoutLabelDate.textContent = 'Fecha de Envio:'
        checkoutFormContainer.append(checkoutLabelDate)

        let checkoutFormDate = document.createElement('input')
        checkoutFormDate.setAttribute('type', 'date')
        checkoutFormDate.setAttribute('id', 'fecha')
        checkoutFormDate.setAttribute('name', 'fecha')
        checkoutFormContainer.append(checkoutFormDate)

        let checkoutLabelPay = document.createElement('label')
        checkoutLabelPay.setAttribute('for', 'pago')
        checkoutLabelPay.textContent = 'Metodo de Pago:'
        checkoutFormContainer.append(checkoutLabelPay)

        let checkoutFormPay = document.createElement('div')
        checkoutFormPay.className = 'checkout_form_pay'
        checkoutFormContainer.append(checkoutFormPay)

        let checkoutFormPayMp = document.createElement('div')
        checkoutFormPayMp.className = 'checkout_form_pay_mp'
        checkoutFormPay.append(checkoutFormPayMp)

        let checkoutFormMp = document.createElement('input')
        checkoutFormMp.setAttribute('type', 'radio')
        checkoutFormMp.setAttribute('id', 'pago')
        checkoutFormMp.setAttribute('name', 'pago')
        checkoutFormMp.className = 'checkout_form_mp'
        checkoutFormPayMp.append(checkoutFormMp)

        let checkoutFormMpImg = document.createElement('img')
        checkoutFormMpImg.setAttribute('src', '../img/mp.png')
        checkoutFormMpImg.setAttribute('alt', 'Mercado Pago')
        checkoutFormMpImg.className = 'checkout_form_mp_img'
        checkoutFormPayMp.append(checkoutFormMpImg)

        let checkoutFormPayTb = document.createElement('div')
        checkoutFormPayTb.className = 'checkout_form_pay_tb'
        checkoutFormPay.append(checkoutFormPayTb)

        let checkoutFormTb = document.createElement('input')
        checkoutFormTb.setAttribute('type', 'radio')
        checkoutFormTb.setAttribute('id', 'pago2')
        checkoutFormTb.setAttribute('name', 'pago')
        checkoutFormTb.className = 'checkout_form_mp'
        checkoutFormPayTb.append(checkoutFormTb)

        let checkoutFormTbImg = document.createElement('img')
        checkoutFormTbImg.setAttribute('src', '../img/tb.png')
        checkoutFormTbImg.setAttribute('alt', 'Transferencia Bancaria')
        checkoutFormTbImg.className = 'checkout_form_tb_img'
        checkoutFormPayTb.append(checkoutFormTbImg)



        let checkoutFormButton = document.createElement('a')
        checkoutFormButton.textContent = 'Enviar Compra'
        checkoutFormButton.addEventListener('click', function(event) {
            event.preventDefault()
    
            let name = checkoutFormName.value.trim()
            let phone = checkoutFormPhone.value.trim()
            let email = checkoutFormEmail.value.trim()
            let place = checkoutFormPlace.value.trim()
            let date = checkoutFormDate.value.trim()
            let pay = document.querySelector('input[name="pago"]:checked')

            function displayErrorMessage(element, message) {
                let errorMessage = document.createElement('span')
                errorMessage.className = 'error_message'
                errorMessage.textContent = message
                element.parentNode.insertBefore(errorMessage, element.nextSibling)
            }

            function removeErrorMessages() {
                let errorMessages = document.querySelectorAll('.error_message')
                errorMessages.forEach(message => {
                    message.parentNode.removeChild(message)
                })
            }

            removeErrorMessages()

            if (name === '') {
                displayErrorMessage(checkoutFormName, 'Ingrese su Nombre y Apellido.')
                return
            }

            if (phone === '') {
                displayErrorMessage(checkoutFormPhone, 'Ingrese su número de celular.')
                return
            }

            let phoneFormat = /^\d{10}$/
            if (!phoneFormat.test(phone)) {
                displayErrorMessage(checkoutFormPhone, 'Ingrese un número de celular válido (10 dígitos).')
                return
            }
    
            if (email === '') {
                displayErrorMessage(checkoutFormEmail, 'Ingrese su correo electrónico.')
                return
            }

            let emailFormat = /\S+@\S+\.\S+/
            if (!emailFormat.test(email)) {
                displayErrorMessage(checkoutFormEmail, 'Ingrese un email válido.')
                return
            }
    
            if (place === '') {
                displayErrorMessage(checkoutFormPlace, 'Ingrese su dirección de envío.')
                return
            }
    
            if (date === '') {
                displayErrorMessage(checkoutFormDate, 'Seleccione la fecha de envío.')
                return
            }
    
            if (!pay) {
                let checkoutFormPay = document.querySelector('.checkout_form_pay')
                displayErrorMessage(checkoutFormPay, 'Seleccione un método de pago.')
                return
            }  

            carrito.length = 0
            contador = 0
            verCarrito.textContent = `🛒CARRITO(${contador}) $ ${total()}`
            localStorage.removeItem('carrito')
            showSuccessModal()

            function showSuccessModal() {
                let successModalContainer = document.createElement('div')
                successModalContainer.className = 'success_modal'
                checkoutConteiner.append(successModalContainer)

                let successImg = document.createElement('img')
                successImg.setAttribute('src', '../img/aceptado.png')
                successImg.setAttribute('alt', 'Aceptado')
                successImg.className = 'success_img'
                successModalContainer.append(successImg)
            
                let successSpan = document.createElement('span')
                successSpan.textContent = '¡Compra enviada con éxito!'
                successModalContainer.append(successSpan)

                let successMessage = document.createElement('p')
                successMessage.textContent = 'En breve se comunicaran con usted para coordinar la compra'
                successModalContainer.append(successMessage)

                let countdown = 9

                let countdownDisplay = document.createElement('p')
                countdownDisplay.textContent = `Volviendo al inicio en ${countdown} segundos`
                successModalContainer.append(countdownDisplay)

                let countdownInterval = setInterval(() => {
                    countdown--;

                    if (countdown === 0) {
                        clearInterval(countdownInterval)
                        successModalContainer.remove()
                        checkoutConteiner.remove()
                        body.style.overflow = 'auto'
                    } else {
                        countdownDisplay.textContent = `Volviendo al inicio en ${countdown} segundos`
                    }
                }, 1200)
            }

        })
        checkoutFormContainer.append(checkoutFormButton)

        main.appendChild(checkoutConteiner)

    }

    carritoVacio()

    main.appendChild(modalContainer)


})
