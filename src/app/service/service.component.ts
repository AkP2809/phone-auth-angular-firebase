import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  otpCode !: string;
  verify : any;
  remainingDigits: string = 'Verify OTP';
  btnStatus : string = 'btn-light';

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');

    console.log(this.verify);
  }

  onOtpChange(otpCode: any) {
      this.otpCode = otpCode;

      if(this.otpCode.length < this.config.length) {
          this.remainingDigits = (this.config.length - this.otpCode.length) + ' digits left';
          this.btnStatus = 'btn-light';
      } else if(this.otpCode.length == this.config.length) {
        this.remainingDigits = "Let's Go.";
        this.btnStatus = 'btn-primary';
      }
  }

  signInWithOTP() {
    let credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, this.otpCode);

    firebase.auth().signInWithCredential(credentials).then((result) => {
      console.log(result);

      localStorage.setItem('user_data', JSON.stringify(result));

      this.router.navigate(['/dashboard']);
    }).catch((error => {
      console.log(error?.message);

      alert(error?.message);
    }));
  }
}
