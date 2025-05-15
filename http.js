const BASE_URL = "http://localhost:5200";

export async function userSignUp(userData) {
  const response = await fetch(BASE_URL + "/user/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    let error = new Error("An error occurred with user sign up.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function userSignIn(userData) {
  const response = await fetch(BASE_URL + "/user/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    let error = new Error("An error occurred with user sign in.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const user = response.json();
  return user;
}

export async function getFavouriteMovies(userId) {
  const response = await fetch(BASE_URL + "/movies/favourites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });

  if (!response.ok) {
    let error = new Error("An error occurred while fetching favourite movies.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const movies = response.json();
  return movies;
}

export async function addMovieToFavourites(movie, userId) {
  const movieId = movie.id;
  const response = await fetch(`${BASE_URL}/movies/${movieId}/favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie, userId }),
  });

  if (!response.ok) {
    let error = new Error(
      "An error occurred while adding movie to favourites."
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function removeMovieFromFavourites(movieId, userId) {
  const response = await fetch(`${BASE_URL}/movies/${movieId}/favourite`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId, userId }),
  });

  if (!response.ok) {
    let error = new Error(
      "An error occurred while removing movie to favourites."
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
