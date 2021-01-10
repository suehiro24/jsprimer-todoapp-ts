export function escapeSpecialChars(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * HTML文字列からHTML要素を作成して返す
 * @param {string} html
 */
export function htmlToElement(html: string): Element {
    // テンプレートタグの作成(firstElementChildメソッドを使いたい)
    const template = document.createElement("template");
    // エスケープ済みHTML文字列によって要素を作成
    template.innerHTML = html;
    if (!template.content.firstElementChild) throw new Error();
    // テンプレートタグの中に作成した1つ目の要素を返す(HTML文字列によって指定した要素)
    return template.content.firstElementChild;
}

/**
 * HTML文字列からDOM Nodeを作成して返すタグ関数
 * @return {Element}
 */
export function element(
    strings: TemplateStringsArray,
    ...values: (string | number)[]
): Element {
    // Escape values in template strings.
    const htmlString = strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
    return htmlToElement(htmlString);
}

/**
 * コンテナ要素の中身をbodyElementで上書きする
 * @param {Element} bodyElement コンテナ要素の中身となる要素
 * @param {Element} containerElement コンテナ要素
 */
export function render(bodyElement: Node, containerElement: Element): void {
    // containerElementの中身を空にする
    containerElement.innerHTML = "";
    // containerElementの直下にbodyElementを追加する
    containerElement.appendChild(bodyElement);
}
