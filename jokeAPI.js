const joke_endpoint_url = "https://witzapi.de/";

// https://witzapi.de/api/category
export async function getJokeCategory() {
  const response = await fetch(`${joke_endpoint_url}api/category/`, {
    method: "GET",
  });
  const body = await response.json();

  return body;
}

// https://witzapi.de/api/joke
export async function getRandomJoke() {
  const response = await fetch(`${joke_endpoint_url}api/joke/`, {
    method: "GET",
  });
  const body = await response.json();

  return body;
}

// https://witzapi.de/api/joke/?category=blondinenwitze
export async function getJokeWithCategory(parameter) {
  const response = await fetch(`${joke_endpoint_url}api/joke/?category=${parameter.category}`, {
    method: "GET",
  });
  const body = await response.json();

  return body;
}
