import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  listId: string;
  list?: List;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['listId']) {
          this.taskService.getList(params['listId']).subscribe((list: any) => {
          this.listId = params['listId'];
          })
        }
        else {
          this.list = undefined;
        }
    })
  }

  updateListClick(title: string) {
    this.taskService.updateList(this.listId, title).subscribe(() => {
      this.router.navigate([`/lists`, this.listId])
    })
  }

}
