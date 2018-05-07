import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    { path: `home`, loadChildren: `./components/home/home.module#HomeModule`},
    { path: ``, redirectTo: `home` , pathMatch: `full` },
    {path: `home/:query`,loadChildren: `./components/home/home.module#HomeModule`}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule]
})
export class RoutingModule { }
