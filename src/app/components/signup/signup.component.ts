import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private SIGNUP_POST = gql`
    mutation Mutation(
      $username: String!,
      $firstname: String!,
      $lastname: String!,
      $password: String!,
      $email: String!,
      $type: String!
      ) {
        addUser(
          username: $username,
          firstname: $firstname,
          lastname: $lastname,
          password: $password,
          email: $email,
          type: $type
        ) {
          username
          firstname
          lastname
          password
          email
          type
        }
      }
    `

  signupForm = new FormGroup({
    username: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    type: new FormControl()
  })

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
  }

  signUp() {
    let tempUser = this.signupForm.get('username')?.value;
    let tempFirst = this.signupForm.get('firstname')?.value;
    let tempLast = this.signupForm.get('lastname')?.value;
    let tempEmail = this.signupForm.get('email')?.value;
    let tempPassword = this.signupForm.get('password')?.value
    let tempType = this.signupForm.get('type')?.value;

    if (tempUser === '') {
      tempUser = '';
    }
    if (tempFirst === '') {
      tempFirst = '';
    }
    if (tempLast === '') {
      tempLast = '';
    }
    if (tempEmail === '') {
      tempEmail = '';
    }
    if (tempPassword === '') {
      tempPassword = ''
    }
    if (tempType === '') {
      tempType = '';
    }

    this.apollo.mutate({
      mutation: this.SIGNUP_POST,
      variables: {
        username: tempUser,
        firstname: tempFirst,
        lastname: tempLast,
        password: tempPassword,
        email: tempEmail,
        type: tempType,
      }
    }).subscribe((res: any) => {
      console.log('signup', res.data)
      this.router.navigate(['/login'])
    }, (err) => {
      alert(err.message);
    })

  }

}
