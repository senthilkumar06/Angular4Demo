import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Post } from '../../models/Post';
import { PostsService } from '../../services/posts.service'

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  constructor(private service : PostsService) { }

  
  @Input() currentPost: Post
  @Input() isEdit: boolean

  @Output() newPost: EventEmitter<Post> = new EventEmitter()
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter()
  ngOnInit() {
  }

  addPost(title, body) {
    if (!title || !body) {
      alert("Please fill all the fields")
    } else {
      this.service.savePost({title, body}).subscribe(post => {
        console.log(post);
        this.newPost.emit(post)
      });
    }
  }

  updatePost() {
    if (!this.currentPost.title || !this.currentPost.body) {
      alert("Please fill all the fields")
    } else {
      this.service.savePost(this.currentPost).subscribe(post => {
        console.log(post);
        if(this.currentPost.id != post.id) {
          this.newPost.emit(post)
        } else {
          this.isEdit = false
          this.updatedPost.emit(post)
        }
        
      });
    }
  }
}
