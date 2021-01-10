export type UpdateInputType = {
    id: number;
    completed: boolean;
};

export type DeleteInputType = {
    id: number;
};

export type OnUpdateTodoType = ({ id, completed }: UpdateInputType) => void;

export type OnDeleteTodoType = ({ id }: DeleteInputType) => void;

export type ListerFunctionType = {
    onUpdateTodo: OnUpdateTodoType;
    onDeleteTodo: OnDeleteTodoType;
};
