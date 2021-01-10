import { element } from "./html-util";
import { TodoItemView } from "./TodoItemView";
import { ListerFunctionType } from "../ListenerFunctionType";
import { TodoItemModel } from "src/model/TodoItemModel";

export class TodoListView {
    /**
     * `todoItems`に対応するTodoリストのHTML要素を作成して返す
     * @param {TodoItemModel[]} todoItems TodoItemModelの配列
     * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
     * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
     */
    createElement(
        todoItems: TodoItemModel[],
        { onUpdateTodo, onDeleteTodo }: ListerFunctionType
    ): Element {
        const todoListElement = element`<ul />`;
        // 各TodoItemモデルに対応したHTML要素を作成し、リスト要素へ追加する
        todoItems.forEach((todoItem) => {
            const todoItemView = new TodoItemView();
            const todoItemElement = todoItemView.createElement(todoItem, {
                onDeleteTodo,
                onUpdateTodo,
            });
            todoListElement.appendChild(todoItemElement);
        });
        return todoListElement;
    }
}
