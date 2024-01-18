import * as vscode from "vscode";

const useSearchMDN = (context: vscode.ExtensionContext) => {
  let disposable = vscode.commands.registerCommand(
    "extension.searchMDN",
    async () => {
      const apiName = await vscode.window.showInputBox({
        prompt: "Enter the name of the API to search on MDN",
      });

      if (apiName) {
        const uri = vscode.Uri.parse(
          `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(
            apiName
          )}`
        );
        vscode.env.openExternal(uri);
      }
    }
  );

  context.subscriptions.push(disposable);
};

const useSearchChineseCharacters = (context: vscode.ExtensionContext) => {
  let disposable = vscode.commands.registerCommand(
    "extension.searchChineseCharacters",
    async () => {
      const userInput = await vscode.window.showInputBox({
        prompt: "Enter a regular expression for searching Chinese characters:",
        placeHolder: "'[\\u4e00-\\u9fa5]+'",
      });

      const regex = userInput || "'[\\u4e00-\\u9fa5]+'"; // 使用用户输入或默认值

      try {
        await vscode.commands.executeCommand("workbench.action.findInFiles", {
          query: regex,
          isRegex: true,
        });
        // 可以在此处添加代码以显示搜索结果概览或其他反馈
      } catch (error: any) {
        vscode.window.showErrorMessage("Search failed: " + error.message);
      }
    }
  );

  context.subscriptions.push(disposable);
};

export function activate(context: vscode.ExtensionContext) {
	useSearchChineseCharacters(context);
	useSearchMDN(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
