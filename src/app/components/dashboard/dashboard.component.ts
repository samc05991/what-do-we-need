import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { faTrashAlt, faCog, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/models/item.model';
import { NeedsService } from 'src/app/services/needs.service';
import { StockService } from 'src/app/services/stock.service';

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
        )
    ],
})

export class DashboardComponent implements OnInit {
    public faTrashAlt = faTrashAlt;
    public faCog = faCog;
    public faExternalLinkAlt = faExternalLinkAlt;

    public addItemToStock: Boolean = false;

    constructor() {}
    
    ngOnInit() {}
}
