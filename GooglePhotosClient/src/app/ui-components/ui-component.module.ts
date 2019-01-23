import { NgModule } from "@angular/core";
import { ButtonComponent } from "./button/button.component";
import { CardComponent } from './card/card.component';

@NgModule({
    exports:[
        ButtonComponent
    ],
    declarations: [CardComponent]
})
export class UIComponentModule{}