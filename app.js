let listOfMovies = [];

//querying for DOM elements

const openAddMovieModalBtn = document.getElementById("add_movie_ext_btn");
const addMovieModal = document.getElementById("add_movie_modal");
const noMovieHeading = document.getElementById("no_movies_wrap");
const cancleAddingNewMovie = document.getElementById("cancle_add_btn");
const addNewMovieBtn = document.getElementById("add_movie_int");
const formOfAddingMovie = document.getElementById("add_movie_form");
const allFormInputsAddMovie = formOfAddingMovie.getElementsByTagName("input");
const mainSection = document.getElementById("main_section");
const wrapOfMovieBoxDiv = document.getElementById("movie_box_wrap");
const editMovieModal = document.getElementById("edit_movie_modal");
const editMovieForm = document.getElementById("edit_movie_form");
const allFormInputsEditMovie = editMovieForm.getElementsByTagName("input");
const deleteMovieBtn = document.getElementById("");
let doneEditingBtn = document.getElementById("edit_movie_int");
const cancleEditingBtn = document.getElementById("cancle_edit_add_btn");
const listOfInputsInEditMovie = editMovieForm.getElementsByTagName("input");

//creating callbacks

const addMovieModalBtnHandler = () => {
  if (addMovieModal.classList.contains("not_visibale")) {
    addMovieModal.classList.toggle("not_visibale");
  }
  if (listOfMovies.length == 0) {
    noMovieHeading.classList.toggle("not_visibale");
  } else {
    toggleMoviesVisibilityAddMovieExternalHandler();
  }
};

const addNewMovieBtnHandler = () => {
  if (verifyData(allFormInputsAddMovie)) {
    const movieObject = createMovieObject(allFormInputsAddMovie);
    renderNewMovie(movieObject);
  }
  toggleMoviesVisibilityAddMovieInternalHandler();
};

const cancleAddingMovieBtnHandler = () => {
  if (!addMovieModal.classList.contains("not_visibale")) {
    addMovieModal.classList.toggle("not_visibale");
  }
  if (listOfMovies.length == 0) {
    noMovieHeading.classList.toggle("not_visibale");
  } else {
    toggleMoviesVisibilityCancleMovieModalHandler();
  }
};

const cancleEditingBtnHandler = () => {
  if (!editMovieModal.classList.contains("not_visibale")) {
    editMovieModal.classList.toggle("not_visibale");
  }

  for (movie of listOfMovies) {
    if (movie.refForDomElem.classList.contains("not_visibale")) {
      movie.refForDomElem.classList.toggle("not_visibale");
    }
  }
};

const deleteMovieBoxHandler = (movieObject) => {
  for (movie of listOfMovies) {
    if (movie.id === movieObject.id) {
      movie.refForDomElem.remove();
      listOfMovies.splice(listOfMovies.indexOf(movie), 1);
    }
  }
  if (listOfMovies.length === 0) {
    noMovieHeading.classList.toggle("not_visibale");
  }
};

const editMovieBoxHandler = (movieObject) => {
  listOfInputsInEditMovie[0].value = movieObject.name;
  listOfInputsInEditMovie[1].value = movieObject.image;
  listOfInputsInEditMovie[2].value = movieObject.rating;
  editMovieModal.classList.toggle("not_visibale");
  for (movie of listOfMovies) {
    if (!movie.refForDomElem.classList.contains("not_visibale")) {
      movie.refForDomElem.classList.toggle("not_visibale");
    }
  }
  const editMovieBindedHandler = editMovieHandler.bind(this, movieObject);
  doneEditingBtn.addEventListener("click", editMovieBindedHandler);
};

const editMovieHandler = (movieObject) => {
  if (verifyData(allFormInputsEditMovie)) {
    allPElemInMovieBox = movieObject.refForDomElem.getElementsByTagName("p");
    movieImg = movieObject.refForDomElem.getElementsByClassName(
      "movie_box_img"
    );

    if (allFormInputsEditMovie[0].value !== movieObject.name) {
      movieObject.name = allFormInputsEditMovie[0].value;
      allPElemInMovieBox[0].innerText = `Name: ${capitalizeEveryFirstLetter(
        movieObject.name
      )}`;
    }
    if (allFormInputsEditMovie[1].value !== movieObject.img) {
      movieObject.image = allFormInputsEditMovie[1].value;
      movieImg[0].src = movieObject.image;
    }
    if (allFormInputsEditMovie[2].value !== movieObject.rating) {
      movieObject.rating = allFormInputsEditMovie[2].value;
      allPElemInMovieBox[1].innerText = `Rating: ${movieObject.rating}`;
    }
    editMovieModal.classList.toggle("not_visibale");
    for (movie of listOfMovies) {
      if (movie.refForDomElem.classList.contains("not_visibale")) {
        movie.refForDomElem.classList.toggle("not_visibale");
      }
    }
    doneEditingBtn = doneEditingBtn.cloneNode(true);
  }
};

//helping functions

const verifyData = (allFormInputs) => {
  if (
    allFormInputs[0].value.trim() === "" ||
    allFormInputs[0].value.trim() == "Enter Movies Name"
  ) {
    alert("Movies Name Enterd Is Not Valid - Has To Be Non Empty String");
    return false;
  }
  if (allFormInputs[1].value.trim() === "") {
    alert("Image URL OR Path Is Not Valid");
    return false;
  }
  if (
    allFormInputs[2].value.trim() === "" ||
    isNaN(parseInt(allFormInputs[2].value.trim())) ||
    parseInt(allFormInputs[2].value.trim()) > 10 ||
    parseInt(allFormInputs[2].value.trim()) < 0
  ) {
    alert(
      "The Rating Of The Movie Is Not Valid - Rating Has to Be A Numbers Between 1 to 10"
    );
    console.log(allFormInputs[2].value);
    return false;
  }
  return true;
};

const renderNewMovie = (movieObject) => {
  let newMovieElem = document.createElement("div");
  newMovieElem.className = "box_for_movie";
  let newImage = document.createElement("img");
  newImage.className = "movie_box_img";
  newImage.alt = movieObject.name;
  newImage.src = movieObject.image;
  newMovieElem.appendChild(newImage);

  let newDivForText = document.createElement("div");
  newDivForText.className = "";
  newDivForText.id = "text_wrap";
  newMovieElem.appendChild(newDivForText);

  let newTextNameElem = document.createElement("p");
  newTextNameElem.innerText = `Name: ${movieObject.name}`;
  newTextNameElem.className = "text_for_movie_box";
  newDivForText.appendChild(newTextNameElem);

  let newTextRatingElem = newTextNameElem.cloneNode(true);
  newTextRatingElem.innerText = `Rating: ${movieObject.rating}`;
  newTextNameElem.className = "text_for_movie_box";
  newDivForText.appendChild(newTextRatingElem);

  let newWrapDivForBtn = document.createElement("div");
  newWrapDivForBtn.id = "btn_wrap";
  newMovieElem.appendChild(newWrapDivForBtn);

  let newEditMovieButton = document.createElement("button");
  newEditMovieButton.className = "btn";
  newEditMovieButton.id = "edit_movie_btn";
  newEditMovieButton.innerText = "Edit Movie";
  newWrapDivForBtn.appendChild(newEditMovieButton);

  let newDeleteMovieButton = document.createElement("button");
  newDeleteMovieButton.className = "btn";
  newDeleteMovieButton.id = "delete_movie_btn";
  newDeleteMovieButton.innerText = "Delete Movie";
  newWrapDivForBtn.appendChild(newDeleteMovieButton);

  movieObject.refForDomElem = newMovieElem;
  listOfMovies.push(movieObject);

  const editFuncBindedHandler = editMovieBoxHandler.bind(this, movieObject);
  const deleteFuncBindedHandler = deleteMovieBoxHandler.bind(this, movieObject);
  newEditMovieButton.addEventListener("click", editFuncBindedHandler);
  newDeleteMovieButton.addEventListener("click", deleteFuncBindedHandler);

  addMovieModal.classList.toggle("not_visibale");
  wrapOfMovieBoxDiv.appendChild(newMovieElem);
};

const createMovieObject = (allFormInputs) => {
  const movieName = capitalizeEveryFirstLetter(allFormInputs[0].value.trim());
  const moviesImage = allFormInputs[1].value.trim();
  const movieRating = allFormInputs[2].value.trim();
  const movieId = createRandId();
  return {
    id: movieId,
    name: movieName,
    image: moviesImage,
    rating: movieRating,
  };
};

const capitalizeEveryFirstLetter = (s) => {
  if (typeof s !== "string") return "";
  str = s.split(" ");
  strToRet = "";
  for (word of str) {
    strToRet += word.charAt(0).toUpperCase() + word.slice(1);
    if (str.indexOf(word) !== str.length - 1) {
      strToRet += " ";
    }
  }
  return strToRet;
};

const createRandId = () => Math.floor(Math.random() * 500 + 1);

const toggleMoviesVisibilityAddMovieExternalHandler = () => {
  allMovies = wrapOfMovieBoxDiv.children;
  if (wrapOfMovieBoxDiv.classList.contains("not_visibale")) {
    for (movie of allMovies) {
      movie.classList.toggle("not_visibale");
      for (childElem of movie.children) {
        childElem.classList.toggle("not_visibale");
      }
    }
  }
};

const toggleMoviesVisibilityAddMovieInternalHandler = () => {
  allMovies = wrapOfMovieBoxDiv.children;
  for (movie of allMovies) {
    if (movie.classList.contains("not_visibale")) {
      movie.classList.toggle("not_visibale");
      for (childElem of movie.children) {
        childElem.classList.toggle("not_visibale");
      }
    }
  }
};

const toggleMoviesVisibilityCancleMovieModalHandler = () => {
  allMovies = wrapOfMovieBoxDiv.children;
  for (movie of allMovies) {
    movie.classList.toggle("not_visibale");
    for (childElem of movie.children) {
      childElem.classList.toggle("not_visibale");
    }
  }
};

//setting listeners
openAddMovieModalBtn.addEventListener("click", addMovieModalBtnHandler);
cancleAddingNewMovie.addEventListener("click", cancleAddingMovieBtnHandler);
addNewMovieBtn.addEventListener("click", addNewMovieBtnHandler);
cancleEditingBtn.addEventListener("click", cancleEditingBtnHandler);
