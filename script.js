const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function getWord() {
  const wordS = document.getElementById("getword").value;
  const sField = document.getElementById("getword");
  const meaning = document.getElementById("meaning");
  const tittle = document.getElementById("tittle");
  const textEmpty = document.getElementById("txt-empty");

  meaning.innerHTML = "";

  sField.classList.remove("input-empty");
  textEmpty.classList.add("remove");
  tittle.classList.remove("remove");

  if (!wordS) {
    sField.classList.add("input-empty");
    textEmpty.classList.remove("remove");
    tittle.classList.add("remove");
    return;
  }

  try {
    const response = await fetch(url + wordS);
    const dataA = await response.json();
    const data = dataA[0];
    const word = data.word;
    const pron = data.phonetics[0].text;

    const meaningL = data.meanings.length;

    console.log(data);

    for (let x = 0; x < meaningL; x++) {
      let me = data.meanings[x].partOfSpeech;

      let newDiv = document.createElement("div");
      newDiv.classList.add("mea");

      let newH3 = document.createElement("h3");
      newH3.innerHTML = me;

      let newSpan = document.createElement("span");
      newSpan.classList.add("line-meaning");

      let meaningTitle = document.createElement("h4");
      meaningTitle.classList.add("meaning-title");
      meaningTitle.innerHTML = "Meaning";

      newDiv.appendChild(newH3);
      newDiv.appendChild(newSpan);
      meaning.appendChild(newDiv);
      meaning.appendChild(meaningTitle);

      var defL = data.meanings[x].definitions.length;

      let fistTime = true;

      for (var j = 0; j < defL; j++) {
        let def = data.meanings[x].definitions[j].definition;
        if (fistTime) {
          let newUl = document.createElement("ul");
          newUl.classList.add("list-definition");
          newUl.classList.add("padding");
          newUl.setAttribute("id", `meaning${x}`);
          meaning.appendChild(newUl);
        }

        let myUl = document.getElementById("meaning" + x);
        let newLi = document.createElement("li");
        newLi.innerHTML = def;
        myUl.appendChild(newLi);

        fistTime = false;
      }
    }

    document.getElementById("word").textContent = word;
    document.getElementById("pron").textContent = pron;

    meaning.classList.remove("remove");
  } catch (err) {
    console.log(err);
  }
}

//Change theme

const toggleButton = document.getElementById("toggle-button");
const element = document.querySelector("body");

// Set initial state
var isToggled = false;

// Add a click event listener to the button
toggleButton.addEventListener("click", function () {
  // Update the background color of the element

  if (isToggled) {
    isToggled = false;
    element.style.backgroundColor = "white";

    const h1Elements = document.querySelectorAll("h1, h3, li, p");
    h1Elements.forEach(function (element) {
      element.classList.remove("black");
    });
  } else {
    isToggled = true;
    element.style.backgroundColor = "var(--back-1)";

    const h1Elements = document.querySelectorAll("h1, h3, li, p");
    h1Elements.forEach(function (element) {
      element.classList.add("black");
    });
  }
});
