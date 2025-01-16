import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public title: string = 'Stay Active, Stay Together';
  public imagePath: string = "./../assets/images/sport.jpeg";
}
