import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: string = '';
  email: string = '';
  password: string = '';
  provider: any = new GoogleAuthProvider();
  auth :any = new GoogleAuthProvider();
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  signInWithGoogle() { 
    signInWithPopup(this.auth, this.provider) 
      .then((result) => {
        const user = result.user;
        this.email = user.email!; 
        console.log(user, this.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  register() {
    let bodyData = {
      firstname: this.firstname,
      email: this.email,
      password: this.password,
    };
    this.http
      .post('http://localhost:3000/student/create', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Successfully');
      });
  }

  save() {
    this.register();
  }
}
