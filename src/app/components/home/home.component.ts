import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean;
  constructor(private dataService:DataService) { }
 count:number;
response:any[]=[]
  ngOnInit() {

}

onSubmit(){
  this.loading=true
  this.dataService.getPosts(this.count).subscribe(data=>{
    this.response=data;
    this.loading=false
  })
}
}