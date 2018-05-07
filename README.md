# Frequent Words Counter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files or Run  `ng build` for a dev server. 

Run `cd server` and hit `node app.js`. This will start the server. Now the server will be running on `http://localhost:3000/`


## Technologies Used

`Angular 5` Frontend

`Node.js` Backend

`Bootstrap 4` Styling


## Angular 5 Frontend
`app.module.ts` file 

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { HttpModule } from '@angular/http';
import { HeaderModule } from './components/header/header.module';



@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
  HeaderModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```


`routing.module.ts` file (Lazy Routing)

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    { path: 'home', loadChildren: './components/home/home.module#HomeModule'},
    { path: '', redirectTo: 'home' , pathMatch: 'full' },
    {path: 'home/:query',loadChildren: './components/home/home.module#HomeModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule]
})
export class RoutingModule { }

```

`home.module.ts` file 

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DataService } from '../../service/data.service';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
const routes: Routes = [
    {
        path: '',
        component:HomeComponent
    }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [HomeComponent],
  exports:[HomeComponent],
  providers:[DataService]
})
export class HomeModule { }

```

`home.component.ts` file 

```
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

```
`home.component.html` file 

```
<div *ngIf=loading class="loading">Loading&#8230;</div>
<div  *ngIf=!loading class="container">
<form #myForm="ngForm" id="myForm" (ngSubmit)="onSubmit()">
<div class="form-group">
    <input required  type="number"  [(ngModel)]="count"  name="count"   class="form-control">
</div>
<button [disabled]="!myForm.form.valid" class="btn btn-primary" type="submit">Submit</button>
</form>
<hr/>
        <h2>Most Frequently Used Words in the File</h2>
        <p>Currently displaying  <b>{{count}}</b>  no of most frequently words in the file</p>            
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Word</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let res of response; let i = index">
              <td>{{i}}</td>
              <td>{{res?.item}}</td>
              <td>{{res?.count}}</td>
            </tr>
          </tbody>
        </table>
     
</div>

```
`package.json` file 

```
{
  "name": "task",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^5.2.0",
    "@angular/common": "^5.2.0",
    "@angular/compiler": "^5.2.0",
    "@angular/core": "^5.2.0",
    "@angular/forms": "^5.2.0",
    "@angular/http": "^5.2.0",
    "@angular/platform-browser": "^5.2.0",
    "@angular/platform-browser-dynamic": "^5.2.0",
    "@angular/router": "^5.2.0",
    "core-js": "^2.4.1",
    "rxjs": "^5.5.6",
    "zone.js": "^0.8.19"
  },
  "devDependencies": {
    "@angular/cli": "1.6.6",
    "@angular/compiler-cli": "^5.2.0",
    "@angular/language-service": "^5.2.0",
    "@types/jasmine": "~2.8.3",
    "@types/jasminewd2": "~2.0.2",
    "@types/node": "~6.0.60",
    "codelyzer": "^4.0.1",
    "jasmine-core": "~2.8.0",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~2.0.0",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "^1.2.1",
    "karma-jasmine": "~1.1.0",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.1.2",
    "ts-node": "~4.1.0",
    "tslint": "~5.9.1",
    "typescript": "~2.5.3"
  }
}

```

## Backend(Node.js)

`app.js` file 

```
'use strict'

var express =require('express');
var app=express();
const path=require('path');
var bodyParser =require('body-parser');
var cors = require('cors')
const config=require('./config/local');

app.use(cors());

// index
app.use(express.static(path.join(config.root, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

require('./config/express')(app)
require('./routes')(app)
app.use('*', function(req, res, next) {
    var indexFile = path.resolve(config.root, 'public/index.html')
    res.sendFile(indexFile)
})
module.exports = app;
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port,()=>{
    console.log('server running on ' + port)
})

```

`routes.js` file

```

'use strict'

module.exports = function(app) {

    app.use('/read', require('./routes/read'))
    
}

```

`read.controller.js` file for counting the frequency of frequently occuring words.
Firstly, I fetched file from the api and then I spilted the words and stored them in an array.
Then perform the following loop for fecthing the frequency of frequently occuring words.

```
var fs = require('fs')
var http = require('http');
const api="http://terriblytinytales.com/test.txt"
exports.getFile= function(req, res) {
    var file = fs.createWriteStream("file.txt");
    var request = http.get(api, function(response) {
      response.pipe(file);
      var count=Number(req.params.count)
      let mf = 1;
      let m = 0;
      let item;
      let resArray=[]
      fs.readFile('file.txt', function(err, data) {
          if(err) throw err;
          var array = data.toString().split(" ");
          for(i in array) {
             array.push(i)
          
          }
  for(let k=1;k<=count;k++){
  
  for (let i=0; i<array.length; i++)
  {
          for (let j=i; j<array.length; j++)
          {
                  if (array[i] == array[j])
                   m++;
                  if (mf<m)
                  {
                    mf=m; 
                    item = array[i];
                  }
          }
          m=0;
          
  }
  
  array = array.filter(e => e !== item);
  resArray.push({item:item,count:mf});
  item=''
  mf=1
  
  }
  
  fs.unlink('file.txt',(err,response)=>{
   if (err) throw err;
   else{
        res.json(resArray);
   }
  })
  });
    });

}

```

`package.json` file 

```
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "body-parser": "*",
    "connect-flash": "^0.1.1",
    "cors": "*",
    "express": "*",
    "fs": "0.0.1-security",
    "path": "^0.12.7"
  },
  "author": "Ayush Bhadauria",
  "license": "ISC"
}


```
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
