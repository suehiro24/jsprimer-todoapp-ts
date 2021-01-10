// ユニークなIDを管理する変数
let todoIdx = 0;

type TodoInitializeType = {
    title: string;
    completed: boolean;
};

export class TodoItemModel {
    id: number;
    title: string;
    completed: boolean;
    /**
     * @param {string} title Todoアイテムのタイトル
     * @param {boolean} completed Todoアイテムが完了済みならばtrue、そうでない場合はfalse
     */
    constructor({ title, completed }: TodoInitializeType) {
        // idは自動的に連番となりそれぞれのインスタンスごとに異なるものとする
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    }
}
