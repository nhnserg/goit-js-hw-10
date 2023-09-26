import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bkdHgm9d6C6nWmkyDUdboOmGIhoyIfpwcJCCFopNsyVyw18dVssROtkl8fY6DZJe';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/vi/breeds')
    .then(response => response.date)
    .catch(error => {
      throw error;
    });

  export function fetchCatByBreeds(breedId) {
    return axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => response.data[0])
      .catch(error => {
        throw error;
      });
  }
}
