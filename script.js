const showMeBtn = document.getElementById('showmebtn');
const img = document.querySelector('img');

const showGIF = function(userSearchTerm) {
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&s=${userSearchTerm}`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    img.src = response.data.images.original.url;
  });
}

showGIF('cats');

showMeBtn.addEventListener('click',function(){
  showGIF('cats');
})

const updateShowMeBtnText = function() {
  const searchTerm = 'cute cats';
  showMeBtn.textContent= `Show me another ${searchTerm} GIF!`;
}