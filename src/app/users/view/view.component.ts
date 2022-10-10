import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/services/users-data.service';
var data: any[]=[];

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(public dataService: UsersDataService) {  }
  message:any;
  data=data;
  myTech: String[]=[];
  users : any[]=[]
  ngOnInit(): void {
    this.myTech = this.dataService.getValues();
    
    this.dataService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    })

  }

}

