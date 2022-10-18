import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private dataService: UsersDataService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern('^[7-9][0-9]{9}$'), Validators.minLength(10)]],
      category: ['', Validators.required],
      profile_photo: [this.imgUrl],
      technology: [this.selectedTechnologies]
    })
  }


  technologies: Array<any> = [
    { name: 'c', value: 'c' },
    { name: 'cpp', value: 'cpp' },
    { name: 'java', value: 'java' },
    { name: 'python', value: 'python' },
    { name: 'javascript', value: 'javascript' }
  ];
  selectedTechnologies: string[] = []
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.selectedTechnologies.push(event.target.value);
    } 
    else {
      this.selectedTechnologies = this.selectedTechnologies.filter(x => {
        return x != event.target.value
      })
    }
  }


selectedFile: String = '';
imgUrl = '../../../assets/images/profile-icon.png'
onChange(e: any) {
  this.file_error = '';
  console.log(this.selectedFile)
  if (e.target.files) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result
      this.loginForm.value.picture = this.imgUrl
    }
  }
}

file_error: string = '';


//getter functions
addTechControls() {
  const arr = this.technologies.map(element => {
    return this.fb.control(false)
  })
  return this.fb.array(arr);
}
  get username() {
  return this.loginForm.get('username');
}
  get gender() {
  return this.loginForm.get('gender');
}
  get email() {
  return this.loginForm.get('email');
}
  get phone() {
  return this.loginForm.get('phone');
}
  get category() {
  return this.loginForm.get('category');
}
  get techArray() {
  return <FormArray>this.loginForm.get('favTech');
}
previewForm() {
  console.log(this.loginForm.value);
}
saveData() {
  this.dataService.myData.push(this.loginForm.value);
  this.loginForm.reset();

}
closeResult: string = '';
open(content: any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

  private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}