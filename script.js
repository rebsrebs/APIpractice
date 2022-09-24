const searchForm = document.getElementById('searchform');
const searchInput = document.getElementById('searchbar');
const searchSubmitBtn = document.getElementById('searchsubmit');
const searchBarError = document.getElementById('searchbarerror');
const img = document.getElementById('imgGIF');
const showMeBtn = document.getElementById('showmebtn');
let currentKeyword;
let whichButton = '';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Function to update text of show me more button
const updateShowMeBtnText = function(keyword) {
  showMeBtn.textContent= `Show me another ${keyword} GIF!`;
}

// Function to show a GIF in the img element using a keyword
const showGIF = function(keyword) {
  // generate random index zero through 8
  const index = getRandomInt(9);
  // search GIPHY with keyword
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&q=${keyword}&limit=9&offset=0&rating=g&lang=en`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  // set the url as the img source
  .then(function(response) {
    img.src = response.data[index].images.fixed_height.url;
    console.log(img.src);
    console.log(whichButton);
    if (whichButton === 'searchbtn') {
      showMeBtn.removeEventListener('click', handleShowMeClick);
      showMeBtn.addEventListener('click', handleShowMeClick);
      console.log(`We are about to update the show button with currentKeyword ${currentKeyword}`)
      updateShowMeBtnText(currentKeyword);
      whichButton = '';
    }
  })
  .catch(function(err) {
    console.log(err);
    searchBarError.textContent = 'Not found. Please try another search term.';
    if (whichButton === 'search') {
      showMeBtn.textContent = 'Please try a new search.'
    }
  });
}
// End function showGIF

// When show me more GIFS button is clicked
const handleShowMeClick = function() {
  // whichButton = 'morebtn';
  console.log(`show me more GIFS was clicked and the currentKeyword is ${currentKeyword}.`);
  showGIF(currentKeyword);
}

// When search submit button is clicked
const handleSearchSubmit = function() {
  whichButton = 'searchbtn';
  console.log('The search submit button was clicked.');
  // set current keyword with user submitted value
  currentKeyword = searchInput.value;
  console.log(currentKeyword);
  // if currentKeyword is not blank
  if (currentKeyword != '') {
    // remove any error messages
    searchBarError.textContent='';
    // get a GIF and show it
    showGIF(currentKeyword)
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

// If enter is pushed, don't reload page, handle the search submit
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
