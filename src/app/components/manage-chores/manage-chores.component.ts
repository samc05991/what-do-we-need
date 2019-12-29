import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-manage-chores',
    templateUrl: './manage-chores.component.html',
    styleUrls: ['./manage-chores.component.scss']
})
export class ManageChoresComponent implements OnInit {

    public rota = [
        {
            day: "Monday",
        },
        {
            day: "Tuesday",
        },
        {
            day: "Wednesday",
        },
        {
            day: "Thursday",
        },
        {
            day: "Friday",
        },
        {
            day: "Saturday",
        },
        {
            day: "Sunday",
        }
    ]
    
    public chores = [
        {
            name: 'Sweeping',
            order: 1,
            days: []
        }
    ];

    public users = [
        {
            name: 'Erin',
        }
    ]

    constructor() { }

    ngOnInit() {
        for(let j = 0; j < this.chores.length; j++) {
            for(let i = 0; i < this.rota.length; i++) {
                this.chores[j].days.push({index: i, day: this.rota[i], assignees: []});
            }
        }
    }

    openUser() {

    }

    addUser() {

    }

    addChore() {

    }

    assignUserToChore() {
        
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          copyArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }
}
