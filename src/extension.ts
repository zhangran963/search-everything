import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.searchChineseCharacters', async () => {
    const regex = "'[\\u4e00-\\u9fa5]+'"; // 注意转义字符
    await vscode.commands.executeCommand('workbench.action.findInFiles', {
      query: regex,
      isRegex: true
    });
  });

  context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
