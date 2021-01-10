import { TodoItemModel } from "src/model/TodoItemModel";
import { element } from "./html-util";
import { ListerFunctionType } from "../ListenerFunctionType";

export class TodoItemView {
    /**
     * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
     * @param {TodoItemModel} todoItem
     * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
     * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element}
     */
    createElement(
        todoItem: TodoItemModel,
        { onUpdateTodo, onDeleteTodo }: ListerFunctionType
    ): Element {
        const todoItemElement = todoItem.completed
            ? element`<li><input type="checkbox" class="checkbox" checked>
                                    <s>${todoItem.title}</s>
                                    <button class="delete">x</button>
                                </li>`
            : element`<li><input type="checkbox" class="checkbox">
                                    ${todoItem.title}
                                    <button class="delete">x</button>
                                </li>`;
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        if (!inputCheckboxElement) {
            throw new Error(
                ".checkboxをclassにもつ要素が見つかりませんでした。"
            );
        }
        inputCheckboxElement.addEventListener("change", () => {
            // コールバック関数に変更
            onUpdateTodo({
                id: todoItem.id,
                completed: !todoItem.completed,
            });
        });
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        if (!deleteButtonElement) {
            throw new Error("deleteをidにもつ要素が見つかりませんでした。");
        }
        deleteButtonElement.addEventListener("click", () => {
            // コールバック関数に変更
            onDeleteTodo({
                id: todoItem.id,
            });
        });
        // 作成したTodoアイテムのHTML要素を返す
        return todoItemElement;
    }
}
