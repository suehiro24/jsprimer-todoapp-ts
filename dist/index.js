/******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/ var __webpack_modules__ = {
        /***/ "./src/App.ts":
            /*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
            /***/ function (
                __unused_webpack_module,
                exports,
                __webpack_require__
            ) {
                var __makeTemplateObject =
                    (this && this.__makeTemplateObject) ||
                    function (cooked, raw) {
                        if (Object.defineProperty) {
                            Object.defineProperty(cooked, "raw", {
                                value: raw,
                            });
                        } else {
                            cooked.raw = raw;
                        }
                        return cooked;
                    };
                Object.defineProperty(exports, "__esModule", { value: true });
                exports.App = void 0;
                var html_util_1 = __webpack_require__(
                    /*! ./html-util */ "./src/html-util.ts"
                );
                var TodoListModel_1 = __webpack_require__(
                    /*! ./model/TodoListModel */ "./src/model/TodoListModel.ts"
                );
                var TodoItemModel_1 = __webpack_require__(
                    /*! ./model/TodoItemModel */ "./src/model/TodoItemModel.ts"
                );
                var App = /** @class */ (function () {
                    function App() {
                        this.todoListModel = new TodoListModel_1.TodoListModel();
                    }
                    App.prototype.mount = function () {
                        var _this = this;
                        var formElement = document.querySelector("#js-form");
                        if (!formElement) {
                            return console.log(
                                "js-form\u3092ID\u306B\u3082\u3064\u8981\u7D20\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002"
                            );
                        }
                        var inputElement = document.querySelector(
                            "input[id='js-form-input']"
                        );
                        if (!inputElement) {
                            return console.log(
                                "js-form-input\u3092ID\u306B\u3082\u3064\u8981\u7D20\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002"
                            );
                        }
                        var containerElement = document.querySelector(
                            "#js-todo-list"
                        );
                        if (!containerElement) {
                            return console.log(
                                "js-todo-listをIDにもつ要素が見つかりませんでした。"
                            );
                        }
                        var todoItemCountElement = document.querySelector(
                            "#js-todo-count"
                        );
                        if (!todoItemCountElement) {
                            return console.log(
                                "js-todo-countをIDにもつ要素が見つかりませんでした。"
                            );
                        }
                        // Todoリスト変更時のリスナー関数を登録
                        this.todoListModel.onChange(function () {
                            // リストの更新と再表示
                            var todoListElement = html_util_1.element(
                                templateObject_1 ||
                                    (templateObject_1 = __makeTemplateObject(
                                        ["<ul />"],
                                        ["<ul />"]
                                    ))
                            );
                            var todoItems = _this.todoListModel.getTodoItems();
                            todoItems.forEach(function (item) {
                                var todoItemElement = item.completed
                                    ? html_util_1.element(
                                          templateObject_2 ||
                                              (templateObject_2 = __makeTemplateObject(
                                                  [
                                                      '<li><input type="checkbox" class="checkbox" checked><s>',
                                                      "</s></li>",
                                                  ],
                                                  [
                                                      '<li><input type="checkbox" class="checkbox" checked><s>',
                                                      "</s></li>",
                                                  ]
                                              )),
                                          item.title
                                      )
                                    : html_util_1.element(
                                          templateObject_3 ||
                                              (templateObject_3 = __makeTemplateObject(
                                                  [
                                                      '<li><input type="checkbox" class="checkbox" >',
                                                      "</li>",
                                                  ],
                                                  [
                                                      '<li><input type="checkbox" class="checkbox" >',
                                                      "</li>",
                                                  ]
                                              )),
                                          item.title
                                      );
                                todoListElement.appendChild(todoItemElement);
                            });
                            html_util_1.render(
                                todoListElement,
                                containerElement
                            );
                            // Todoアイテム数の更新と再表示
                            todoItemCountElement.textContent =
                                "Todo\u30A2\u30A4\u30C6\u30E0\u6570\uFF1A" +
                                _this.todoListModel.getTotalCount();
                        });
                        // Todo追加時の処理
                        formElement.addEventListener("submit", function (e) {
                            // ページのリロードを防ぐ
                            e.preventDefault();
                            // TodoモデルをListモデルに追加
                            _this.todoListModel.addTodo(
                                new TodoItemModel_1.TodoItemModel({
                                    title: inputElement.value,
                                    completed: false,
                                })
                            );
                            inputElement.value = "";
                        });
                    };
                    return App;
                })();
                exports.App = App;
                var templateObject_1, templateObject_2, templateObject_3;

                /***/
            },

        /***/ "./src/EventEmitter.ts":
            /*!*****************************!*\
  !*** ./src/EventEmitter.ts ***!
  \*****************************/
            /***/ (__unused_webpack_module, exports) => {
                Object.defineProperty(exports, "__esModule", { value: true });
                exports.EventEmitter = void 0;
                var EventEmitter = /** @class */ (function () {
                    function EventEmitter() {
                        // 登録する [イベント名, Set(リスナー関数)] を管理するMap
                        this.listeners = new Map();
                    }
                    /**
                     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
                     * @param {string} type イベント名
                     * @param {Function} listener イベントリスナー
                     */
                    EventEmitter.prototype.addEventListener = function (
                        type,
                        listener
                    ) {
                        // 指定したイベントに対応するSetを作成しリスナー関数を登録する
                        if (!this.listeners.has(type)) {
                            this.listeners.set(type, new Set());
                        }
                        var listenerSet = this.getValidListener(type);
                        listenerSet.add(listener);
                    };
                    /**
                     * 指定したイベントをディスパッチする
                     * @param {string} type イベント名
                     */
                    EventEmitter.prototype.emit = function (type) {
                        var _this = this;
                        // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
                        var listenerSet = this.getValidListener(type);
                        listenerSet.forEach(function (listener) {
                            // console.log(this);  // どこのthisを渡しているのか確認( = emitが実行された場所のthis)
                            // emitメソッドが呼ばれた場所のthisを明示的に使用してリスナー関数を実行
                            listener.call(_this);
                        });
                    };
                    /**
                     * 指定したイベントのイベントリスナーを解除する
                     * @param {string} type イベント名
                     * @param {Function} listener イベントリスナー
                     */
                    EventEmitter.prototype.removeEventListener = function (
                        type,
                        listener
                    ) {
                        // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
                        var listenerSet = this.getValidListener(type);
                        listenerSet.forEach(function (ownListener) {
                            if (ownListener === listener) {
                                listenerSet.delete(listener);
                            }
                        });
                    };
                    /**
                     * 指定したイベントのリスナー関数の存在を確認して取得する
                     * @param {string} type イベント名
                     */
                    EventEmitter.prototype.getValidListener = function (type) {
                        var listenerSet = this.listeners.get(type);
                        if (!listenerSet)
                            throw new Error(
                                type +
                                    "\u304C\u30A4\u30D9\u30F3\u30C8\u30EA\u30B9\u30CA\u30FC\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002"
                            );
                        return listenerSet;
                    };
                    return EventEmitter;
                })();
                exports.EventEmitter = EventEmitter;

                /***/
            },

        /***/ "./src/html-util.ts":
            /*!**************************!*\
  !*** ./src/html-util.ts ***!
  \**************************/
            /***/ (__unused_webpack_module, exports) => {
                Object.defineProperty(exports, "__esModule", { value: true });
                exports.render = exports.element = exports.htmlToElement = exports.escapeSpecialChars = void 0;
                function escapeSpecialChars(str) {
                    return str
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                }
                exports.escapeSpecialChars = escapeSpecialChars;
                /**
                 * HTML文字列からHTML要素を作成して返す
                 * @param {string} html
                 */
                function htmlToElement(html) {
                    // テンプレートタグの作成(firstElementChildメソッドを使いたい)
                    var template = document.createElement("template");
                    // エスケープ済みHTML文字列によって要素を作成
                    template.innerHTML = html;
                    if (!template.content.firstElementChild) throw new Error();
                    // テンプレートタグの中に作成した1つ目の要素を返す(HTML文字列によって指定した要素)
                    return template.content.firstElementChild;
                }
                exports.htmlToElement = htmlToElement;
                /**
                 * HTML文字列からDOM Nodeを作成して返すタグ関数
                 * @return {Element}
                 */
                function element(strings) {
                    var values = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        values[_i - 1] = arguments[_i];
                    }
                    // Escape values in template strings.
                    var htmlString = strings.reduce(function (result, str, i) {
                        var value = values[i - 1];
                        if (typeof value === "string") {
                            return result + escapeSpecialChars(value) + str;
                        } else {
                            return result + String(value) + str;
                        }
                    });
                    return htmlToElement(htmlString);
                }
                exports.element = element;
                /**
                 * コンテナ要素の中身をbodyElementで上書きする
                 * @param {Element} bodyElement コンテナ要素の中身となる要素
                 * @param {Element} containerElement コンテナ要素
                 */
                function render(bodyElement, containerElement) {
                    // containerElementの中身を空にする
                    containerElement.innerHTML = "";
                    // containerElementの直下にbodyElementを追加する
                    containerElement.appendChild(bodyElement);
                }
                exports.render = render;

                /***/
            },

        /***/ "./src/index.ts":
            /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
            /***/ (__unused_webpack_module, exports, __webpack_require__) => {
                Object.defineProperty(exports, "__esModule", { value: true });
                var App_1 = __webpack_require__(/*! ./App */ "./src/App.ts");
                var app = new App_1.App();
                app.mount();

                /***/
            },

        /***/ "./src/model/TodoItemModel.ts":
            /*!************************************!*\
  !*** ./src/model/TodoItemModel.ts ***!
  \************************************/
            /***/ (__unused_webpack_module, exports) => {
                Object.defineProperty(exports, "__esModule", { value: true });
                exports.TodoItemModel = void 0;
                // ユニークなIDを管理する変数
                var todoIdx = 0;
                var TodoItemModel = /** @class */ (function () {
                    /**
                     * @param {string} title Todoアイテムのタイトル
                     * @param {boolean} completed Todoアイテムが完了済みならばtrue、そうでない場合はfalse
                     */
                    function TodoItemModel(_a) {
                        var title = _a.title,
                            completed = _a.completed;
                        // idは自動的に連番となりそれぞれのインスタンスごとに異なるものとする
                        this.id = todoIdx++;
                        this.title = title;
                        this.completed = completed;
                    }
                    return TodoItemModel;
                })();
                exports.TodoItemModel = TodoItemModel;

                /***/
            },

        /***/ "./src/model/TodoListModel.ts":
            /*!************************************!*\
  !*** ./src/model/TodoListModel.ts ***!
  \************************************/
            /***/ function (
                __unused_webpack_module,
                exports,
                __webpack_require__
            ) {
                var __extends =
                    (this && this.__extends) ||
                    (function () {
                        var extendStatics = function (d, b) {
                            extendStatics =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (d, b) {
                                        d.__proto__ = b;
                                    }) ||
                                function (d, b) {
                                    for (var p in b)
                                        if (
                                            Object.prototype.hasOwnProperty.call(
                                                b,
                                                p
                                            )
                                        )
                                            d[p] = b[p];
                                };
                            return extendStatics(d, b);
                        };
                        return function (d, b) {
                            extendStatics(d, b);
                            function __() {
                                this.constructor = d;
                            }
                            d.prototype =
                                b === null
                                    ? Object.create(b)
                                    : ((__.prototype = b.prototype), new __());
                        };
                    })();
                Object.defineProperty(exports, "__esModule", { value: true });
                exports.TodoListModel = void 0;
                var EventEmitter_1 = __webpack_require__(
                    /*! ../EventEmitter */ "./src/EventEmitter.ts"
                );
                var TodoListModel = /** @class */ (function (_super) {
                    __extends(TodoListModel, _super);
                    /**
                     * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
                     */
                    function TodoListModel(items) {
                        if (items === void 0) {
                            items = [];
                        }
                        var _this = _super.call(this) || this;
                        _this.items = items;
                        return _this;
                    }
                    /**
                     * TodoItemの合計個数を返す
                     * @returns {number}
                     */
                    TodoListModel.prototype.getTotalCount = function () {
                        return this.items.length;
                    };
                    /**
                     * 表示できるTodoItemの配列を返す
                     * @returns {TodoItemModel[]}
                     */
                    TodoListModel.prototype.getTodoItems = function () {
                        return this.items;
                    };
                    /**
                     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
                     * @param {Function} listener
                     */
                    TodoListModel.prototype.onChange = function (listener) {
                        this.addEventListener("change", listener);
                    };
                    /**
                     * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
                     */
                    TodoListModel.prototype.emitChange = function () {
                        this.emit("change");
                    };
                    /**
                     * TodoItemを追加する
                     * @param {TodoItemModel} todoItem
                     */
                    TodoListModel.prototype.addTodo = function (todoItem) {
                        this.items.push(todoItem);
                        this.emitChange();
                    };
                    /**
                     * 指定したidのTodoItemのcompletedを更新する
                     * @param {{ id:number, completed: boolean }}
                     */
                    TodoListModel.prototype.updateTodo = function (_a) {
                        var id = _a.id,
                            completed = _a.completed;
                        // `id`が一致するTodoItemを見つけ、あるなら完了状態の値を更新する
                        var todoItem = this.items.find(function (todo) {
                            return todo.id === id;
                        });
                        if (!todoItem) {
                            return;
                        }
                        todoItem.completed = completed;
                        this.emitChange();
                    };
                    return TodoListModel;
                })(EventEmitter_1.EventEmitter);
                exports.TodoListModel = TodoListModel;

                /***/
            },

        /******/
    }; // The module cache
    /************************************************************************/
    /******/ /******/ var __webpack_module_cache__ = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ if (__webpack_module_cache__[moduleId]) {
            /******/ return __webpack_module_cache__[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {},
            /******/
        }); // Execute the module function
        /******/
        /******/ /******/ __webpack_modules__[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        ); // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
    } // startup // Load entry module
    /******/
    /************************************************************************/
    /******/ /******/ /******/ __webpack_require__("./src/index.ts");
    /******/ // This entry module used 'exports' so it can't be inlined
    /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvYXBwLy4vc3JjL0FwcC50cyIsIndlYnBhY2s6Ly90b2RvYXBwLy4vc3JjL0V2ZW50RW1pdHRlci50cyIsIndlYnBhY2s6Ly90b2RvYXBwLy4vc3JjL2h0bWwtdXRpbC50cyIsIndlYnBhY2s6Ly90b2RvYXBwLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3RvZG9hcHAvLi9zcmMvbW9kZWwvVG9kb0l0ZW1Nb2RlbC50cyIsIndlYnBhY2s6Ly90b2RvYXBwLy4vc3JjL21vZGVsL1RvZG9MaXN0TW9kZWwudHMiLCJ3ZWJwYWNrOi8vdG9kb2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvYXBwL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtFQUE4QztBQUM5Qyx1R0FBc0Q7QUFDdEQsdUdBQXNEO0FBRXREO0lBR0k7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxtQkFBSyxHQUFMO1FBQUEsaUJBMkRDO1FBMURHLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyx1SEFBNkIsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsSUFBTSxZQUFZLEdBQTRCLFFBQVEsQ0FBQyxhQUFhLENBQ2hFLDJCQUEyQixDQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FDZCw2SEFBbUMsQ0FDdEMsQ0FBQztTQUNMO1FBRUQsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNuQixPQUFPLE9BQU8sQ0FBQyxH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RztJQUNILGtDQUFVLEdBQVYsVUFBVyxFQUFtRDtZQUFqRCxFQUFFLFVBQUUsU0FBUztRQUN0Qix3Q0FBd0M7UUFDeEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7UUFDRCxRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxDQS9Ea0MsMkJBQVksR0ErRDlDO0FBL0RZLHNDQUFhOzs7Ozs7O1VDSDFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbGVtZW50LCByZW5kZXIgfSBmcm9tIFwiLi9odG1sLXV0aWxcIjtcbmltcG9ydCB7IFRvZG9MaXN0TW9kZWwgfSBmcm9tIFwiLi9tb2RlbC9Ub2RvTGlzdE1vZGVsXCI7XG5pbXBvcnQgeyBUb2RvSXRlbU1vZGVsIH0gZnJvbSBcIi4vbW9kZWwvVG9kb0l0ZW1Nb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgICB0b2RvTGlzdE1vZGVsOiBUb2RvTGlzdE1vZGVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudG9kb0xpc3RNb2RlbCA9IG5ldyBUb2RvTGlzdE1vZGVsKCk7XG4gICAgfVxuXG4gICAgbW91bnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqcy1mb3JtXCIpO1xuICAgICAgICBpZiAoIWZvcm1FbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coYGpzLWZvcm3jgpJJROOBq+OCguOBpOimgee0oOOBjOimi+OBpOOBi+OCiuOBvuOBm+OCk+OBp+OBl+OBn+OAgmApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcImlucHV0W2lkPSdqcy1mb3JtLWlucHV0J11cIlxuICAgICAgICApO1xuICAgICAgICBpZiAoIWlucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIGBqcy1mb3JtLWlucHV044KSSUTjgavjgoLjgaTopoHntKDjgYzopovjgaTjgYvjgorjgb7jgZvjgpPjgafjgZfjgZ/jgIJgXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanMtdG9kby1saXN0XCIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBcImpzLXRvZG8tbGlzdOOCkklE44Gr44KC44Gk6KaB57Sg44GM6KaL44Gk44GL44KK44G+44Gb44KT44Gn44GX44Gf44CCXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0b2RvSXRlbUNvdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjanMtdG9kby1jb3VudFwiKTtcbiAgICAgICAgaWYgKCF0b2RvSXRlbUNvdW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIFwianMtdG9kby1jb3VudOOCkklE44Gr44KC44Gk6KaB57Sg44GM6KaL44Gk44GL44KK44G+44Gb44KT44Gn44GX44Gf44CCXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUb2Rv44Oq44K544OI5aSJ5pu05pmC44Gu44Oq44K544OK44O86Zai5pWw44KS55m76YyyXG4gICAgICAgIHRoaXMudG9kb0xpc3RNb2RlbC5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyDjg6rjgrnjg4jjga7mm7TmlrDjgajlho3ooajnpLpcbiAgICAgICAgICAgIGNvbnN0IHRvZG9MaXN0RWxlbWVudCA9IGVsZW1lbnRgPHVsIC8+YDtcbiAgICAgICAgICAgIGNvbnN0IHRvZG9JdGVtcyA9IHRoaXMudG9kb0xpc3RNb2RlbC5nZXRUb2RvSXRlbXMoKTtcbiAgICAgICAgICAgIHRvZG9JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb0l0ZW1FbGVtZW50ID0gaXRlbS5jb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBlbGVtZW50YDxsaT48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjaGVja2JveFwiIGNoZWNrZWQ+PHM+JHtpdGVtLnRpdGxlfTwvcz48L2xpPmBcbiAgICAgICAgICAgICAgICAgICAgOiBlbGVtZW50YDxsaT48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjaGVja2JveFwiID4ke2l0ZW0udGl0bGV9PC9saT5gO1xuICAgICAgICAgICAgICAgIHRvZG9MaXN0RWxlbWVudC5hcHBlbmRDaGlsZCh0b2RvSXRlbUVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZW5kZXIodG9kb0xpc3RFbGVtZW50LCBjb250YWluZXJFbGVtZW50KTtcbiAgICAgICAgICAgIC8vIFRvZG/jgqLjgqTjg4bjg6DmlbDjga7mm7TmlrDjgajlho3ooajnpLpcbiAgICAgICAgICAgIHRvZG9JdGVtQ291bnRFbGVtZW50LnRleHRDb250ZW50ID0gYFRvZG/jgqLjgqTjg4bjg6DmlbDvvJoke3RoaXMudG9kb0xpc3RNb2RlbC5nZXRUb3RhbENvdW50KCl9YDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVG9kb+i/veWKoOaZguOBruWHpueQhlxuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICAvLyDjg5rjg7zjgrjjga7jg6rjg63jg7zjg4njgpLpmLLjgZBcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gVG9kb+ODouODh+ODq+OCkkxpc3Tjg6Ljg4fjg6vjgavov73liqBcbiAgICAgICAgICAgIHRoaXMudG9kb0xpc3RNb2RlbC5hZGRUb2RvKFxuICAgICAgICAgICAgICAgIG5ldyBUb2RvSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGlucHV0RWxlbWVudC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsInR5cGUgTGlzdGVuZXJTZXRUeXBlID0gU2V0PCgpID0+IHZvaWQ+O1xuXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBNYXA8c3RyaW5nLCBMaXN0ZW5lclNldFR5cGU+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIOeZu+mMsuOBmeOCiyBb44Kk44OZ44Oz44OI5ZCNLCBTZXQo44Oq44K544OK44O86Zai5pWwKV0g44KS566h55CG44GZ44KLTWFwXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaMh+WumuOBl+OBn+OCpOODmeODs+ODiOOBjOWun+ihjOOBleOCjOOBn+OBqOOBjeOBq+WRvOOBs+WHuuOBleOCjOOCi+ODquOCueODiuODvOmWouaVsOOCkueZu+mMsuOBmeOCi1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIOOCpOODmeODs+ODiOWQjVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIOOCpOODmeODs+ODiOODquOCueODiuODvFxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICAvLyDmjIflrprjgZfjgZ/jgqTjg5njg7Pjg4jjgavlr77lv5zjgZnjgotTZXTjgpLkvZzmiJDjgZfjg6rjgrnjg4rjg7zplqLmlbDjgpLnmbvpjLLjgZnjgotcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVycy5oYXModHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnNldCh0eXBlLCBuZXcgU2V0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyU2V0ID0gdGhpcy5nZXRWYWxpZExpc3RlbmVyKHR5cGUpO1xuICAgICAgICBsaXN0ZW5lclNldC5hZGQobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaMh+WumuOBl+OBn+OCpOODmeODs+ODiOOCkuODh+OCo+OCueODkeODg+ODgeOBmeOCi1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIOOCpOODmeODs+ODiOWQjVxuICAgICAqL1xuICAgIGVtaXQodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIC8vIOaMh+WumuOBl+OBn+OCpOODmeODs+ODiOOBq+WvvuW/nOOBmeOCi1NldOOCkuWPluOCiuWHuuOBl+OAgeOBmeOBueOBpuOBruODquOCueODiuODvOmWouaVsOOCkuWRvOOBs+WHuuOBmVxuICAgICAgICBjb25zdCBsaXN0ZW5lclNldCA9IHRoaXMuZ2V0VmFsaWRMaXN0ZW5lcih0eXBlKTtcbiAgICAgICAgbGlzdGVuZXJTZXQuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpOyAgLy8g44Gp44GT44GudGhpc+OCkua4oeOBl+OBpuOBhOOCi+OBruOBi+eiuuiqjSggPSBlbWl044GM5a6f6KGM44GV44KM44Gf5aC05omA44GudGhpcylcblxuICAgICAgICAgICAgLy8gZW1pdOODoeOCveODg+ODieOBjOWRvOOBsOOCjOOBn+WgtOaJgOOBrnRoaXPjgpLmmI7npLrnmoTjgavkvb/nlKjjgZfjgabjg6rjgrnjg4rjg7zplqLmlbDjgpLlrp/ooYxcbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaMh+WumuOBl+OBn+OCpOODmeODs+ODiOOBruOCpOODmeODs+ODiOODquOCueODiuODvOOCkuino+mZpOOBmeOCi1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIOOCpOODmeODs+ODiOWQjVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIOOCpOODmeODs+ODiOODquOCueODiuODvFxuICAgICAqL1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICAvLyDmjIflrprjgZfjgZ/jgqTjg5njg7Pjg4jjgavlr77lv5zjgZnjgotTZXTjgpLlj5bjgorlh7rjgZfjgIHoqbLlvZPjgZnjgovjg6rjgrnjg4rjg7zplqLmlbDjgpLliYrpmaTjgZnjgotcbiAgICAgICAgY29uc3QgbGlzdGVuZXJTZXQgPSB0aGlzLmdldFZhbGlkTGlzdGVuZXIodHlwZSk7XG4gICAgICAgIGxpc3RlbmVyU2V0LmZvckVhY2goKG93bkxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAob3duTGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJTZXQuZGVsZXRlKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5oyH5a6a44GX44Gf44Kk44OZ44Oz44OI44Gu44Oq44K544OK44O86Zai5pWw44Gu5a2Y5Zyo44KS56K66KqN44GX44Gm5Y+W5b6X44GZ44KLXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUg44Kk44OZ44Oz44OI5ZCNXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZExpc3RlbmVyKHR5cGU6IHN0cmluZyk6IExpc3RlbmVyU2V0VHlwZSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyU2V0ID0gdGhpcy5saXN0ZW5lcnMuZ2V0KHR5cGUpO1xuICAgICAgICBpZiAoIWxpc3RlbmVyU2V0KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3R5cGV944GM44Kk44OZ44Oz44OI44Oq44K544OK44O844Gr55m76Yyy44GV44KM44Gm44GE44G+44Gb44KT44CCYCk7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lclNldDtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZXNjYXBlU3BlY2lhbENoYXJzKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG59XG5cbi8qKlxuICogSFRNTOaWh+Wtl+WIl+OBi+OCiUhUTUzopoHntKDjgpLkvZzmiJDjgZfjgabov5TjgZlcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBodG1sVG9FbGVtZW50KGh0bWw6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIC8vIOODhuODs+ODl+ODrOODvOODiOOCv+OCsOOBruS9nOaIkChmaXJzdEVsZW1lbnRDaGlsZOODoeOCveODg+ODieOCkuS9v+OBhOOBn+OBhClcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICAvLyDjgqjjgrnjgrHjg7zjg5fmuIjjgb9IVE1M5paH5a2X5YiX44Gr44KI44Gj44Gm6KaB57Sg44KS5L2c5oiQXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICBpZiAoIXRlbXBsYXRlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIC8vIOODhuODs+ODl+ODrOODvOODiOOCv+OCsOOBruS4reOBq+S9nOaIkOOBl+OBnzHjgaTnm67jga7opoHntKDjgpLov5TjgZkoSFRNTOaWh+Wtl+WIl+OBq+OCiOOBo+OBpuaMh+WumuOBl+OBn+imgee0oClcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZDtcbn1cblxuLyoqXG4gKiBIVE1M5paH5a2X5YiX44GL44KJRE9NIE5vZGXjgpLkvZzmiJDjgZfjgabov5TjgZnjgr/jgrDplqLmlbBcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50KFxuICAgIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICAgIC4uLnZhbHVlczogKHN0cmluZyB8IG51bWJlcilbXVxuKTogRWxlbWVudCB7XG4gICAgLy8gRXNjYXBlIHZhbHVlcyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgIGNvbnN0IGh0bWxTdHJpbmcgPSBzdHJpbmdzLnJlZHVjZSgocmVzdWx0LCBzdHIsIGkpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaSAtIDFdO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICsgZXNjYXBlU3BlY2lhbENoYXJzKHZhbHVlKSArIHN0cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgKyBTdHJpbmcodmFsdWUpICsgc3RyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGh0bWxUb0VsZW1lbnQoaHRtbFN0cmluZyk7XG59XG5cbi8qKlxuICog44Kz44Oz44OG44OK6KaB57Sg44Gu5Lit6Lqr44KSYm9keUVsZW1lbnTjgafkuIrmm7jjgY3jgZnjgotcbiAqIEBwYXJhbSB7RWxlbWVudH0gYm9keUVsZW1lbnQg44Kz44Oz44OG44OK6KaB57Sg44Gu5Lit6Lqr44Go44Gq44KL6KaB57SgXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lckVsZW1lbnQg44Kz44Oz44OG44OK6KaB57SgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoYm9keUVsZW1lbnQ6IE5vZGUsIGNvbnRhaW5lckVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBjb250YWluZXJFbGVtZW5044Gu5Lit6Lqr44KS56m644Gr44GZ44KLXG4gICAgY29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIC8vIGNvbnRhaW5lckVsZW1lbnTjga7nm7TkuIvjgatib2R5RWxlbWVudOOCkui/veWKoOOBmeOCi1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoYm9keUVsZW1lbnQpO1xufVxuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vQXBwXCI7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmFwcC5tb3VudCgpO1xuIiwiLy8g44Om44OL44O844Kv44GqSUTjgpLnrqHnkIbjgZnjgovlpInmlbBcbmxldCB0b2RvSWR4ID0gMDtcblxudHlwZSBUb2RvSW5pdGlhbGl6ZVR5cGUgPSB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBjb21wbGV0ZWQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY2xhc3MgVG9kb0l0ZW1Nb2RlbCB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGNvbXBsZXRlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgVG9kb+OCouOCpOODhuODoOOBruOCv+OCpOODiOODq1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29tcGxldGVkIFRvZG/jgqLjgqTjg4bjg6DjgYzlrozkuobmuIjjgb/jgarjgonjgbB0cnVl44CB44Gd44GG44Gn44Gq44GE5aC05ZCI44GvZmFsc2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7IHRpdGxlLCBjb21wbGV0ZWQgfTogVG9kb0luaXRpYWxpemVUeXBlKSB7XG4gICAgICAgIC8vIGlk44Gv6Ieq5YuV55qE44Gr6YCj55Wq44Go44Gq44KK44Gd44KM44Ge44KM44Gu44Kk44Oz44K544K/44Oz44K544GU44Go44Gr55Ww44Gq44KL44KC44Gu44Go44GZ44KLXG4gICAgICAgIHRoaXMuaWQgPSB0b2RvSWR4Kys7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4uL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IHsgVG9kb0l0ZW1Nb2RlbCB9IGZyb20gXCIuL1RvZG9JdGVtTW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIFRvZG9MaXN0TW9kZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGl0ZW1zOiBUb2RvSXRlbU1vZGVsW107XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUb2RvSXRlbU1vZGVsW119IFtpdGVtc10g5Yid5pyf44Ki44Kk44OG44Og5LiA6Kan77yI44OH44OV44Kp44Or44OI44Gv56m644Gu6YWN5YiX77yJXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaXRlbXM6IFRvZG9JdGVtTW9kZWxbXSA9IFtdKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2RvSXRlbeOBruWQiOioiOWAi+aVsOOCkui/lOOBmVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0VG90YWxDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KGo56S644Gn44GN44KLVG9kb0l0ZW3jga7phY3liJfjgpLov5TjgZlcbiAgICAgKiBAcmV0dXJucyB7VG9kb0l0ZW1Nb2RlbFtdfVxuICAgICAqL1xuICAgIGdldFRvZG9JdGVtcygpOiBUb2RvSXRlbU1vZGVsW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2RvTGlzdOOBrueKtuaFi+OBjOabtOaWsOOBleOCjOOBn+OBqOOBjeOBq+WRvOOBs+WHuuOBleOCjOOCi+ODquOCueODiuODvOmWouaVsOOCkueZu+mMsuOBmeOCi1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgb25DaGFuZ2UobGlzdGVuZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnirbmhYvjgYzlpInmm7TjgZXjgozjgZ/jgajjgY3jgavlkbzjgbbjgILnmbvpjLLmuIjjgb/jga7jg6rjgrnjg4rjg7zplqLmlbDjgpLlkbzjgbPlh7rjgZlcbiAgICAgKi9cbiAgICBlbWl0Q2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVtaXQoXCJjaGFuZ2VcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9kb0l0ZW3jgpLov73liqDjgZnjgotcbiAgICAgKiBAcGFyYW0ge1RvZG9JdGVtTW9kZWx9IHRvZG9JdGVtXG4gICAgICovXG4gICAgYWRkVG9kbyh0b2RvSXRlbTogVG9kb0l0ZW1Nb2RlbCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2godG9kb0l0ZW0pO1xuICAgICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmjIflrprjgZfjgZ9pZOOBrlRvZG9JdGVt44GuY29tcGxldGVk44KS5pu05paw44GZ44KLXG4gICAgICogQHBhcmFtIHt7IGlkOm51bWJlciwgY29tcGxldGVkOiBib29sZWFuIH19XG4gICAgICovXG4gICAgdXBkYXRlVG9kbyh7IGlkLCBjb21wbGV0ZWQgfToge2lkOiBudW1iZXIsIGNvbXBsZXRlZDogYm9vbGVhbn0pOiB2b2lkIHtcbiAgICAgICAgLy8gYGlkYOOBjOS4gOiHtOOBmeOCi1RvZG9JdGVt44KS6KaL44Gk44GR44CB44GC44KL44Gq44KJ5a6M5LqG54q25oWL44Gu5YCk44KS5pu05paw44GZ44KLXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5pdGVtcy5maW5kKHRvZG8gPT4gdG9kby5pZCA9PT0gaWQpO1xuICAgICAgICBpZiAoIXRvZG9JdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdG9kb0l0ZW0uY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgICAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9
