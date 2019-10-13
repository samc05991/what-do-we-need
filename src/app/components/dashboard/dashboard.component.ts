import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({opacity: 1}),
                    animate('500ms', style({opacity: 0}))
                ])
            ]
        ),
        trigger('slideInOut', [
            state('in', style({
              overflow: 'hidden',
              height: '300px',
              width: '300px'
            })),
            state('out', style({
              opacity: '0',
              overflow: 'hidden',
              height: '0px',
              width: '0px'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
          ])
    ],
})

export class DashboardComponent implements OnInit {
    
    public lists: List[] = [];

    constructor(private _listService: ListService) {
        this.lists = this._listService.lists;
    }

    ngOnInit() {
        this._listService.updateListSubscriber.subscribe(value => {
            this.lists = this._listService.lists;
        });
    }
}
