
// const main = document.getElementById('main')

const getPhoneInfo = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;
    input.value = '';
    const error = document.getElementById('error')
    if (inputValue === '') {
        error.innerText = 'plz write a phone  name'
    }

    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
        error.innerHTML = '';
        input.value = '';
    }
}

const displayPhone = (phones) => {
    const searchResults = document.getElementById('main');
    console.log(phones.length)
    searchResults.textContent = '';
    const checking = phones.length;
    if (checking === 0) {
        alert('plz write valid phone name')
    }
    const first20Phones = phones.slice(0, 20);
    for (const phone of first20Phones) {
        console.log(phone)
        const div = document.createElement('div')
        div.className = 'col-lg-4 col-sm-12 mx-auto col-12 g-4 shadow'
        div.innerHTML = `
       <div class="card" style="width: 18rem;">
       <img src="${phone.image}" class="card-img-top p-4" alt="...">
       <div class="card-body">
         <h5 class="card-title">${phone.brand}</h5>
         <p class="card-text">${phone.phone_name}</p>
         <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
       </div>
     </div>
       `
        searchResults.appendChild(div)
    }
}

const phoneDetails = (detailsPhoneCode) => {
    const url = `https://openapi.programming-hero.com/api/phone/${detailsPhoneCode}`

    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetailsInfo(data.data))
}

const displayDetailsInfo = (phoneInfo) => {
    console.log(phoneInfo)
    const showDetailsInfo = document.getElementById("details-info")
    showDetailsInfo.textContent = '';
    const div = document.createElement('div')
    div.className = 'text-center col-lg-6'
    div.innerHTML = `
    <div>
    <div>
      <img src="${phoneInfo.image}" class="img-fluid      rounded-start" width="50%" height="75%">
    </div>
    <div>
<h4>Brand: ${phoneInfo.brand}</h4>
<h4>Name: ${phoneInfo.name}</h4>
<h4>Release Date: ${phoneInfo.releaseDate}</h4>
<h4>Storage: ${phoneInfo.mainFeatures.storage}</h4>
<h4>Display Size: ${phoneInfo.mainFeatures.displaySize}</h4>

</div>
  </div>
 
    `
    showDetailsInfo.appendChild(div)
}

