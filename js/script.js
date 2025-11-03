window.onload = () => {

    let sizes = document.querySelector(".sizes")
    let lb_current_price = document.querySelector(".current")
    let lb_old_price = document.querySelector(".old")
    let lb_discount_price = document.querySelector(".discount")

    lb_old_price.classList.add('noDisplay')
    lb_discount_price.classList.add('noDisplay')

    var arr = [
        {id:1,size:"50ml",price:"15.00"},
        {id:2,size:"100ml",price:"20.00"}
    ]

    for (let i = 0; i < arr.length; i++){
        if(i == arr.length-1){
            sizes.innerHTML += (`<button class="size-btn active">${arr[i].size}</button>`)
            lb_current_price.textContent = "$"+arr[i].price
        }
        else{
            sizes.innerHTML += (`<button class="size-btn">${arr[i].size}</button>`)
        }
    }

    let imgGalery = document.querySelector("#main-product-img")
    let imgs = document.querySelectorAll(".thumb")
    let sizeML = document.querySelectorAll(".size-btn")
    let btnIncrease = document.querySelector("#increase")
    let btnDecrease = document.querySelector("#decrease")
    let inputQuantity = document.querySelector("#quantity")
    let rating = document.querySelector(".rating")

    let randomNumber = Math.floor(Math.random()*10)+1
    if (randomNumber > 5){
        randomNumber = randomNumber - 5
    }
    console.log(randomNumber)

    for(let i = 1; i <= 5; i++){
        if (i == 1){
            rating.innerHTML = ('')
        }
        if (i <= randomNumber){
            rating.innerHTML += ('<i class="fas fa-star"></i>')
        }
        else{
            rating.innerHTML += ('<i class="fa-regular fa-star"></i>')
        }
        if (i == 5){
            rating.innerHTML += ('<span>214 reviews</span>')
        }
    }

    for(let i = 0; i < imgs.length; i++){
        imgs[i].addEventListener('click',(evt)=>{
            imgs.forEach(item=>{
                item.classList.remove('active')
            })
            imgGalery.src=evt.target.src.replace("thumbs/","")
            evt.target.classList.add('active')
        })
    }

    for(let i = 0; i < sizeML.length; i++){
        sizeML[i].addEventListener('click',(evt)=>{
            sizeML.forEach(item=>{
                item.classList.remove('active')
            })
            evt.target.classList.add('active')
            if (evt.target == sizeML[i]){
                lb_current_price.textContent = "$"+arr[i].price
            }
        })
    }

    inputQuantity.addEventListener('input', () =>{
        let inputValue = parseInt(inputQuantity.value)
        
        if (!isNaN(inputValue)){
            if (inputValue > 15){
                inputQuantity.value = 15
            }
            if (inputValue < 1){
                inputQuantity.value = 1
            }
        }
        else{
            inputQuantity.value = ''
        }

        if (inputQuantity.value > 5){
            let currentButton = document.getElementsByClassName("size-btn active")

            let selection = 0

            for (let i = 0; i < sizeML.length; i++){
                console.log("LOOP")
                if(sizeML[i] == currentButton){
                    selection = "TEST"
                    console.log(selection)
                }
            }

            let originalPrice = parseFloat(lb_current_price.textContent.replace('$',''))
            lb_current_price.textContent = "$"+(originalPrice - (originalPrice*.10)).toFixed(2)
            console.log(lb_current_price.textContent)
            
        }
    })
    inputQuantity.addEventListener('keydown', (evt) =>{
        if (evt.key == '.' || evt.key == '-' || evt.key == '+' || evt.key == 'e' || evt.key == 'E' || evt.key == '*' || evt.key == '/'){
            evt.preventDefault()
        }
    })

    btnIncrease.addEventListener('click', () =>{
        if (parseInt(inputQuantity.value) < 15){
            inputQuantity.value = parseInt(inputQuantity.value)+1;
        }
        if (isNaN(parseInt(inputQuantity.value))){
            inputQuantity.value = 1
        }
    })

    btnDecrease.addEventListener('click', () =>{
        if (parseInt(inputQuantity.value) > 1){
            inputQuantity.value = parseInt(inputQuantity.value)-1;
        }
        if (isNaN(parseInt(inputQuantity.value))){
            inputQuantity.value = 1
        }
    })
}