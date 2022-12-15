import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, debounceTime, Subject, takeUntil } from 'rxjs';
import { GroceryList } from 'src/app/models/grocery-list.model';
import { GroceryListService } from 'src/app/services/grocery-list.service';

@Component({
  selector: 'app-grocery-list-modal',
  templateUrl: './grocery-list-modal.component.html',
  styleUrls: ['./grocery-list-modal.component.scss']
})
export class GroceryListModalComponent {
  userOpenGroceryListId: number | undefined = undefined;
  cssItemHeight: string | undefined; // 645px
  
  form: FormGroup = this.fb.group({
    GroceryListId: new FormControl(null),
    Title: new FormControl(null, { updateOn: 'blur' }),
    GroceryItems: this.fb.array([]),
    Updated: new FormControl(null)
  });
  get GroceryListId(): FormControl { return this.form.controls["GroceryListId"] as FormControl; }
  get Title(): FormControl { return this.form.controls["Title"] as FormControl; }
  get Updated(): FormControl { return this.form.controls["Updated"] as FormControl; }
  get GroceryItems(): FormArray { return this.form.controls["GroceryItems"] as FormArray; }
  getGroceryItem(index: number): FormGroup { return this.GroceryItems.controls[index] as FormGroup; }
  addGroceryItem() {
    const groceryItemForm = this.fb.group({
      GroceryItemId: new FormControl(null),
      GroceryListId: new FormControl(null),
      Checked: new FormControl(false),
      Name: new FormControl(null, { updateOn: 'change' }),
      SortOrder: new FormControl(null),
    });
    this.GroceryItems.push(groceryItemForm);
  }
  deleteGroceryItem(index: number) {
    this.GroceryItems.removeAt(index);
  }
  getGroceryItemName(index: number): string | null { return this.getGroceryItem(index).get('Name')?.value }
  
  constructor(private fb: FormBuilder, 
    public groceryListService: GroceryListService,
    public dialogRef: MatDialogRef<GroceryListModalComponent>) {
    this.addGroceryItem();
    this.changeDetectionControls();
  }

  ngOnInit(): void {
    // call the resize at launch to setup heights
    window.dispatchEvent(new Event('resize'));

    // if user clicked on an old list.. grab freshest copy from datbase.
    if (this.userOpenGroceryListId != undefined) this.getGroceryList(this.userOpenGroceryListId);
  }

  private destroy$ = new Subject<void>();
  ngOnDestroy() {
    this.destroy$.next();
  }

  getGroceryList(GroceryListId: number) {
    this.groceryListService.get(GroceryListId)
    .pipe(
      catchError(err => { throw err } ),
    )
    .subscribe((gl: GroceryList[]) => {
      for (let index = 0; index < gl[0].GroceryItems.length-1; index++) {
        this.addGroceryItem();
      }
      this.form.setValue(gl[0], {emitEvent: false});
      if (gl[0].GroceryItems.length == 1) this.addGroceryItem();
    });
  }

  updateGroceryList() {
    // update the date everytime a value is entered.
    this.Updated.setValue((new Date).toISOString(), {emitEvent: false});

    // create\update list
    this.groceryListService.post(this.form.getRawValue())
    .subscribe((id: number) => {
      if (this.GroceryListId.value == null) this.GroceryListId.setValue(id, {emitEvent: false});
    });
  }

  changeDetectionControls() {
    // title - blur - create\update list
    this.Title.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateGroceryList();
    });

    // item change
    this.GroceryItems.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe(() => {

      // create a new list when the first item is added.
      if (this.GroceryItems.controls.length == 1) this.updateGroceryList();

      // get the last item in the list
      // if grocery item has been entered, add a new blank grocery item
      var lastItem = this.getGroceryItemName(this.GroceryItems.controls.length-1);
      if (lastItem != null && lastItem.length > 0) this.addGroceryItem();

    });

    // backdrop click to close - set dialogResult
    this.dialogRef.backdropClick().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.dialogRef.close(this.form.getRawValue());
    })

    window.addEventListener('resize', (e: UIEvent) => {
      // dynamically adjust the height of groceryListItems.
      // dialog is set for 90% of window height.. subtract 100 for header\footer.
      this.cssItemHeight = window.innerHeight * 0.9 - 100 + 'px';
    });
  }

  /**
   * Enter\Tab key press move to next line item.
   * @param $event 
   * @param index 
   */
  keyPress($event: KeyboardEvent, index: number) {
    if ($event.key === 'Enter' || $event.key === 'Tab') {
      document.getElementById(`giName${index+1}`)?.focus();
      $event.preventDefault();
    }
  }

  /**
   * Pretty formatting of JS hours and minutes to include zeroes.
   * @param dt 
   * @returns 24 hour time ex: 15:00
   */
  formatUpdatedTime(dt: Date | string): string {
    if (typeof dt == 'string') dt = new Date(dt);
    return ("0" + dt.getHours()).slice(-2) + ':' + ("0" + dt.getMinutes()).slice(-2);
  }
}
