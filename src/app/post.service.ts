import { Injectable } from '@angular/core';
import { Post } from './models/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3001/posts'; // API URL

  constructor(private http: HttpClient) {}

  createPost(post: Omit<Post, '_id'>): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', token);
    }

    return this.http
      .post(this.apiUrl + '/add', post, { headers })
      .pipe(map((res) => res)); // У нових версіях немає потреби в `res.json()`
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(map((res) => res));
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + `/${id}`).pipe(map((res) => res));
  }

  deletePost(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers;
    if (token) {
      headers = new HttpHeaders({ Authorization: token });
    }
    return this.http
      .delete(this.apiUrl + `/${id}`, { headers })
      .pipe(map((res) => res));
  }
}
