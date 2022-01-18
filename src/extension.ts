import * as vscode from 'vscode';
import * as rm from 'typed-rest-client/RestClient';
import { getPlayer } from './player';
import { StatusBar } from './statusbar';

const childProcess = require('child_process');
const trim = require('trim');
const nodeCache = require('node-cache');
const cache = new nodeCache();

let statusBar = new StatusBar();

//Create output channel
let output = vscode.window.createOutputChannel('vsoma');

// This is the main player process handler
let playerProc: any;
let isPlaying: boolean = false;

// Create the channels interface
interface SomaFMChannels {
  channels: [title: any, description: string, playlists: [url: string]];
}

const baseApiUrl = 'https://api.somafm.com';

// Create Rest client
let rest: rm.RestClient = new rm.RestClient('get-channels', baseApiUrl);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let subscriptions = [
    vscode.commands.registerCommand('vsoma.play', async () => chooseChannel()),
    vscode.commands.registerCommand('vsoma.stop', async () => stop()),
  ];

  context.subscriptions.push(...subscriptions);
  output.appendLine('VSomaFM is now active.');
  stop();
}

// this method is called when the extension is deactivated
export function deactivate() {
  stop();
}

async function chooseChannel() {
  stop();

  statusBar.set('VSoma: Fetching channels list...');

  let res: rm.IRestResponse<SomaFMChannels>;

  // Try to fetch channels from cache
  let channels = cache.get('vsomaChannels');

  if (channels === undefined) {
    // Call the API to get SomaFM channels info
    res = await rest.get<SomaFMChannels>('channels.json');

    if (res.statusCode === 200 && res.result !== null) {
      cache.set('vsomaChannels', res.result.channels, 21600);
      channels = res.result.channels;
    } else {
      output.appendLine(`Error getting channels: ${res}`);
      statusBar.set(
        'VSoma: Error getting channels list',
        'Try again',
        'vsoma.play'
      );
      vscode.window.showErrorMessage('Error getting SomaFM channels.');

      return;
    }
  }

  // Build quickpick with channels list
  let items: vscode.QuickPickItem[] = [];

  for (let index = 0; index < channels.length; index++) {
    let item = channels[index];
    items.push({
      label: item.title,
      description: item.description,
      detail: item.playlists[0].url,
    });
  }

  vscode.window.showQuickPick(items).then(async (selection) => {
    if (!selection) {
      return;
    }

    playChannel(selection);
  });
}

async function stop() {
  if (!isPlaying) {
    return;
  }

  await playerProc.kill();
}

async function playChannel(channel: any) {
  const player: any = await getPlayer().catch((error) => {
    statusBar.set();
    vscode.window.showErrorMessage(error.message);
    return;
  });

  const args = player.args.concat(channel.detail);
  playerProc = childProcess.spawn(player.cmd, args);
  isPlaying = true;

  playerProc.stdout.on('data', (data: any) => {
    const line = trim(data.toString());
    const res = line.match(player.titleRegex);
    let title;

    if (res && (title = res[1])) {
      let intermission = title.match(
        new RegExp(`SomaFM|Big Url|${channel.label}`, 'i')
      );
      statusBar.set(
        `♫ [${channel.label}] ${intermission ? 'Intermission' : title}`,
        'Stop playing',
        'vsoma.stop'
      );
    }
  });

  playerProc.on('exit', () => {
    isPlaying = false;
    statusBar.set('VSoma: Not playing', 'Start playing', 'vsoma.play');
  });
}
