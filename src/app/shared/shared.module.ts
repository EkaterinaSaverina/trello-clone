import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        FormsModule,
        HttpClientModule,
        MaterialModule,
        HeaderComponent,
    ]
})
export class SharedModule { }
