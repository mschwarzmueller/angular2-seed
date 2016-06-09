import { Component } from "@angular/core";

import { OtherComponent } from './other/other.component';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    directives: [OtherComponent]
})
export class AppComponent {

}