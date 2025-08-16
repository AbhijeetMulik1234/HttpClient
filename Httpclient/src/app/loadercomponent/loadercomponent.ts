import { Component } from '@angular/core';
import { Loader } from '../core/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loadercomponent',
  imports: [CommonModule],
  templateUrl: './loadercomponent.html',
  styleUrl: './loadercomponent.css',
})
export class Loadercomponent {
  constructor(public loader: Loader) {}
}
