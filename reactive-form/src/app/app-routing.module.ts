import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customers/customer.component';
import { CustomerReactiveComponent } from './customers.reactive/customer.reactive.component';

const routes: Routes = [
  {path:'template', component: CustomerComponent},
  {path:'reactive', component: CustomerReactiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
