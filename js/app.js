
// search button works start here
const getPhoneInfo = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;
    input.value = '';
    document.getElementById("details-info").innerHTML = '';

    if (inputValue === '') {
        document.getElementById('error2').style.display = 'block'
        document.getElementById('search-results').innerHTML = '';
    }

    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
        input.value = '';
    }
}

const displayPhone = (phones) => {
    const searchResults = document.getElementById('search-results');
    console.log(phones.length)
    searchResults.textContent = '';
    const checking = phones.length;
    if (checking === 0) {
        document.getElementById('search-results').innerHTML = '';
        document.getElementById('error').style.display = 'block'
        document.getElementById('error2').style.display = 'none'
    }
    else {
        document.getElementById('error').style.display = 'none'
        document.getElementById('error2').style.display = 'none'
        const first20Phones = phones.slice(0, 20);
        for (const phone of first20Phones) {
            console.log(phone)
            const div = document.createElement('div')
            div.className = 'col-lg-4 col-sm-12 col-12 mx-auto g-4 shadow'
            div.innerHTML = `
       <div class="card mx-auto m-4" style="width: 18rem;">
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
}

// details button works start here

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
    div.className = 'col-lg-4 col-sm-12 col-12 mx-auto g-4 shadow'
    div.innerHTML = `
       <div class="card mx-auto m-4" style="width: 18rem;">
       <img src="${phoneInfo.image}" class="card-img-top p-4" alt="..."> 
       <div class="card-body text-center">
         <h5 class="card-title">Brand Name: ${phoneInfo.brand}</h5>
         <p class="fw-bold">Released Date: ${phoneInfo?.releaseDate || "No Release Date Found"
        }</p>  
         <p class="card-text">Model Name:${phoneInfo.name}</p>
         <p class="card-text">Storage: ${phoneInfo.mainFeatures.storage}</p>
         <p class="card-text">Display Size: ${phoneInfo.mainFeatures.displaySize}</p>
         <p class="card-text">Chipset: ${phoneInfo.mainFeatures.chipSet}</p>
         <p class="card-text">Slug: ${phoneInfo.slug}</p>
         <span class="card-text my-2" >Sensors: ${phoneInfo.mainFeatures.sensors
        }</span>
         <p class="card-text">Others info: WLAN; ${phoneInfo?.others?.WLAN || "Info will provide soon"},Bluetooth;${phoneInfo?.others?.Bluetooth || "Info will provide soon"} </p>
       </div>
     </div>
     `
    showDetailsInfo.appendChild(div)
}

