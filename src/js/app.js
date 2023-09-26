import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  // Fetch and populate breed options
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(() => {
      error.classList.add('show');
    });

  // Event listener for breed selection
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    // Hide cat info and show loader while fetching data
    catInfo.style.display = 'none';
    loader.style.display = 'block';

    // Fetch cat information by breed
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        // Display cat information
        const [cat] = catData;
        catInfo.innerHTML = `
          <h2>${cat.breeds[0].name}</h2>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
          <img src="${cat.url}" alt="${cat.breeds[0].name}" />
        `;
        catInfo.style.display = 'block';
        loader.style.display = 'none';
      })
      .catch(() => {
        error.classList.add('show');
        catInfo.style.display = 'none';
        loader.style.display = 'none';
      });
  });
});
