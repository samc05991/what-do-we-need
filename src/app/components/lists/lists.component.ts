import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})

export class ListsComponent implements OnInit {

    allNumbers: number[] = [];
    
    constructor() {
        for (let insertNumbers = 0; insertNumbers <= 100; insertNumbers++) {
            this.allNumbers.push(insertNumbers);
        }
    }

    ngOnInit() {

    }
    
    drop(event: CdkDragDrop<number[]>) {
        moveItemInArray(this.allNumbers, event.previousIndex, event.currentIndex);
    }
}
