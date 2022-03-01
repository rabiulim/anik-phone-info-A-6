
const main = document.getElementById('main')

const getPhoneInfo = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = (phones) => {
    const first20Phones = phones.slice(0, 20);
    for (const phone of first20Phones) {
        console.log(phone)
        const div = document.createElement('div')
        div.className = 'col-lg-4 col-md-6'
        div.innerHTML = `
       <div class="card" style="width: 18rem;">
       <img src="${phone.image}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">'${phone.phone_name}'</h5>
         <p class="card-text">Hey! are you interested  more info about this phone, plz click the 'Details' button.</p>
         <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
       </div>
     </div>
       `
        main.appendChild(div)
    }
}

const phoneDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=`)
        .then(res => res.json())
        .then(data => {
            const allPhone = data.data
            const singlePhone = allPhone.find(phone => phone.slug === id)
            console.log(singlePhone)
            const div = document.createElement('div')
            main.innerHTML = '';
            div.innerHTML = `
            <img  src="${singlePhone.image}" class="card-img-top" alt="...">
            `
            main.appendChild(div)
        })
}