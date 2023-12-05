export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=1e0781086213f24831c4fc8674ea16f7&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };
