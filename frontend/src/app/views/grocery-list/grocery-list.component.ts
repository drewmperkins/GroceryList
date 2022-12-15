import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { GroceryList } from '../../models/grocery-list.model';
import { GroceryListService } from '../../services/grocery-list.service';
import { MatDialog } from '@angular/material/dialog';
import { GroceryListModalComponent } from './grocery-list-modal/grocery-list-modal.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent {
  groceryList: GroceryList[] = [];

  constructor(public dialog: MatDialog,
    public router: Router,
    private location: Location,
    public groceryListService: GroceryListService) {
      this.location.replaceState('/list');
  }

  ngOnInit() {
    this.getAllGroceryLists();
  }

  getAllGroceryLists() {
    this.groceryListService.get()
    .pipe(
      catchError(err => { throw err } ),
    )
    .subscribe((gl: GroceryList[]) => {
      this.groceryList = gl;
    });
  }

  deleteGroceryList(GroceryListId: number) {
    this.groceryListService.delete(GroceryListId)
    .pipe(
      catchError(err => { throw err } ),
    )
    .subscribe((resp: HttpResponse<any>) => {
      var idx = this.groceryList.findIndex(x => x.GroceryListId == GroceryListId);
      this.groceryList.splice(idx, 1);
    });
  }

  openGroceryListModal(GroceryListId?: number) {
    const dialogRef = this.dialog.open(GroceryListModalComponent, {
      width: '490px',
      height: '90%',
      maxHeight: '745px',
      disableClose: false,
      panelClass: 'custom-container'
    });
    let instance = dialogRef.componentInstance;
    if (GroceryListId != null) { 
      instance.userOpenGroceryListId = GroceryListId;
      this.location.replaceState('/list/' + GroceryListId);
    } else {
      this.location.replaceState('/list/new');
    }

    // After the dialog is closed.
    dialogRef.afterClosed().subscribe((gl: GroceryList) => {
      this.location.replaceState('/list');
      if (gl == null || gl.GroceryListId == null) return;

      // final save to make sure fully up to date.
      this.groceryListService.post(gl)
      .subscribe(() => {
        
        // update our browser memory of grocerylists
        // if new list add to top.
        var idx: number = this.groceryList.findIndex(x => x.GroceryListId == gl.GroceryListId);
        if (idx == -1) this.groceryList.unshift(gl);
        else this.groceryList[idx] = gl;
      });
    });
  }
}
