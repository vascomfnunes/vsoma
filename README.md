# VSoma

![VSoma](https://github.com/vascomfnunes/vsoma/blob/main/media/icon.png?raw=true)

VSoma is a Visual Studio Code extension to play [SomaFM](https://somafm.com/) radio streams from inside the editor.

[![Build](https://github.com/vascomfnunes/vsoma/actions/workflows/build.yml/badge.svg)](https://github.com/vascomfnunes/vsoma/actions/workflows/build.yml)

![](https://vsmarketplacebadge.apphb.com/version/vasco-nunes.vsoma.svg)

- [VSoma](#vsoma)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Planned](#planned)
  - [Install](#install)
  - [How to use](#how-to-use)
  - [Contributing](#contributing)
  - [About SomaFM](#about-somafm)
  - [License](#license)

## Features

- Fetch SomaFM channels list and choose which one to play.
- Caches channels information in memory.
- Statusbar indicator with the current playing channel and artist/title information.
- Integrated VSCode commands to stop/play a stream.

## Requirements

VSoma requires [mpv](https://mpv.io/) installed and accessible in your `$PATH` or with a custom path defined in Visual Studio Code extensions settings for VSoma (`Mpv path`). Leave this field empty if you already have `mpv` in your `$PATH`.

Refer to [this page](https://mpv.io/installation/) to check how to install `mpv`.

Check your settings and make sure they are correct if you find issues on `mpv` detection.

## Planned

- Better channel list caching.
- Pause/resume functionality.
- Channel favorites management.
- Support for media players other than mpv.

## Install

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter:

```bash
ext install vsoma
```

or search for it on the Extensions Activity.

## How to use

Press `F1` to open the list of commands and enter one of the following commands:

| Name | Description | ID |
| ---- | --------- | --------- |
| `VSoma: Play` | Choose a channel and play it. | `vsoma.play` |
| `VSoma: Stop` | Stop playing. | `vsoma.stop` |

You can also click over VSoma's statusbar entry to play/stop channels.

## Contributing

Code contributions are welcome. Please open a PR.

Everyone interacting in the VSoma project's codebase and issue trackers is expected to follow the [code of conduct](https://github.com/vascomfnunes/vsoma/blob/main/CODE_OF_CONDUCT.md).

## About SomaFM

[SomaFM](https://somafm.com/) is a commercial-free, listener supported radio station.

SomaFM is entirely listener-supported and independent radio. You can support SomaFM by donating or purchasing merchandise at the following page:

[http://somafm.com/support/](http://somafm.com/support/)

## License

This extension is available as open source under the terms of the [MIT License](https://github.com/vascomfnunes/vsoma/blob/main/LICENSE.txt).
