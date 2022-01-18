import * as vscode from 'vscode';

const fs = require('fs');
const isBin = require('isbin');

let player = {
  cmd: 'mpv',
  args: ['--msg-level=all=info'],
  titleRegex: /.*icy-title: (.*)$/,
};

export function getCustomPlayerPath() {
  return vscode.workspace.getConfiguration().get('vsoma.mpvPath', '');
}

export function getPlayer() {
  return new Promise((resolve, reject) => {
    const customPlayerPath = getCustomPlayerPath().toString();

    if (customPlayerPath !== '' && fs.existsSync(customPlayerPath)) {
      player.cmd = customPlayerPath;
      resolve(player);
    } else if (isBin(player.cmd)) {
      resolve(player);
    }

    reject(
      new Error(
        'mpv binary not found. Make sure to install it first and check your configuration.'
      )
    );
  });
}
