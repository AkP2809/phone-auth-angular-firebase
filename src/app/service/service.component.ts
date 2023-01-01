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

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');

    console.log(this.verify);
  }

  onOtpChange(otpCode: any) {
      this.otpCode = otpCode;
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
