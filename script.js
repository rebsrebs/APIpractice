const searchForm = document.getElementById('searchform');
const searchInput = document.getElementById('searchbar');
const searchSubmitBtn = document.getElementById('searchsubmit');
const searchBarError = document.getElementById('searchbarerror');
const img = document.getElementById('imgGIF');
const showMeBtn = document.getElementById('showmebtn');
let currentKeyword;


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// function to show a GIF in the img element using a keyword
const showGIF = function(keyword) {
  console.log(`showGIF function is running and the currentKeyword is ${keyword}.`);
  const index = getRandomInt(9);
  console.log(`index is ${index}`);

// fetch gifs using translate endpoint - this works
  // fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&s=${keyword}`, {mode: 'cors'})
  
  // not able to get the search endpoint to work yet
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&q=${keyword}&limit=9&offset=0&rating=g&lang=en`, {mode: 'cors'})
.then(function(response) {
    return response.json();
  })
  // set the url as the img source
  .then(function(response) {
    img.src = response.data[index].images.fixed_height.url;
    console.log(img.src);
  })
  .catch(function(err) {
    console.log(err);
    searchBarError.textContent = 'Not found. Please try another search term.';
  });
}



// function to update text of show me more button
const updateShowMeBtnText = function(keyword) {
  showMeBtn.textContent= `Show me another ${keyword} GIF!`;
}

// When show me more GIFS button is clicked
const handleShowMeClick = function() {
  console.log(`show me more GIFS was clicked and the currentKeyword is ${currentKeyword}.`);
  showGIF(currentKeyword);
}

// When search submit button is clicked
const handleSearchSubmit = function() {
  console.log('The search submit button was clicked.');
  // set current keyword with user submitted value
  currentKeyword = searchInput.value;

  // if currentKeyword is not blank
  if (currentKeyword != '') {
    searchBarError.textContent='';
    // show GIF using current keyword
    showGIF(currentKeyword);
    // reset event listener for show me more GIFS button
    showMeBtn.removeEventListener('click', handleShowMeClick);
    showMeBtn.addEventListener('click', handleShowMeClick);
    // update text of show me more GIFS button with current keyword
    updateShowMeBtnText(currentKeyword);
    // reset search form
    searchForm.reset();
  } else {
    searchBarError.textContent = "Search cannot be blank!";
  }
}

const searchInputHandler = function() {
  currentKeyword = searchInput.value;
  if (currentKeyword != '') {
    searchBarError.textContent='';
  }
}







searchInput.addEventListener('input',searchInputHandler);

searchInput.addEventListener('keypress',function(e){
  if (e.key === 'Enter'){
    e.preventDefault();
    console.log('enter was pressed');
    handleSearchSubmit();
    }
});





// Add event listener to search submit button
searchSubmitBtn.addEventListener('click', handleSearchSubmit);

// when page loads
const bodyOnloadFunction = function() {
  console.log('Page loaded.');
  currentKeyword = 'cats';
  showGIF(currentKeyword);
  updateShowMeBtnText(currentKeyword);
  showMeBtn.addEventListener('click', handleShowMeClick);
}

window.onload = bodyOnloadFunction();
