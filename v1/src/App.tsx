import * as React from 'react';
import './App.css';

interface IToDo {
  text: string;
  isCompleted: boolean;
}

const MAX_TODO_LENGTH = 64;

class App extends React.Component<{}, {todos: IToDo[], currentToDoText: string}> {

  constructor(props: {}) {
    super(props);
    this.state = {
      currentToDoText: "",
      todos: [],
    }
  }

  public render() {
    const listItems = this.state.todos.map((todo, index) => {
      const textDecoration = todo.isCompleted ? "line-through" : "none";
      // tslint:disable-next-line:jsx-no-lambda
      return <li style={{textDecoration}} key={index} onClick={() => this.toggleToDo(index)}>{todo.text}</li>
    });

    return (
      <div className="App" >
        <h1>ToDo App</h1>
        <input 
          type="text" 
          maxLength={MAX_TODO_LENGTH}
          onChange={this.setCurrentToDoText} 
          value={this.state.currentToDoText}
          placeholder="Add Todo..."/>
        <button onClick={this.addTodo}>Add ToDo</button>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  private setCurrentToDoText = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({currentToDoText: event.currentTarget.value});
  }

  private addTodo = () => {
    if(this.state.currentToDoText === ""){
      window.alert("ToDo is empty!! Add some text 😬")
      return;
    }

    const currentToDos = this.state.todos;
    const newToDo = {      
      isCompleted: false,
      text: this.state.currentToDoText
    }

    this.setState({todos: [...currentToDos, newToDo], currentToDoText: ""});
  }

  private toggleToDo = (toDoIndex: number) => {
    const newToDoList = [...this.state.todos];
    newToDoList[toDoIndex].isCompleted = !newToDoList[toDoIndex].isCompleted;
    this.setState({todos: newToDoList});
  }
}

export default App;
