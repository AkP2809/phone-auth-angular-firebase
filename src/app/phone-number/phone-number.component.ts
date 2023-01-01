import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent implements OnInit {

  phoneNumber: any;
  reCaptchaVerifier!: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getOTP() {
      this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible'
      });

      console.log(this.reCaptchaVerifier);
      console.log(this.phoneNumber);

      firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier).then((result) => {
        console.log(result);

        localStorage.setItem('verificationId', JSON.stringify(result.verificationId));

        this.router.navigate(['/service']);
      }).catch((error) => {
        console.log(error?.message);

        alert(error?.message);

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }

}
