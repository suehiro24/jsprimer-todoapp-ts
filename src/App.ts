import { render } from "./view/html-util";
import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListView } from "./view/TodoListView";
import { UpdateInputType, OnUpdateTodoType, DeleteInputType, OnDeleteTodoType } from "./ListenerFunctionType";

export class App {
    todoListModel: TodoListModel;

    constructor() {
        this.todoListModel = new TodoListModel();
    }

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title: string): void {
        this.todoListModel.addTodo(
            new TodoItemModel({ title, completed: false })
        );
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
    handleUpdate({ id, completed }: UpdateInputType): void {
        this.todoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */
    handleDelete({ id }: DeleteInputType): void {
        this.todoListModel.deleteTodo({ id });
    }

    mount(): void {
        const formElement = document.querySelector("#js-form");
        if (!formElement) {
            return console.log(`js-formをidにもつ要素が見つかりませんでした。`);
        }

        const inputElement: HTMLInputElement | null = document.querySelector(
            "input[id='js-form-input']"
        );
        if (!inputElement) {
            return console.log(
                `js-form-inputをidにもつ要素が見つかりませんでした。`
            );
        }

        const containerElement = document.querySelector("#js-todo-list");
        if (!containerElement) {
            return console.log(
                "js-todo-listをidにもつ要素が見つかりませんでした。"
            );
        }

        const todoItemCountElement = document.querySelector("#js-todo-count");
        if (!todoItemCountElement) {
            return console.log(
                "js-todo-countをidにもつ要素が見つかりませんでした。"
            );
        }

        // Todoリスト変更時のリスナー関数を登録
        this.todoListModel.onChange(() => {
            // リストの更新と再表示
            const todoItems = this.todoListModel.getTodoItems();
            const todoListView = new TodoListView();

            const onUpdateTodo: OnUpdateTodoType = ({ id, completed }) => {
                this.handleUpdate({ id, completed });
            }
            const onDeleteTodo: OnDeleteTodoType = ({ id }) => {
                this.handleDelete({ id });
            }
            const todoListElement = todoListView.createElement(todoItems, {
                onUpdateTodo: onUpdateTodo,
                onDeleteTodo: onDeleteTodo,
            });

            render(todoListElement, containerElement);

            // Todoアイテム数の更新と再表示
            todoItemCountElement.textContent = `Todoアイテム数：${this.todoListModel.getTotalCount()}`;
        });

        // Todo追加時の処理
        formElement.addEventListener("submit", (e) => {
            // ページのリロードを防ぐ
            e.preventDefault();

            // TodoモデルをListモデルに追加
            this.handleAdd(inputElement.value);

            inputElement.value = "";
        });
    }
}
