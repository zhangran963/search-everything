import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.searchChineseCharacters', async () => {
    const userInput = await vscode.window.showInputBox({
      prompt: 'Enter a regular expression for searching Chinese characters:',
      placeHolder: "'[\\u4e00-\\u9fa5]+'"
    });

    const regex = userInput || "'[\\u4e00-\\u9fa5]+'"; // 使用用户输入或默认值

    try {
      await vscode.commands.executeCommand('workbench.action.findInFiles', {
        query: regex,
        isRegex: true
      });
      // 可以在此处添加代码以显示搜索结果概览或其他反馈
    } catch (error: any) {
      vscode.window.showErrorMessage('Search failed: ' + error.message);
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
