import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../utilities/dialog/dialog.component';
import { SpinnerComponent } from '../utilities/spinner/spinner.component';

interface dialogData {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private dialog: MatDialog) {}

  openSpinner() {
    this.dialog.open(SpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true,
    });
  }

  closeSpinner() {
    this.dialog.closeAll();
  }

  openDialog(data: dialogData) {
    this.dialog.open(DialogComponent, {
      data,
    });
  }
}
