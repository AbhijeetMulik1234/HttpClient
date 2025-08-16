import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Appservice } from './appservice';
import { Post } from './Interface/posts';
import { Loadercomponent } from './loadercomponent/loadercomponent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, Loadercomponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Httpclient');
  posts: Post[] = [];
  singlePost: Post | null = null;
  searchId: number = 0;

  postData: Post = { title: '', body: '', userId: 1 };
  isUpdateMode = false;
  updateId: number | null = null;

  constructor(private postService: Appservice) {}

  ngOnInit() {
    // ithe set kela dummy token
    localStorage.setItem('token', 'dummy-test-token');
    debugger;
    this.getPosts();
  }
  getPosts() {
    debugger;
    alert('Get all posts');
    this.postService.getPosts().subscribe({
      next: (data) => {
        debugger;
        this.posts = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  fetchPostsById() {
    debugger;
    if (this.searchId == 0) return;
    this.postService.getPost(this.searchId).subscribe({
      next: (data) => {
        debugger;
        this.singlePost = data;
      },
      error: (err) => console.error(err),
    });
  }
  addPost() {
    this.postService.createPost(this.postData).subscribe({
      next: (data) => {
        debugger;
        this.posts.unshift(data);
        this.postData = { title: '', body: '', userId: 1 };
      },
      error: (err) => console.error(err),
    });
  }
  editPost(post: Post) {
    debugger;
    this.isUpdateMode = true;
    this.updateId = post.id || null;
    this.postData = { title: post.title, body: post.body, userId: post.userId };
  }
  updatePost() {
    if (this.updateId === null) return;
    this.postService.updatePost(this.updateId, this.postData).subscribe({
      next: (data) => {
        const index = this.posts.findIndex((p) => p.id === this.updateId);
        if (index !== -1) this.posts[index] = data;
        this.cancelUpdate();
      },
      error: (err) => console.error(err),
    });
  }
  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        debugger;
        this.posts = this.posts.filter((p) => p.id !== id);
      },
      error: (err) => console.error(err),
    });
  }
  cancelUpdate() {
    this.isUpdateMode = false;
    this.updateId = null;
    this.postData = { title: '', body: '', userId: 1 };
  }
}
