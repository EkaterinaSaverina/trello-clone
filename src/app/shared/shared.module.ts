import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        FormsModule,
        HttpClientModule,
        MaterialModule,
    ]
})
export class SharedModule { }
