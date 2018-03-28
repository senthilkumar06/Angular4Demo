import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service'
import { Post } from '../../models/Post'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post : Post
  
  constructor(private route: ActivatedRoute, private service: PostsService) { }
  
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.service.getPost(id).subscribe(post => 
      this.post = post
    );
  }

}
