class Task{
    Id: string;
    Description: string;
    IdColumn: string;

    constructor(id:string, description:string, idColumn:string){
        this.Id=id;
        this.Description=description;
        this.IdColumn=idColumn;
    }
}

export default Task;