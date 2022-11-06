import { User } from 'src/app/interface/user';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {


  user: User = {
    name: "" ,
    birthDate: "",
    education: 0,
    email: "",
    lastName: ""
  }

  userForm = this.fb.group(
    {
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      email: [
        null, Validators.compose([
          Validators.required, Validators.email
        ]),
      ],
      education:[null, Validators.required]
    });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private service: UserService, private router : Router) {}

  onSubmit(): void {
    this.service.create(this.user).subscribe((response) => {
      console.log(response);
      // this.router.navigate(['/search']);
    })
  }
}
