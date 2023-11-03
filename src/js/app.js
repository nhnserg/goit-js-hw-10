import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'; // Додайте імпорт SlimSelect

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  // Ініціалізуйте SlimSelect
  const slim = new SlimSelect({
    select: breedSelect,
    placeholder: 'Виберіть породу', // Опціонально: налаштування заповнювача
  });

  function populateBreedSelect() {
    fetchBreeds()
      .then(breeds => {
        const options = breeds.map(breed => {
          return {
            value: breed.id,
            text: breed.name,
          }}
        });
        slim.setData(options); // Встановіть дані для SlimSelect
      })
      .catch(() => {
        error.classList.add('show');
      });
  }

  function updateCatInfo(selectedBreedId) {
    catInfo.style.display = 'none';
    loader.style.display = 'block';

    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        if (catData.length > 0) {
          const [cat] = catData;
          catInfo.innerHTML = `
            <h2>${cat.breeds[0].name}</h2>
            <p><strong>Опис:</strong> ${cat.breeds[0].description}</p>
            <p><strong>Темперамент:</strong> ${cat.breeds[0].temperament}</p>
            <img src="${cat.url}" alt="${cat.breeds[0].name}" />
          `;
          catInfo.style.display = 'block';
        } else {
          // Відобразити повідомлення про помилку, якщо немає даних про кота
          error.classList.add('show');
        }
      })
      .catch(() => {
        error.classList.add('show');
        catInfo.style.display = 'none';
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  }

  populateBreedSelect();

  // Використовуйте подію onChange SlimSelect для обробки змін вибору породи
  slim.onChange(selectedBreedId => {
    updateCatInfo(selectedBreedId);
  });
});

// import { fetchBreeds, fetchCatByBreed } from './cat-api';

// document.addEventListener('DOMContentLoaded', () => {
//   const breedSelect = document.querySelector('.breed-select');
//   const loader = document.querySelector('.loader');
//   const error = document.querySelector('.error');
//   const catInfo = document.querySelector('.cat-info');

//   function populateBreedSelect() {
//     fetchBreeds()
//       .then(breeds => {
//         const options = breeds.map(breed => {
//           const option = document.createElement('option');
//           option.value = breed.id;
//           option.text = breed.name;
//           return option;
//         });
//         breedSelect.append(...options);
//       })
//       .catch(() => {
//         error.classList.add('show');
//       });
//   }

//   function updateCatInfo(selectedBreedId) {
//     catInfo.style.display = 'none';
//     loader.style.display = 'block';

//     fetchCatByBreed(selectedBreedId)
//       .then(catData => {
//         const [cat] = catData;
//         catInfo.innerHTML = `
//           <h2>${cat.breeds[0].name}</h2>
//           <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
//           <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
//           <img src="${cat.url}" alt="${cat.breeds[0].name}" />
//         `;
//         catInfo.style.display = 'block';
//       })
//       .catch(() => {
//         error.classList.add('show');
//         catInfo.style.display = 'none';
//       })
//       .finally(() => {
//         loader.style.display = 'none';
//       });
//   }

//   populateBreedSelect();

//   breedSelect.addEventListener('change', () => {
//     const selectedBreedId = breedSelect.value;
//     updateCatInfo(selectedBreedId);
//   });
// });

// import { fetchBreeds, fetchCatByBreed } from './cat-api';

// document.addEventListener('DOMContentLoaded', () => {
//   const breedSelect = document.querySelector('.breed-select');
//   const loader = document.querySelector('.loader');
//   const error = document.querySelector('.error');
//   const catInfo = document.querySelector('.cat-info');

//   fetchBreeds()
//     .then(breeds => {
//       const options = breeds.map(breed => {
//         const option = document.createElement('option');
//         option.value = breed.id;
//         option.text = breed.name;
//         return option;
//       });
//       breedSelect.append(...options);
//     })
//     .catch(() => {
//       error.classList.add('show');
//     });

//   breedSelect.addEventListener('change', () => {
//     const selectedBreedId = breedSelect.value;

//     catInfo.style.display = 'none';
//     loader.style.display = 'block';

//     fetchCatByBreed(selectedBreedId)
//       .then(catData => {
//         const [cat] = catData;
//         catInfo.innerHTML = `
//           <h2>${cat.breeds[0].name}</h2>
//           <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
//           <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
//           <img src="${cat.url}" alt="${cat.breeds[0].name}" />
//         `;
//         catInfo.style.display = 'block';
//       })
//       .catch(() => {
//         error.classList.add('show');
//         catInfo.style.display = 'none';
//       })
//       .finally(() => {
//         loader.style.display = 'none';
//       });
//   });
// });
