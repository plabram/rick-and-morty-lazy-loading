import "./style.css";

const characterURL = "https://rickandmortyapi.com/api/character/";
let characterElement = document.querySelector("#character-container");
let renderedCharacters = 1;
let totalCharacters = 0;

const totalCharactersFunc = async () => {
  try {
    const res = await fetch(characterURL);
    const response = await res.json();
    totalCharacters = response.info.count;
    return totalCharacters;
  } catch (err) {
    console.log("Error asking API for total characters:", err);
  }
};
totalCharacters = await totalCharactersFunc();

const characterTemplate = (name, image, species) => {
  return `<div class="character">
<h3>${name}</h3>
<img src="${image}" alt="${name}" class="character-image" />
<p>Species: ${species}</p>
</div>
`;
};

const getCharacters = async (arrayLength, arrayStart) => {
  for (let i = arrayStart; i < arrayStart + arrayLength; i++) {
    let characterName = null;
    let characterImage = null;
    let characterSpecies = null;
    try {
      const res = await fetch(characterURL + i);
      const response = await res.json();
      characterName = response.name;
      characterImage = response.image;
      characterSpecies = response.species;
      console.log(i);
      renderedCharacters++;
    } catch (err) {
      console.log("Error getting characters:", err);
    }

    const characterTemplateFilled = characterTemplate(
      characterName,
      characterImage,
      characterSpecies
    );
    characterElement.innerHTML += characterTemplateFilled;
  }
};

getCharacters(16, 1);

const onScroll = () => {
  if (
    window.scrollY > window.outerHeight &&
    renderedCharacters <= totalCharacters
  ) {
    getCharacters(6, renderedCharacters);
  }
};
window.addEventListener("scroll", onScroll);
