window.onload = () => {

    arrReview = []
    if(localStorage.getItem("reviews")){
        arrReview = JSON.parse(localStorage.getItem("reviews"))
        document.getElementById("reviews-container").innerHTML = `
            <div class="review">
            <h3>Great product</h3>
            <p>I think this product is great, I think it is the best out there!</p>
            </div>
        `

        for (let i = 0; i < arrReview.length; i++){
            document.getElementById("reviews-container").innerHTML += `
            <div class="review">
                <h3>${arrReview[i].title}</h3>
                <p>${arrReview[i].content}</p>
            </div>
            `
        }
    }

    let sizes = document.querySelector(".sizes")
    let lb_current_price = document.querySelector(".current")
    let lb_old_price = document.querySelector(".old")
    let lb_discount_price = document.querySelector(".discount")
    let currentPriceLocal = 0
    let total = document.getElementById("total")

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
            currentPriceLocal = arr[i].price
            total.textContent = "Total: $"+(parseFloat(lb_current_price.textContent.replace('$',""))).toFixed(2)
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
            if (evt.target.target == sizeML[i].target){
                lb_current_price.textContent = "$"+arr[i].price
                currentPriceLocal = arr[i].price
            }
            lb_discount_price.classList.add("noDisplay")
            lb_old_price.classList.add("noDisplay")
            inputQuantity.value = 1
            if (inputQuantity == ''){
                total.textContent = ("--")
            }
            else (
                total.textContent = "Total: $"+(parseFloat(lb_current_price.textContent.replace('$',""))*parseInt(inputQuantity.value)).toFixed(2)
            )
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

        if (inputQuantity.value <= 5){
            lb_current_price.textContent = "$"+parseFloat(currentPriceLocal).toFixed(2)
            lb_discount_price.classList.add("noDisplay")
            lb_old_price.classList.add("noDisplay")
        }

        if (inputQuantity.value > 5){
            lb_current_price.textContent = "$"+(currentPriceLocal - (currentPriceLocal*.10)).toFixed(2)
            lb_old_price.textContent = "$"+currentPriceLocal
            lb_discount_price.textContent = "10% OFF"
            lb_old_price.classList.remove("noDisplay")
            lb_discount_price.classList.remove("noDisplay")
        }

        if (inputQuantity.value > 10){
            lb_current_price.textContent = "$"+(currentPriceLocal - (currentPriceLocal*.20)).toFixed(2)
            lb_old_price.textContent = "$"+currentPriceLocal
            lb_discount_price.textContent = "20% OFF"
            lb_old_price.classList.remove("noDisplay")
            lb_discount_price.classList.remove("noDisplay")
        }

        if (inputQuantity == ''){
            total.textContent = ("--")
        }
        else if(isNaN(inputValue)){
            total.textContent = "Total: - - - - -"
        }
        else (
            total.textContent = "Total: $"+(parseFloat(lb_current_price.textContent.replace('$',""))*parseInt(inputQuantity.value)).toFixed(2)
        )
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
        if (inputQuantity.value <= 5){
            lb_current_price.textContent = "$"+parseFloat(currentPriceLocal).toFixed(2)
            lb_discount_price.classList.add("noDisplay")
            lb_old_price.classList.add("noDisplay")
        }
        if (inputQuantity.value > 5){
            lb_current_price.textContent = "$"+(currentPriceLocal - (currentPriceLocal*.10)).toFixed(2)
            lb_old_price.textContent = "$"+currentPriceLocal
            lb_discount_price.textContent = "10% OFF"
            lb_old_price.classList.remove("noDisplay")
            lb_discount_price.classList.remove("noDisplay")
        }
        if (inputQuantity.value > 10){
            lb_current_price.textContent = "$"+(currentPriceLocal - (currentPriceLocal*.20)).toFixed(2)
            lb_old_price.textContent = "$"+currentPriceLocal
            lb_discount_price.textContent = "20% OFF"
            lb_old_price.classList.remove("noDisplay")
            lb_discount_price.classList.remove("noDisplay")
        }
        if (inputQuantity == ''){
            total.textContent = ("--")
        }
        else (
            total.textContent = "Total: $"+(parseFloat(lb_current_price.textContent.replace('$',""))*parseInt(inputQuantity.value)).toFixed(2)
        )
    })

    btnDecrease.addEventListener('click', () =>{
        if (parseInt(inputQuantity.value) > 1){
            inputQuantity.value = parseInt(inputQuantity.value)-1;
        }
        if (isNaN(parseInt(inputQuantity.value))){
            inputQuantity.value = 1
        }
        if (inputQuantity.value <= 5){
            lb_current_price.textContent = "$"+parseFloat(currentPriceLocal).toFixed(2)
            lb_discount_price.classList.add("noDisplay")
            lb_old_price.classList.add("noDisplay")
        }
        if (inputQuantity.value > 5){
            lb_current_price.textContent = "$"+(currentPriceLocal - (currentPriceLocal*.10)).toFixed(2)
            lb_old_price.textContent = "$"+currentPriceLocal
            lb_discount_price.textContent = "10% OFF"
            lb_old_price.classList.remove("noDisplay")
            lb_discount_price.classList.remove("noDisplay")
        }
        if (inputQuantity.value > 10){
            lb_current_price.textContent = "$"+(currentPriceLocal - (currentPriceLocal*.20)).toFixed(2)
            lb_old_price.textContent = "$"+currentPriceLocal
            lb_discount_price.textContent = "20% OFF"
            lb_old_price.classList.remove("noDisplay")
            lb_discount_price.classList.remove("noDisplay")
        }
        if (inputQuantity == ''){
            total.textContent = ("--")
        }
        else (
            total.textContent = "Total: $"+(parseFloat(lb_current_price.textContent.replace('$',""))*parseInt(inputQuantity.value)).toFixed(2)
        )
    })
}

let inputTitle = document.getElementById("inputReviewTitle")
let inputContent = document.getElementById("inputReviewContent")



function addReview() {
    if(inputTitle.value != "" || inputContent.value != ""){
        document.getElementById("reviews-container").innerHTML += `
        <div class="review">
          <h3>${inputTitle.value}</h3>
          <p>${inputContent.value}</p>
        </div>
        `
        arrReview.push({title: inputTitle.value, content:inputContent.value})
        console.log(arrReview[0])

        localStorage.setItem("reviews",JSON.stringify(arrReview))
    }
}