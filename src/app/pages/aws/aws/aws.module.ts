import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AwsPageRoutingModule } from './aws-routing.module';

import { AwsPage } from './aws.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AwsPageRoutingModule,
    SharedModule,
  ],
  declarations: [AwsPage]
})
export class AwsPageModule {}
