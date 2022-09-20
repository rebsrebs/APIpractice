const showMeBtn = document.getElementById('showmebtn');
const img = document.querySelector('img');
const searchSubmitBtn = document.getElementById('searchsubmit');
const searchInput = document.getElementById('searchbar');
const searchForm = document.getElementById('searchform');

// function to show a GIF in the img element using a search term
const showGIF = function(searchTerm) {
  // fetch gifs with that search term
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&s=${searchTerm}`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  // set the url as the img source
  .then(function(response) {
    img.src = response.data.images.original.url;
  });
}

// function to add event listener to show me more gifs button
const updateSMBEL = function(searchTerm){
  console.log('updateSMBEL is running');
  // add event listener to show me more gifs button
  showMeBtn.addEventListener('click',function(){
    console.log(`showMeMoreGifs button was clicked and will show GIFS of ${searchTerm}`);
    showGIF(searchTerm);
  });
}

// function to update show me more with search term
const updateShowMeBtnText = function(searchTerm) {
  showMeBtn.textContent= `Show me another ${searchTerm} GIF!`;
}

// WHEN SEARCH SUBMIT BUTTON IS CLICKED
searchSubmitBtn.addEventListener('click',function(){
  console.log('The search submit button was clicked.');
  // get search input value
  const userSearchTerm = searchInput.value;
  console.log(`Just before showGIF userSearchTerm is ${userSearchTerm}`);
  // show GIF based on user search term
  showGIF(userSearchTerm);
  // update text of show me more GIFS button
  console.log(`Just before updateShowMeBtnText userSearchTerm is ${userSearchTerm}`);
  updateShowMeBtnText(userSearchTerm);
  // remove event listener from show me more GIFS button
  console.log(`Just before removeEventListener userSearchTerm is ${userSearchTerm}`);
  showMeBtn.removeEventListener('click', updateSMBEL);
  // put a new events listener on the show me more GIFS button
  console.log(`Just before updateSMBEL userSearchTerm is ${userSearchTerm}`);
  updateSMBEL(userSearchTerm);
  // reset search form
  searchForm.reset();
})

// when page loads
const bodyOnloadFunction = function() {
  console.log('Page loaded.');
  // show cats GIFS
  showGIF('cats');
  // update show me more GIFS button
  updateShowMeBtnText('cats');
  updateSMBEL('cats');
}

document.onLoad = bodyOnloadFunction();



