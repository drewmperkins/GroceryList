import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroceryListComponent } from './views/grocery-list/grocery-list.component';
import { GroceryListModalComponent } from './views/grocery-list/grocery-list-modal/grocery-list-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './middleware/global-error-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    GroceryListComponent,
    GroceryListModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Angular Material imports
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler },],
  bootstrap: [AppComponent]
})
export class AppModule { }
