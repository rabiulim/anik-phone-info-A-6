
const main = document.getElementById('main')

const getPhoneInfo = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = (phones) => {
    for (const phone of phones) {
        console.log(phone)
        const div = document.createElement('div')
        div.className = 'col-lg-4 col-md-6'
        div.innerHTML = `
       <div class="card" style="width: 18rem;">
       <img src="${phone.image}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">Card title</h5>
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         <button href="#" class="btn btn-primary">Details</button>
       </div>
     </div>
       `
        main.appendChild(div)
    }
}