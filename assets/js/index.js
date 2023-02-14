


document.getElementById("location").style.display = 'none'
document.getElementById("loading-bg").style.display = 'none'

var animal;
var type;

// Choosing a cat
$('#catbutton').on("click", function (e) {
  document.getElementById("location").style.display = 'block';
  animal = 'cat';
  document.getElementById("type").innerHTML = animal
  localStorage.clear('preference')
  localStorage.setItem('preference', animal)
});

// Choosing a dog
$('#dogbutton').on("click", function (e) {
  document.getElementById("location").style.display = 'block';
  animal = 'dog';
  document.getElementById("type").innerHTML = animal
  localStorage.clear('preference')
  localStorage.setItem('preference', animal)
});

// Choosing a pet
$('#petbutton').on("click", function (e) {
  document.getElementById("location").style.display = 'block';
  document.getElementById("type").innerHTML = 'pet'
  animal = '';
  localStorage.clear('preference')
  localStorage.setItem('preference', animal)
});




//modal code

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});


//location search

$('#search').on("click", function (e) {
  let destination = document.getElementById("place").value;
  if (destination === null || destination === ''){
    alert("Please enter a city.")
    return false;
  }else{
  let range = document.getElementById("distance").value;
  localStorage.clear('preference')
  localStorage.setItem('preference', animal)
  document.getElementById("type").value = animal
  scooby();  
  let map = {"location": destination, "distance": range}
  localStorage.setItem('places', JSON.stringify(map))
  initMap();
  document.getElementById("boop-bg").style.display = 'none'
  document.getElementById("loading-bg").style.display = 'block'
  fillProgress();
  }
  


})



//scooby snack
function scooby() {
  let $items = $('#type, #place, #distance')
  var obj = {}
  $items.each(function () {
    obj[this.id] = $(this).val()
  })
  localStorage.setItem('find', JSON.stringify(obj))
  console.log(JSON.stringify(obj, null, ' '))
}

var progressArr = [1, 2, 3, 4, 5, 10, 15, 30, 60, 90, 100];
function fillProgress() {

  progressArr.forEach(function (num, index) {

    setTimeout(function () {

      $('#waitroom').val(num);
      if ($('#waitroom').val() == 100) {     
        window.location.href="browse.html";
      }
    }, 250 * index);

  });

}


let data = ''; 
function initMap(){
console.log('Google Places API loaded.')
let google = JSON.parse(localStorage.getItem('places'))
let place = google.location
key = 'AIzaSyCTQVOisLUpvEpoW30CiZlKlPdNMUiX8J4'

fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${key}`,{
    method: 'GET',
}).then((response) => {
  return response.json()
}).then((response) => {
  console.log(response)
  let latitude = response.results[0].geometry.location.lat;
  let longitude = response.results[0].geometry.location.lng;
  console.log(latitude)
  console.log(longitude)
  let lc = {"lat": latitude, "long": longitude}
  console.log(lc)
  coordinates = localStorage.setItem('loc', JSON.stringify(lc))
})
}



var ID = 'ZIryHn5E8xyhG6vho1rYGCV4W2tB55s4FihvxbhGmXGvSDer4N'
var secret = 'ZEKvuaftgTQ2Niug84aBdxp97YzvpjaUnmOAXTm0'
var token;

var pet0 = $('#pic-1')
var pet1 = $('#pic-2')
var pet2 = $('#pic-3')

fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${ID}&client_secret=${secret}`
}).then((response) => {
    return response.json()
}).then((response) => {
    console.log(response)
    token = response.access_token    
    //change query parameters here
    fetch(`https://api.petfinder.com/v2/animals?type=`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {        
        return response.json()
    }).then((data) => {
        console.log(data.animals)  
        function replacePlaceholder() {
          for (let i=0; i<3, i++;){
          if (data.animals[i].photos.length === 0 ){
              `pet${i}.attr('src', "./assets/imgs/placeholder.jpg")`
          }
          else if (data.animals[i].photos[0].full) {
              `pet${i}.attr('src', data.animals[i].photos[0].full)`              
          }
          }
        document.getElementById('desc-1').innerHTML = data.animals[0].description;      
        document.getElementById('desc-2').innerHTML = data.animals[1].description;      
        document.getElementById('desc-3').innerHTML = data.animals[2].description;
        }     
    })
  })

//pictures









//Carousel Code

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("item-slide");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}


//end 