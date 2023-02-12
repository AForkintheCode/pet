let index = localStorage.getItem('find')
let data =JSON.parse(index)
console.log(data)
let miles = data.distance;
let place = data.location;
let pet = data.type;

var ID = 'ZIryHn5E8xyhG6vho1rYGCV4W2tB55s4FihvxbhGmXGvSDer4N'
var secret = 'ZEKvuaftgTQ2Niug84aBdxp97YzvpjaUnmOAXTm0'
var token;

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
    fetch(`https://api.petfinder.com/v2/animals?type=${pet}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {        
        return response.json()
    }).then((data) => {
        console.log(data.animals)        
       
        for (let i=0; i <= 14; i++){               
        let name = data.animals[i].name;
        let breed = data.animals[i].breeds.primary;
        let age = data.animals[i].age;
        let gender = data.animals[i].gender;   
        let pictureEl = $(`#pic-${i}`)
        function replacePicture(data){
            if (data.animals[i].photos.length === 0 ){
                pictureEl.attr('src', "./assets/imgs/placeholderimg.jpg")
            }
            else if (data.animals[i].photos[0].full) {
                pictureEl.attr('src', data.animals[i].photos[0].full);
                console.log(data.animals[i].photos[0].full)
            }  
            }; 
        replacePicture(data);  
        document.getElementById(`name-${i}`).innerHTML = name;
        document.getElementById(`breed-${i}`).innerHTML = breed;
        document.getElementById(`age-${i}`).innerHTML = age;
        document.getElementById(`gender-${i}`).innerHTML = gender;
        localStorage.setItem('pet',JSON.stringify())
        }
       
    
    })
})




