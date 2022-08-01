import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Itask } from '../model/task';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup
  updateIndex!:any
  isEditEnable:boolean = false
  
  Tasks : Itask [] = []
  Tasksdata:any = localStorage.getItem("Tasks")
  tasks_data:any
  
  Inprogress : Itask [] = []
  Inprogressdata: any = localStorage.getItem("Inprogress")
  inprogress_data:any

  Done: Itask [] = []
  Donedata:any = localStorage.getItem("Done")
  done_data:any

  constructor(private fb:  FormBuilder) {}

  ngOnInit(): void {
      this.todoForm = this.fb.group({
        item :['', Validators.required]
      })
      this.tasks_data = JSON.parse(this.Tasksdata)
      this.inprogress_data = JSON.parse(this.Inprogressdata)
      this.done_data = JSON.parse(this.Donedata)

      if(this.tasks_data !== null || this.inprogress_data !== null || this.done_data !== null){
        if(this.tasks_data.length >0 || this.inprogress_data.length > 0 ||this.done_data.length > 0 ){
            this.myFunction()
        }
      }
    }

  myFunction(){
    console.log(this.tasks_data.length)
      for(let i = 0; i<this.tasks_data.length; i++){
        this.Tasks.push(this.tasks_data[i])
      }

      for(let i = 0; i<this.inprogress_data.length; i++){
        this.Inprogress.push(this.inprogress_data[i])
      }

      for(let i = 0; i<this.done_data.length; i++){
        this.Done.push(this.done_data[i])
      }

  }


  Add_task(){
    this.Tasks.push ({
      task :this.todoForm.value.item
    })
    localStorage.setItem("Tasks",JSON.stringify(this.Tasks));
    this.todoForm.reset()
  }

  Update_task(){
    this.Tasks[this.updateIndex].task = this.todoForm.value.item
    this.todoForm.reset()
    this.updateIndex = undefined
    this.isEditEnable = false
    this.Rechanhe()
  }
  
  deleteTask(i: number){
    this.Tasks.splice(i,1)
    this.Rechanhe()
  }

  editTask(item:Itask, i:number){
    this.todoForm.controls['item'].setValue(item.task)
    this.updateIndex = i
    this.isEditEnable = true
    this.Rechanhe()
  }

  deleteInprogressTask(i:number){
    this.Inprogress.splice(i,1)
    this.Rechanhe()
  }

  deleteDoneTask(i:number){
    this.Done.splice(i,1)
    this.Rechanhe()
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.Rechanhe()
  }

  Rechanhe(){
    localStorage.removeItem("Tasks");
    localStorage.removeItem("Inprogress");
    localStorage.removeItem("Done");

      localStorage.setItem("Tasks",JSON.stringify(this.Tasks))
      localStorage.setItem("Inprogress",JSON.stringify(this.Inprogress))
      localStorage.setItem("Done",JSON.stringify(this.Done))
  }  

}
