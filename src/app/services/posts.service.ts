import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/Of'
import { Post } from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json'})
}

@Injectable()
export class PostsService {
  postUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  savePost(post: Post) : Observable<Post> {
    if (post.id != null) {
      return this.http.put<Post>(this.postUrl+"/1", post, httpOptions)
    }
    return this.http.post<Post>(this.postUrl, post, httpOptions)
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}`)
  }
}
