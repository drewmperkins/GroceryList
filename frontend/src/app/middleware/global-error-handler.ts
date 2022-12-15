import { ErrorHandler, Injectable, Injector, Inject, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,
            public snackBar: MatSnackBar,
            private zone: NgZone,
            @Inject(DOCUMENT) public document: any,) { }
  
  handleError(error: Error | HttpErrorResponse) {
    console.error('global-error-handler:', error);
    
    if (error instanceof HttpErrorResponse) {
        this.zone.run(() => {
            this.snackBar.open(error.message, 'X', { panelClass: ['error'], duration:8000 });
        });
    }
  }
}