import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;

  constructor(
    private router: Router,
    private fAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    var data = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userData = data?.user?.phoneNumber;
    console.log(this.userData);
  }

  logout() {
    return this.fAuth.signOut().then(() => {
        this.router.navigate(['']);
    }).catch((error) => {
      console.log(error?.message);

      alert(error?.message);
    })
  }
}
