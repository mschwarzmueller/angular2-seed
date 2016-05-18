import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'my-other',
    templateUrl: 'other.template.html',
    styleUrls: ['other.styles.css']
})
export class OtherComponent {
    x = "find this";
}