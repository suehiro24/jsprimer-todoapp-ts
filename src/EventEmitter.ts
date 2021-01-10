type ListenerSetType = Set<() => void>;

export class EventEmitter {
    protected listeners: Map<string, ListenerSetType>;

    constructor() {
        // 登録する [イベント名, Set(リスナー関数)] を管理するMap
        this.listeners = new Map();
    }

    /**
     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type: string, listener: () => void): void {
        // 指定したイベントに対応するSetを作成しリスナー関数を登録する
        if (!this.listeners.has(type)) {
            this.listeners.set(type, new Set());
        }
        const listenerSet = this.getValidListener(type);
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチする
     * @param {string} type イベント名
     */
    emit(type: string): void {
        // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
        const listenerSet = this.getValidListener(type);
        listenerSet.forEach((listener) => {
            // console.log(this);  // どこのthisを渡しているのか確認( = emitが実行された場所のthis)

            // emitメソッドが呼ばれた場所のthisを明示的に使用してリスナー関数を実行
            listener.call(this);
        });
    }

    /**
     * 指定したイベントのイベントリスナーを解除する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    removeEventListener(type: string, listener: () => void): void {
        // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
        const listenerSet = this.getValidListener(type);
        listenerSet.forEach((ownListener) => {
            if (ownListener === listener) {
                listenerSet.delete(listener);
            }
        });
    }

    /**
     * 指定したイベントのリスナー関数の存在を確認して取得する
     * @param {string} type イベント名
     */
    private getValidListener(type: string): ListenerSetType {
        const listenerSet = this.listeners.get(type);
        if (!listenerSet)
            throw new Error(`${type}がイベントリスナーに登録されていません。`);
        return listenerSet;
    }
}
