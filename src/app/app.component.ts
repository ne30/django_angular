import { Component } from '@angular/core';
import { ApiService } from './api.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  title;
  publisher;
  genre;
  author;
  height;
  books = [{ title : '' , author : '' , genre : '' , height : 0 , publisher : '',},];
  selectedbook;
  filterbook;
  constructor(private api:ApiService) {
    this.getbook();
    this.selectedbook = {id : -1, title : '' , author : '' , genre : '' , height : 0 , publisher : '' };
    this.filterbook = {id : -1, title : '' , author : '' , genre : '' , height : 0 , publisher : '' };
  }

  sortData(sort: Sort){
    const data = this.books.slice();
    if(!sort.active || sort.direction === ''){
      this.books = data;
      return;
    }

    this.books = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'author': return this.compare(a.author, b.author, isAsc);
        case 'genre': return this.compare(a.genre, b.genre, isAsc);
        case 'height': return this.compare(a.height, b.height, isAsc);
        case 'publisher': return this.compare(a.publisher, b.publisher, isAsc);
        default: return 0;
      }
    });
  }
  
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  filterDetails = (wd) => {
    const book = {author:wd};
    this.filterbook = this.books.filter(item => item.author === book.author);
    this.books = this.filterbook;
    return;
  }

  getbook = () => {
    this.api.getAllBooks().subscribe(
      data => {
        this.books = data;
        this.selectedbook = {id : -1, title : '' , author : '' , genre : '' , height : 0 , publisher : '' };
      },
      error => {
        console.log(error);
      }
    )
  }
  bookClicked = (book) => {
    this.api.gettheBook(book.id).subscribe(
      data => {
        console.log(data);
        this.selectedbook = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  updateDetails = () => {
    this.api.updatedetail(this.selectedbook).subscribe(
      data => { 
        this.selectedbook = data;
        this.getbook();
        this.selectedbook = {id : -1, title : '' , author : '' , genre : '' , height : 0 , publisher : '' };
      },
      error => {
        console.log(error);
      }
    )
  }
  CreateDetails = () => {
    this.api.createdetail(this.selectedbook).subscribe(
      data => {
        this.books.push(data);
        this.getbook();
      },
      error => {
        console.log(error);
      }
    )
  }
  DeleteDetails = () => {
    this.api.deletedetail(this.selectedbook.id).subscribe(
      data => {
        console.log(data);
        this.getbook();
      },
      error => {
        console.log(error);
      }
    )
  }
}
