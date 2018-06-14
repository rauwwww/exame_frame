import { Component, OnInit } from '@angular/core';
import { Share, ShareRate } from '../models/share';
import { ShareService } from './shares.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css'],
  providers: [ShareService]
})
export class SharesComponent implements OnInit {

  isSubmitted = false;
  title = 'Trading App';
  public ShareName = [];
  SharePrice = new ShareRate('', '');
  model = new Share('', new Array<ShareRate>());
  public shareList = [];
  priceForm;
  newPrice = [];

  constructor (
    private shareService: ShareService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createPriceForm();
  }

  createPriceForm() {
    this.priceForm = this.formBuilder.group({
      price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['home']);
  }

  submitShare() {
    this.shareService.addShare(this.model)
      .subscribe(
        stogMsg => {
          // console.log("shares:", shares);
          this.model = stogMsg;
          // this.getBlogs();
        },
        error =>  console.log(error, 'error while submitting Share')
      );
  }
  submitPrice(id) {
    const price = this.priceForm.get('price').value;
    this.shareService.addPrice(id, price)
    .subscribe(data => {
      const index = this.newPrice.indexOf(id); // Get the index of the blog id to remove from array
      this.newPrice.splice(index, 1); // Remove id from the array
    },
    error =>  console.log(error, 'error while submitting Share')
    );
  }
  removeShare(id) {
    this.shareService.removeShare(id)
    .subscribe(data => {},
    error => console.log(error, 'error while deleting Share')
    );
  }

  getShares() {
    console.log('Subscribe to service');
    this.shareService.getShares()
      .subscribe(
        shares => {
          // console.log("Shares:",shares);
          this.shareList = shares;
          console.log(shares);
        });
  }

  ngOnInit() {
    // checks if user is loggedin and has token
    if (localStorage.getItem('jwtToken') != null) {
      this.getShares();
      console.log('localtoken:', localStorage.getItem('jwtToken'));
    } else {
      this.router.navigate(['login']);
    }
  }
}
