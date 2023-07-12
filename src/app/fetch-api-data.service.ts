import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://indieflix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

/**
*Creating new service to load the data from API
*/
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  
/**
*  Making the API call for the user registration endpoint
* @param userDetails The user credentials
* @returns http POST request
*/
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

/**
* Making the API call for the user login endpoint
* @param userDetails The user credentials
* @returns http POST request
*/
 public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
  catchError(this.handleError)
  );
}

/**
* Making the API call for the get all movies endpoint
* @returns http GET request
*/
 getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
* Making the API call for the get one movie endpoint
* @param title The movie title
* @returns http GET request
*/
 getOneMovie(title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
/**
* Making the API call for the get one director endpoint
* @param directorName The director name
* @returns http GET request
*/
 getOneDirector(directorName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
/**
* Making the API call for the get one genre endpoint
* @param genreName The genre name
* @returns http GET request
*/
 getOneGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/genre/' + genreName, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
/**
* Making the API call for the get one user endpoint.
* @returns http GET request
*/
 getOneUser(): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
/**
* Making the API call for the get favourite movies for an user endpoint
* @returns http GET request
*/
 getFavoriteMovies(): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    map((data) => data.FavoriteMovies),
    catchError(this.handleError)
  );
}
/**
* Making the API call for the add a movie to favourite movies endpoint
* @param movieId The movie ID
* @returns http POST request
*/
 addFavoriteMovie(movieID: any): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {}, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
* Making the API call to ask if a movie is already added to favourite movies 
* @param movieId The movie ID
* @returns
*/
// isFavoriteMovie(movieId: string): boolean {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   return user.FavoriteMovies.indexOf(movieId) >= 0;
// }
isFavoriteMovie(movieId: string): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.FavoriteMovies && user.FavoriteMovies.indexOf(movieId) >= 0;
}

/**
* Making the API call for the update user endpoint
* @param updatedUser The updated user object
* @returns http PUT request
*/
 updateUser(updateUser: any): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + username, updateUser, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
* Making the API call for the delete user endpoint
* @returns http DELETE request
*/
 deleteUser(): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
* Making the API call for the delete a movie from the favorite movies endpoint
* @param movieId The movie ID
* @returns http DELETE request
*/
 deleteFavouriteMovie(movieID: any): Observable<any> {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Non-typed response extraction
private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
