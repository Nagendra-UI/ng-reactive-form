import { formData } from './../data';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  @Output() values = new EventEmitter<formData>()

  maxDate: Date;
  formValues: FormGroup;


  constructor(private formBuild: FormBuilder) {
    this.maxDate = new Date((new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + (new Date().getFullYear() - 18));
  }

  ngOnInit(): void {
    this.formInIt()
  }

  private formInIt() {
    let skill = new FormArray([])
    this.formValues = this.formBuild.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cnfPassword: new FormControl('', [Validators.required, this.MatchPassword.bind(this)]),
      dob: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      gender: new FormControl('male', Validators.required),
      checkbox: new FormControl(false, Validators.requiredTrue),
      skills: skill
    })
  }

  onSubmit() {
    this.values.emit(this.formValues.value)
  }

  addSkill() {
    (<FormArray>this.formValues.get('skills')).push(this.formBuild.group({ skill: new FormControl('', Validators.required) }))
  }

  removeSkill(index) {
    (<FormArray>this.formValues.get('skills')).removeAt(index)
  }

  onError(item) {
    return true ? item.invalid && item.touched : item.valid && item.touched
  }

  onSuccess(item) {
    return true ? item.valid && item.touched : item.invalid && item.touched
  }


  // custom password check validation
  MatchPassword(control: AbstractControl) {
    if (this.formValues) {
      const pw = this.formValues.get('password').value
      if (control.value !== pw) {
        return { 'passwordMismatch': true }
      } else {
        return null
      }
    }
  }

  // MatchPassword(control: AbstractControl): Promise<any> | Observable<any> {
  //   const password = this.formValues.get('password')
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value !== password.value) {
  //         console.log(password)
  //         resolve({ 'passwordMismatch': true })
  //       } else {
  //         resolve(null)
  //       }
  //     }, 1500)
  //   })

  //   return promise
  // }


}
