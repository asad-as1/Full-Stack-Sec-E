let inpBox = document.getElementById("in");
let button = document.getElementById("btn");
let moviesDetails = document.getElementById("movies");

button.addEventListener('click', () =>{
    let inpValue = inpBox.value;
    // console.log(inpValue);
    // console.log("Button Clicked");
    fetch(`https://imdb.iamidiotareyoutoo.com/justwatch?q=${inpValue}`)
    .then((res) =>{
        return res.json();
    }).then((data) => {
        let movies = data;
        // console.log(movies);
        movies.description.map((movie) =>{
            let imgURL = movie.photo_url[1];
            // console.log(imgURL);
            let img = document.createElement('img');
            let title = document.createElement('h2');
            title.innerText = movie.title;
            img.src = imgURL;
            img.classList.add('img');
            moviesDetails.appendChild(img);
            moviesDetails.appendChild(title);
        })
    })
})