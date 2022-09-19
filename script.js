const showMeBtn = document.getElementById('showmebtn');
const img = document.querySelector('img');
const searchSubmitBtn = document.getElementById('searchsubmit');
const searchInput = document.getElementById('searchbar');

// function to show a GIF in the img element using a search term
const showGIF = function(searchTerm) {
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&s=${searchTerm}`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    img.src = response.data.images.original.url;
  });
}

// function to update show me more with search term
const updateShowMeBtnText = function(searchTerm) {
  showMeBtn.textContent= `Show me another ${searchTerm} GIF!`;
}

// when you submit search form, get the value
// show a gif
// update the show me button
searchSubmitBtn.addEventListener('click',function(){
  const userSearchTerm = searchInput.value;
  showGIF(userSearchTerm);
  updateShowMeBtnText(userSearchTerm);
})

showGIF('cats');
updateShowMeBtnText('cats');

showMeBtn.addEventListener('click',function(){
  showGIF('cats');
})