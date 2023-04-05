# ele-handpose

An Electron application with Vue and TypesSript

该软件可以检测用户的手部、分析用户的意图、操作计算机的按键与鼠标。如鼠标的点击、拖动，键盘快捷键等，并且用户可以自定义手势对应的快捷键。使用摄像头+机器学习实现。


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ yarn install
```

### Development

由于electron运行时和开发时使用的node.js版本，导致robot.js桌面自动工具需要重新编译。直接使用*yarn dev*时报错。
需要在项目根目录执行以下命令：
```bash
./node_modules/.bin/electron-rebuild
```
从新编译robot.js模块后就可以使用下面命令在开发环境运行软件了：

```bash
$ yarn dev
```
如果robot.js模块依旧报错，可以参考一下robot.js的文档：
https://robotjs.io/docs/electron

### 如何自定义手势快捷键方案键
因为使用了robot.js控制鼠标和键盘，可以参考robot.js的使用文档：
https://robotjs.io/docs/syntax

### Build
> 功能仍然在完善中，可能因为升级了electron的版本，导致打包失败。之后会抽时间解决一些。不过在开发环境中可以玩一下
```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```
