import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostsService } from '../../services/posts.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostsService) { }
  posts: Post[];
  currentPost: Post = {
    title: '',
    id: 0,
    body: ''
  };
  isEdit = false
  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts
    })
  }

  onNewPost(post: Post) {
    this.posts.unshift(post);
  }

  editPost(post: Post) {
    this.currentPost = post
    this.isEdit = true
  }

  onPostUpdated(post: Post) {
    this.isEdit = false
    this.posts.forEach((element, index) => {
      if(post.id == element.id) {
        this.posts.splice(index, 1)
        this.posts.unshift(post)
      }
    });
    this.currentPost = {
      title: '',
      id: 0,
      body: ''
    };
  }

  deletePost(post: Post) {
    
  }

}
