import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule as CdkLayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CdkLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class LayoutModule { }
