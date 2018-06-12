import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-404',
    templateUrl: './pageNotFound.component.html',
    styleUrls: ['./pageNotFound.component.css'],

  })

export class PageNotFoundComponent {

constructor(private router: Router) { }


}