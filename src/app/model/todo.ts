export class Todo {
    id?: number = 0;
    description: string = '';
    constructor(id?: number, description: string = ''){
        this.description = description
        this.id = id
    }
}
