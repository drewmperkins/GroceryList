import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GroceryListModalComponent } from './views/grocery-list/grocery-list-modal/grocery-list-modal.component';
import { GroceryListComponent } from './views/grocery-list/grocery-list.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'list', component: GroceryListComponent },
  { path: 'list/new', component: GroceryListModalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
