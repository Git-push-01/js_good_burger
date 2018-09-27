document.addEventListener("DOMContentLoaded", () => {
  const API = "http://localhost:3000/burgers"
  const menu = document.querySelector("#burger-menu")

  fetch(API)
  .then(res => res.json())
  .then((burgers) => {
    burgers.forEach((burger) => {
      const burgerDivv = makeBurgerDiv(burger)
      menu.append(burgerDivv)
    })
  })

  menu.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON"){
      // console.log(event.target, "target");
      // console.log(event.target.parentNode);
      console.log(event.target.parentNode.querySelector(".burger_title").innerText);
      const burgerName = event.target.parentElement.children[0].innerText
      const burgerLi = makeBurgerLi(burgerName)
      document.getElementById('order-list').append(burgerLi)
    }
  })

  const orderForm = document.getElementById('custom-order')

  orderForm.addEventListener("submit", () => {
    event.preventDefault()
    const name = event.target[0].value
    const description = event.target[1].value
    const image = event.target[2].value
    const burgerData = {name: name, description:description, image:image }
    const burgerDivv = makeBurgerDiv(burgerData)
    menu.append(burgerDivv)

    fetch(API, {
      method: "POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(burgerData)
    })
    .then(res => res.json())
    .then(console.log)
    // console.log(burgerData);
  })

  function makeBurgerDiv(burger){
    let burgerDiv = document.createElement("div")
    burgerDiv.classList.add("burger")
    burgerDiv.setAttribute("data-id", burger.id)
    burgerDiv.innerHTML = `
    <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">
        ${burger.description}
      </p>
      <button class="button">Add to Order</button>
    `
    return burgerDiv
    // burgerDiv.setAttribute("class", "burger")
    // burgerDiv.className = "burger"
  }


  function makeBurgerLi(name){
    let burgerLi = document.createElement("li")
    burgerLi.innerHTML = name
    return burgerLi
  }









})
