import { NgModule } from '@angular/core';
import { MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule
    ],
    exports: [
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule
    ]
})
export class MaterialModule { }
