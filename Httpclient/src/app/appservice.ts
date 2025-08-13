import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Interface/posts';
import id from '@angular/common/locales/id';

@Injectable({
  providedIn: 'root',
})
export class Appservice {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  //Get All Posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
  // Get post by id
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
  //Add the post
  createPost(postData: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, postData);
  }
  //Edit the post
  updatePost(id: number, postData: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, postData);
  }
  deletePost(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.apiUrl}/${id}`);
  }
}
