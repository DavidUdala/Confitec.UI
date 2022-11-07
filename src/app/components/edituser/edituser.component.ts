import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { User } from 'src/app/interface/user';
import { UserDto } from 'src/app/interface/userDto';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EditUserComponent implements OnInit {

  userDto: UserDto = {
    id: 0,
    name: '',
    lastName: '',
    birthDate: '',
    education: 0,
    email: ''
  }

  user: User = {
    id: 0,
    name: '',
    lastName: '',
    birthDate: '',
    education: 0,
    email: ''
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private fb: FormBuilder
  ) { }

 id : any;

  ngOnInit(): void {
    this.id  = this.route.snapshot.paramMap.get('id');

    this.getUser(this.id);

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
  getUser(id : any)
  {
    this.service.getById(id).subscribe((response) => {
      this.user = response;
    });
  }
  onSubmit(): void {
    this.setObjUpdated();
    this.service.update(this.userDto).subscribe((response) => {
      Swal.fire({
        title: `Usuário ${response.name} foi atualizado com sucesso!`,
        confirmButtonText: 'OK',
        icon:'success'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/search']);
        }
      })
    })
  }

  setObjUpdated(){
    this.userDto.birthDate = this.user.birthDate;
    this.userDto.education = this.user.education;
    this.userDto.email = this.user.email;
    this.userDto.lastName = this.user.lastName;
    this.userDto.name = this.user.name;
    this.userDto.id = this.id;
  }
}
