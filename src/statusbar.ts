import * as vscode from 'vscode';

export class StatusBar {
  statusBar: vscode.StatusBarItem;

  constructor() {
    this.statusBar = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      Number.MIN_SAFE_INTEGER
    );
    this.set('VSoma: Ready', 'Start playing', 'vsoma.play');
    this.show();
  }

  show() {
    this.statusBar.show();
  }

  set(text: string = '', tooltip: string = '', command: string = '') {
    this.statusBar.text = text;
    this.statusBar.tooltip = tooltip;
    this.statusBar.command = command;
  }
}
