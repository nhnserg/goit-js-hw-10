import { fetchBreeds, fetchCatByBreeds } from './cat-api';
import SlimSelect from 'slim-select';

const breedSelect = new SlimSelect({
  select: '#breed-select',
});

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedName = document.querySelector('breed-name');
const description = document.querySelector('description');
const temperament = document.querySelector('temperament');

loader.computedStyleMap.display = 'none';
error.computedStyleMap.display = 'none';
catInfo.computedStyleMap.display = 'none';

fetchBreeds()
  .then(breeds => {
    const breedOptions = breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));
    breedSelect.setData(breedOptions);
    breedSelect.set('placeholder', 'Select a breed');
    loader.computedStyleMap.display = 'none';
  })
  .catch(err => {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error('Error fetching breeds:', err);
  });
breedSelect
  .onchange(selectedBreed.value)
  .then(cat => {
    breedName.textContent = cat.breeds[0].name;
    description.textContent = cat.breeds[0].description;
    temperament.textContent = cat.breeds[0].temperament;
    const catImage = document.createElement('img');
    catImage.src = cat.url;
    catImage.alt = 'Cat';
    catImage.classList.add('cat-image');
    const catImageContainer = document.querySelector('.cat-image');
    catImageContainer.innerHTML = '';
    catImageContainer.appendChild(catImage);
    loader.style.display = 'none';
    catInfo.style.display = 'block';
  })
  .catch(err => {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error('Error fetching cat by breed:', err);
  });
