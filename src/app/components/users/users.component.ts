import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../models/User'; 
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  }
  users: User[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  @ViewChild("userForm")
  form: any;

  constructor(private service: UserService) { }

  ngOnInit() {
      this.service.getUsers().subscribe(users => {
        this.users = users;
        this.loaded = true;
      });
  }

  // addUser() {
  //   this.user.isActive = true;
  //   this.user.registered = new Date();

  //   this.users.unshift(this.user);

  //   this.user = {
  //     firstName: '',
  //     lastName: '',
  //     email: ''
  //   }
  // }

  onSubmit({value, valid}: {value: User, valid: Boolean}) {
    if (!valid) {
      console.log("Form not valid")
    } else {
      value.isActive = true;
      value.registered = new Date();
      value.hide = true;
      this.service.addUser(value);
      this.form.reset();
    }
  }

  
}
