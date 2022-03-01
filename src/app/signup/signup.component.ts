import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  year: any = '';
  password = 'password';
  PSA: any;
  imageUrl: any;
  photo: any;
  extract: any;
  id: any;
  email: any = '';
  userInput: any = {};

  active: boolean = false;
  mpname: boolean = false;
  mfname: boolean = false;
  mlname: boolean = false;
  mgender: boolean = false;
  mbdate: boolean = false;
  maddress: boolean = false;
  memail: boolean = false;
  mpassword: boolean = false;
  viewpass: boolean = true;
  hidepass: boolean = false;

  constructor(private router: Router, private data: DataService) {}
  ngOnInit(): void {
    this.getYear();
  }
  getYear(): void {
    this.data.fetchData('years', '').subscribe((response: any) => {
      this.year = response.payload[0];
    });
  }
  goBack(): void {
    this.router.navigate(['welcome']);
  }
  register(event: any): void {
    if (event.target.firstname.value === '') {
      this.mfname = true;
      this.mlname = false;
      this.mgender = false;
      this.mbdate = false;
      this.maddress = false;
      this.memail = false;
      this.mpassword = false;
    } else if (event.target.lastname.value === '') {
      this.mfname = false;
      this.mlname = true;
      this.mgender = false;
      this.mbdate = false;
      this.maddress = false;
      this.memail = false;
      this.mpassword = false;
    } else if (event.target.gender.value === '') {
      this.mfname = false;
      this.mlname = false;
      this.mgender = true;
      this.mbdate = false;
      this.maddress = false;
      this.memail = false;
      this.mpassword = false;
    } else if (event.target.birthdate.value === '') {
      this.mfname = false;
      this.mlname = false;
      this.mgender = false;
      this.mbdate = true;
      this.maddress = false;
      this.memail = false;
      this.mpassword = false;
    } else if (event.target.address.value === '') {
      this.mfname = false;
      this.mlname = false;
      this.mgender = false;
      this.mbdate = false;
      this.maddress = true;
      this.memail = false;
      this.mpassword = false;
    } else if (event.target.email.value === '') {
      this.mfname = false;
      this.mlname = false;
      this.mgender = false;
      this.mbdate = false;
      this.maddress = false;
      this.memail = true;
      this.mpassword = false;
    } else if (event.target.password.value === '') {
      this.mfname = false;
      this.mlname = false;
      this.mgender = false;
      this.mbdate = false;
      this.maddress = false;
      this.memail = false;
      this.mpassword = true;
    } else if (event.target.parentname.value === '') {
      this.mpname = true;
      this.mfname = false;
      this.mlname = false;
      this.mgender = false;
      this.mbdate = false;
      this.maddress = false;
      this.memail = false;
      this.mpassword = false;
    } else {
      this.userInput.img = this.photo;
      this.userInput.parentname = event.target.parentname.value;
      this.userInput.firstname = event.target.firstname.value;
      this.userInput.middlename = event.target.middlename.value;
      this.userInput.lastname = event.target.lastname.value;
      this.userInput.gender = event.target.gender.value;
      this.userInput.birthdate = event.target.birthdate.value;
      this.userInput.phone = event.target.phone.value;
      this.userInput.address = event.target.address.value;
      this.userInput.email = event.target.email.value;
      this.userInput.password = event.target.password.value;
      this.userInput.psa = this.PSA;
      this.userInput.year = this.year.year;
      alert(
        'Hello, ' +
          this.userInput.firstname +
          ' ' +
          this.userInput.lastname +
          '! your account is now pending!'
      );
      this.data
        .fetchData('register', this.userInput)
        .subscribe((response: any) => {});
      this.goBack();
    }
  }
  getUser(): void {
    const object = {
      email: this.email,
    };
    this.data.fetchData('user_exists', object).subscribe((response: any) => {
      if (response.status.remarks === 'success') {
        alert(this.email + ' is not available! try another');
        this.email = '';
      }
    });
  }
  passwordToggle(): void {
    this.hidepass = !this.hidepass;
    this.viewpass = !this.viewpass;
    if (this.password === 'password') this.password = 'text';
    else this.password = 'password';
  }
  checkedImage(event: any) {
    this.photo = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.photo = event.target.result;
    };
    reader.readAsDataURL(this.photo);
    this.active = true;
  }
  setPhoto(event: any): void {
    if (event.target.files[0].type === 'image/jpeg') {
      this.checkedImage(event);
    } else if (event.target.files[0].type === 'image/jpg') {
      this.checkedImage(event);
    } else if (event.target.files[0].type === 'image/png') {
      this.checkedImage(event);
    } else alert('Not an Image!');
  }
  setPSA(event: any): void {
    this.PSA = event.target.files[0];
    if (event.target.files[0].type === 'application/pdf') {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.PSA = event.target.result;
      };
      reader.readAsDataURL(this.PSA);
    } else {
      alert('Not a pdf file!');
      window.location.reload();
    }
  }
}
