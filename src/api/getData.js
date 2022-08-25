export const request = (url) => fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}-${response.statusText}`);
    }

    return response.json();
  });

export const getJoke = () => request(`https://api.chucknorris.io/jokes/random`);
