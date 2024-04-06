
import Task from "./Task";

class Board{

   Id: string;
   Tasks: Task[]
   Title: string;

   constructor(id:string, tasks:Task[], title:string){
    this.Id=id;
    this.Tasks=tasks;
    this.Title=title;
   }


}
export default Board;