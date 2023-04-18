import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  listId: string;
  list?: List;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['listId']) {
          this.taskService.getList(params['listId']).subscribe((list: any) => {
          this.listId = params['listId'];
          })
        } else {
          this.list = undefined;
        }
    })
  }

  createTask(title: string, listId: string) {
    this.taskService.createTask(title, listId).subscribe((response: any) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
