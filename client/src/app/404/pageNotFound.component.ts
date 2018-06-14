import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-404',
    templateUrl: './pageNotFound.component.html',
    styleUrls: ['./pageNotFound.component.css'],

  })

export class PageNotFoundComponent {

constructor(private router: Router) { }

}