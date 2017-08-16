import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  userEmail : string;
  googleUrl : any;
  errorMsg : string;
  responseData: any;
  userPostData = {
    "email": ""
  };
  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.errorMsg ="";
    this.googleUrl ="";
  }

validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  emailValidate(){
    if(this.validateEmail(this.userEmail)){
      this.userPostData.email = this.userEmail;
      this.googleUrl = "https://www.google.com/accounts/AccountChooser?Email="+this.userEmail+"&continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png";
      console.log(this.userPostData);
    }
    else{
      
    }
    
  }
  googleUrlError(event){
    this.errorMsg = "Open new tab and login with your google account.";
  }

  googleUrlSuccess(event){
    if(this.userPostData.email){

    
    this.errorMsg ="";
      this
    .authService
    .postData(this.userPostData, "email")
    .then((result) => {
      this.responseData = result;
      if (this.responseData.userData) {
        localStorage.setItem('userData', JSON.stringify(this.responseData))
        // Redirect
      } 
    }, (err) => {
      //Connection failed message
    });
    }
  } 

}
