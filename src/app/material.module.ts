import { NgModule } from "@angular/core";
import {MatSidenavModule,MatToolbarModule,MatListModule, MatIconModule, MatButtonModule,MatCardModule} from '@angular/material';

@NgModule({
    exports:[
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatCardModule
    ]
})

export class MaterialModule{

}