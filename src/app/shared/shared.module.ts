import { NgModule } from "@angular/core";
import { AlertComponentComponent } from "./alert/AlertComponent/AlertComponent.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        AlertComponentComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponentComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
})
export class SharedModule { }