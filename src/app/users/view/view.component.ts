import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  myTech: any[]=[];
  constructor(public dataService: UsersDataService) { 
    this.dataService.getUsers().subscribe((users: any[]) => {
      this.users = users;
      this.myTech = this.dataService.getValues();
    })
   }
  
  users : any[]=[]
  ngOnInit(): void {
    this.myTech = this.dataService.getValues();
    
    

  }

}

