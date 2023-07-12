import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//Declaring the api url that will provide data for the client app
const apiUrl = 'https://indieflix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

 // Making the api call for the  User login endpoint
 public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
  catchError(this.handleError)
  );
}

 // Making the api call for the Get all movies endpoint
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

 // Making the api call for the Get one movie endpoint
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
 // Making the api call for the Get director endpoint
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
 // Making the api call for the Get genre endpoint
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
 // Making the api call for the Get user endpoint
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

 // Making the api call for the Get favourite movies for a user endpoint
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
 // Making the api call for the Add a movie to favourite Movies endpoint
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

// Making the api call to ask if a movie is favourite Movies 
// isFavoriteMovie(movieId: string): boolean {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   return user.FavoriteMovies.indexOf(movieId) >= 0;
// }
isFavoriteMovie(movieId: string): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.FavoriteMovies && user.FavoriteMovies.indexOf(movieId) >= 0;
}

 // Making the api call for the Edit user endpoint
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
 // Making the api call for the Delete user endpoint
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

 // Making the api call for the Delete a movie from the favorite movies endpoint
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