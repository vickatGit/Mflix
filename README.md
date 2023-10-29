# Movie Database API Documentation

This documentation provides details about the Movie Database API, which is based on MongoDB's sample movie database. The API is designed to provide information about movies, comments, and related metadata. 

## Swagger Specifications
Swagger Doc : https://mflixpopcornflicks.up.railway.app/api-docs/

The API specifications are based on Swagger. The following sections outline the various endpoints and their functionalities:

### Movie Endpoints

The following endpoints are related to movie data:

- `GET /mflix/banners`: Returns the Banners
- `GET /mflix/home_page`: Returns the list of components to show on the page
- `GET /mflix/movies_page_lang/{lang}`: Returns the list of components for a specific language
- `GET /mflix/movies_page_genre/{genre}`: Returns the list of components for a specific genre
- `GET /mflix/top_rated_movies/{pageNo}/{limit}`: Returns the top-rated movies according to IMDB
- `GET /mflix/new_releases/{pageNo}/{limit}`: Returns the new movie releases
- `GET /mflix/get_movies/{pageNo}/{limit}`: Returns movies based on specified language and genre
- `GET /mflix/genres`: Returns the available genres
- `GET /mflix/languages`: Returns the available languages
- `GET /mflix/search/{pageNo}/{limit}`: Returns movies based on the specified query
- `GET /mflix/get_movie/{movieId}`: Returns the movie with the specified ID
- `DELETE /mflix/movie/{movieId}`: Deletes a movie with the specified ID
- `PATCH /mflix/movie/{movieId}`: Updates a movie with the specified ID

### Comment Endpoints

The following endpoints are related to comments:

- `GET /mflix/comments/{pageNo}/{limit}/{movieId}`: Returns comments according to the specified movie ID
- `POST /mflix/post_comment/{movieId}`: Posts a comment to a movie

### Add Movie Endpoint

- `POST /mflix/movie`: Adds a movie

## Project Structure

The project is structured as follows:

- The `MovieController` directory contains the controllers for various movie-related endpoints.
- The `MovieThumb`, `AddMovie`, `Movie`, `Comment`, `Imdb`, `Award`, `TomatoesViewer`, `TomatoesCritic`, `Tomatoes`, `PostComment`, `Header`, `Movies`, `Languages`, and `Genres` schemas define the structure of the movie-related data.


For detailed instructions on setting up the API, refer to the project documentation.

## Usage

To use the Movie Database API, you can make requests to the various endpoints listed above. Make sure to provide the required parameters and follow the provided guidelines.

