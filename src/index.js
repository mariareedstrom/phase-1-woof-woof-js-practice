// dog pic, dog name, dog btn
// dog btn toggle goodness
// filter good dogs btn: see good dogs or all dogs in dog bar

const dogUrl = "http://localhost:3000/pups";

// fetch dogs
function fetchDogs() {
  return fetch(dogUrl).then((resp) => resp.json());
}

// render dog span and append to dog bar
function renderDogSpan(dog) {
  const dogBar = document.querySelector("#dog-bar");
  const dogSpan = document.createElement("span");

  dogSpan.id = `dog-${dog.id}`;
  dogSpan.dataset.id = dog.id;
  dogSpan.innerText = `${dog.name}`;

  // click-event to each dog span
  dogSpan.addEventListener("click", handleDogSpanClick);
  // append each dog span to dog bar
  dogBar.append(dogSpan);
}

// handler function should open dog info in div with the id of "dog-info"
function handleDogSpanClick(e) {
  // clear div
  const dogDiv = document.querySelector("#dog-info");
  dogDiv.innerHTML = "";
  // prevent default
  e.preventDefault();
  // get clicked dog
  let chosenDog = e.target;
  console.log(chosenDog);
  // get with fetch function, then display info with render function
  fetchClickedDog(chosenDog.dataset.id).then((dog) => renderDog(dog));
}

// fetch cliked dog
function fetchClickedDog(dogId) {
  return fetch(`http://localhost:3000/pups/${dogId}`).then((resp) =>
    resp.json()
  );
}

// renderDog:
function renderDog(dog) {
  const dogDiv = document.querySelector("#dog-info");
  // an img tag with the pup's image url
  // an h2 with the pup's name

  const dogImg = document.createElement("img");
  const dogName = document.createElement("h2");
  const dogStatusBtn = document.createElement("button");

  dogImg.src = dog.image;
  dogName.textContent = dog.name;

  // a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false.
  if (dog.isGoodDog === true) {
    dogStatusBtn.textContent = "Good Dog!";
  } else {
    dogStatusBtn.textContent = "Bad Dog!";
  }

  dogDiv.append(dogImg, dogName, dogStatusBtn);

  dogStatusBtn.addEventListener("click", handleGoodBad);
}

// function to toggle good bad btn
function handleGoodBad(e) {
  const dogStatusBtn = e.target;
  e.preventDefault();
  // change innerText to opposite
  if (dogStatusBtn.textContent === "Good Dog!") {
    dogStatusBtn.textContent = "Bad Dog!";
  } else {
    dogStatusBtn.textContent = "Good Dog!";
  }

  // update value to api
}

// initialize
function init() {
  fetchDogs().then((dogs) => {
    dogs.forEach(renderDogSpan);
  });
}

document.addEventListener("DOMContentLoaded", init);
