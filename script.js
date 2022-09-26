const searchForm = document.getElementById('searchform');
const searchInput = document.getElementById('searchbar');
const searchSubmitBtn = document.getElementById('searchsubmit');
const searchBarError = document.getElementById('searchbarerror');
const img = document.getElementById('imgGIF');
const showMeAnotherBtn = document.getElementById('showmeanotherbtn');
let currentKeyword;
let oldKeyword;
let whichButton = '';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Function to update text of showMeAnother button
const updateShowMeAnotherBtnText = function(keyword) {
  showMeAnotherBtn.textContent= `Show me another ${keyword} GIF!`;
}

// NEW Function to show a GIF in the img element using a keyword
const showGIF = function(keyword) {
  // generate random index (0-8)
  const index = getRandomInt(9);
  // search GIPHY with keyword

  async function getGIFs() {
    try {
      const response = await   fetch(`https://api.giphy.com/v1/gifs/search?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&q=${keyword}&limit=9&offset=0&rating=g&lang=en`, {mode: 'cors'});
      const gifData = await response.json();
      img.src = gifData.data[index].images.fixed_height.url;
      if (whichButton === 'searchbtn') {
        console.log('this is happening')
        showMeAnotherBtn.removeEventListener('click', handleShowMeAnotherClick);
        showMeAnotherBtn.addEventListener('click', handleShowMeAnotherClick);
        updateShowMeAnotherBtnText(keyword);
        whichButton = '';
      }
    } catch (err) {
      console.log(err);
    searchBarError.textContent = 'Not found. Please try another search term.';
    console.log(`oldKeyword was ${oldKeyword}`);
    currentKeyword = oldKeyword;
    }
  }
  getGIFs();
}
// End NEW function showGIF

// OLD version using promises
// Function to show a GIF in the img element using a keyword
// const showGIFold = function(keyword) {
//   // generate random index (0-8)
//   const index = getRandomInt(9);
//   // search GIPHY with keyword
//   fetch(`https://api.giphy.com/v1/gifs/search?api_key=dNW6NhV3umI5BEbDAYmtZDp44FPquBSg&q=${keyword}&limit=9&offset=0&rating=g&lang=en`, {mode: 'cors'})
//   .then(function(response) {
//     return response.json();
//   })
//   // set the URL as the img source
//   .then(function(response) {
//     img.src = response.data[index].images.fixed_height.url;
//     console.log(img.src);
//     console.log(whichButton);
//     if (whichButton === 'searchbtn') {
//       console.log('this is happening')
//       showMeAnotherBtn.removeEventListener('click', handleShowMeAnotherClick);
//       showMeAnotherBtn.addEventListener('click', handleShowMeAnotherClick);
//       updateShowMeAnotherBtnText(keyword);
//       whichButton = '';
//     }
//   })
//   .catch(function(err) {
//     console.log(err);
//     searchBarError.textContent = 'Not found. Please try another search term.';
//     console.log(`oldKeyword was ${oldKeyword}`);
//     currentKeyword = oldKeyword;
//   });
// }
// End function showGIF

// When showMeAnother button is clicked
const handleShowMeAnotherClick = function() {
  // whichButton = 'anotherbtn';
  console.log(`ShowMeAnother button was clicked and the currentKeyword is ${currentKeyword}.`);
  showGIF(currentKeyword);
  searchBarError.textContent = '';
}

// When search submit button is clicked
const handleSearchSubmit = function() {
  whichButton = 'searchbtn';
  console.log('The search submit button was clicked.');
  // save previous keyword in case this search doesn't work out
  // this must happen first:
  console.log(`oldKeyword will now become ${currentKeyword}`);
  oldKeyword = currentKeyword;
  // set current keyword with user submitted value
  console.log(`currentKeyword will now become ${searchInput.value}`);
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
    let inputSoFar = searchInput.value;
  if (inputSoFar != '') {
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
  updateShowMeAnotherBtnText(currentKeyword);
  showMeAnotherBtn.addEventListener('click', handleShowMeAnotherClick);
}

window.onload = bodyOnloadFunction();
