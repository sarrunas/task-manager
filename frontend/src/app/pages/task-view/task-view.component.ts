import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks?: Task[];

  selectedListId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private authSerivce: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
          this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })

  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks?.filter(val => val.id !== id);
    })
  }

  onLogoutClicked() {
    this.authSerivce.logout();
  }

}
