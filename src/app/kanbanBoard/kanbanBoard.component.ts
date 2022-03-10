import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  newTask='';
  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  forwardClick(data){
    if(data.stage == 0){
  data.stage = 1;

} else if(data.stage == 1){
  data.stage = 2;
} else if(data.stage == 2){
  data.stage = 3;
}
this.configureTasksForRendering();

  }
  backwardClick(data){
    console.log(data);
    if(data.stage == 3){
      data.stage = 2;
    
    } else if(data.stage == 2){
      data.stage = 1;
    
    } else if(data.stage == 1){
      data.stage = 0;
    }
    this.configureTasksForRendering();
    
      }
      validateTask(data){
         if(data.stage == 0){
          return true;
        }
      }
      validateForwardTask(data){
        if(data.stage == 3){
          return true;
        }
      }
      deleteClick(data){
const index = this.tasks.indexOf(data);
         this.tasks.splice(index,1);
        this.configureTasksForRendering();
      
      }
  createTask() {
   if(this.newTask!= ''){ 
     this.tasks.push({name:this.newTask,stage:0});
    this.configureTasksForRendering();
    this.newTask = '';
  }

  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}