import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-manage-chores',
    templateUrl: './manage-chores.component.html',
    styleUrls: ['./manage-chores.component.scss']
})
export class ManageChoresComponent implements OnInit {

    public rota = [
        {
            day: "Monday",
            chores: [],
        },
        {
            day: "Tuesday",
            chores: [],
        },
        {
            day: "Wednesday",
            chores: [],
        },
        {
            day: "Thursday",
            chores: [],
        },
        {
            day: "Friday",
            chores: [],
        },
        {
            day: "Saturday",
            chores: [],
        },
        {
            day: "Sunday",
            chores: [],
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

    }

    openUser() {

    }

    addUser() {

    }

    addChore() {

    }

    assignUserToChore() {
        
    }
}
