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

    public chores = [];
    public users = []
    
    public newChore = {
        name: '',
        days: []
    }

    public newUser = {
        name: '',
    }

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

    addPerson() {
        let newUser = Object.assign({}, this.newUser);

        this.users.push(newUser);

        this.newUser.name = '';
    }

    addChore() {
        let newChore = Object.assign({ order: this.chores.length }, this.newChore);

        for(let i = 0; i < this.rota.length; i++) {
            newChore.days.push({index: i, day: this.rota[i], assignees: []});
        }

        this.chores.push(newChore);

        this.newChore.name = '';
        this.newChore.days = [];
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
