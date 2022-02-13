const btn = document.querySelector('button');
console.log(btn);

btn.addEventListener('click', function (fetchCallback) {
    const input = document.querySelector('input');
    console.log(input.value);

    clearErrors();    

    //tar bort bilden efter sidan har uppdaterats
    clearImages();

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${input.value}&format=json&nojsoncallback=1&per_page=1&page=1`
    console.log(url);

    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Something went wrong, please try again :(';
            }
        }
    ).then(
        function (data) {
            console.log(data);

            //Vi hämtar första bilden
            getImageUrl(data.photos.photo[0]);
        }
    ).catch(
        function () {
            const p = document.createElement('p');
            p.innerText = 'The picture could not be found in Flickr, please try again!';
            document.body.append(p);
        }
    )

})

function fetchCallback(response) {
    return response.json();
}
//Lägg till din egna KEY
const KEY = '26c72b1be7839b165f1d4370d6a5dd35';
let searchText = 'input.value';
console.log(searchText);

//Vi söker endast på 1foto per sida och 1 sida
const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;


//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject) {
    let photo = photoObject;
    let size = 'm';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url) {
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

function showImgcallback(data) {
    const img = document.createElement('img');
    img.src = data.message;
    document.body.append(img);
}

function clearImages() {
    const images = document.querySelectorAll('img');

    for (const img of images) {
        img.remove();
    }
}

function clearErrors(){
    const error = document.querySelectorAll('p');
    for(const text of error){
        text.remove();
    }
}