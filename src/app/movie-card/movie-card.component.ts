import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }
ngOnInit(): void {
  this.getMovies();
}

/**
* Calling get movies method on API
*/
/**
* Calling get movies method on API
*/
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * Opening genre dialog
  * @param name The genre's name to show on the dialog (title)
  * @param description The genre's description to show on the dialog
  */
  /**
  * Opening genre dialog
  * @param name The genre's name to show on the dialog (title)
  * @param description The genre's description to show on the dialog
  */
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description
      },
    });
  }

  /**
  * Opening director dialog
  * @param name The director's name to show on the dialog (title)
  * @param bio The director's biography to show on the dialog
  */
  /**
  * Opening director dialog
  * @param name The director's name to show on the dialog (title)
  * @param bio The director's biography to show on the dialog
  */
  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: bio
      },
    });
  }

  /**
  * Opening movie description dialog
  * @param description The text to show on the dialog
  */
  /**
  * Opening movie description dialog
  * @param description The text to show on the dialog
  */
  openSynopsis(description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: 'Synopsis',
        content: description
      },
    });
  }

  /**
  * Calling add favorite movie method on API
  * @param id The movie ID
  */
  /**
  * Calling add favorite movie method on API
  * @param id The movie ID
  */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {

      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
    });
  }

 /**
  * Calling check favorite movie method on API
  * @param id The movie ID
  */
 /**
  * Calling check favorite movie method on API
  * @param id The movie ID
  */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

 /**
  * Calling delete favorite movie method on API
  * @param id The movie ID
  */
 /**
  * Calling delete favorite movie method on API
  * @param id The movie ID
  */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavouriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
    });
  }
}
