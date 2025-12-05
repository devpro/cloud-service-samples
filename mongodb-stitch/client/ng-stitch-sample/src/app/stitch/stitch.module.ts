import { AppMaterialModule } from './../app-material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images/images.component';

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ImagesComponent }
    ]),
    AppMaterialModule
  ]
})
export class StitchModule { }
