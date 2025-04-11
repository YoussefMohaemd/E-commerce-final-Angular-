import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layout/addetions/navbar/navbar.component";
import { FooterComponent } from "./layout/addetions/footer/footer.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent   {
  title = 'ecomm';

  

}