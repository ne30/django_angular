import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get(this.baseurl + '/books/',
    { headers : this.httpHeaders });
  }

  gettheBook(id): Observable<any> {
    return this.http.get(this.baseurl + '/books/' + id + '/',
    { headers : this.httpHeaders });
  }

  updatedetail(book): Observable<any> {
    const ob = {title : book.title , author : book.author , genre : book.genre , height : book.height , publisher : book.publisher };
    return this.http.put(this.baseurl + '/books/' + book.id + '/' , ob,
    { headers : this.httpHeaders });
  }

  createdetail(book): Observable<any> {
    const ob = {title : book.title , author : book.author , genre : book.genre , height : book.height , publisher : book.publisher };
    return this.http.post(this.baseurl + '/books/' , ob,
    { headers : this.httpHeaders });
  }

  deletedetail(id): Observable<any> {
    return this.http.delete(this.baseurl + '/books/' + id + '/',
    { headers : this.httpHeaders });
  }
}
 