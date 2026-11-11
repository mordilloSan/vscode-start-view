# Start View

A **Start** view in the Explorer side bar of empty VS Code windows, with quick-access buttons for getting into a project.

When you open a window with no folder, VS Code shows the built-in **No Folder Opened** view. Start View replaces it with a short list of buttons grouped by where your project lives:

| Group | Button | Shown when |
| --- | --- | --- |
| Local | Open Folder | Always |
| Local | Project Manager | [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) is installed |
| Repository | Open Remote Repository | [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) is installed |
| Repository | Clone Repository | Always |
| Remote | Remote Explorer | [Remote Explorer](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-explorer), [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) or [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) is installed |
| Remote | WSL Explorer | [WSL Manager](https://marketplace.visualstudio.com/items?itemName=jkudo.wsl-manager) is installed |

Buttons that depend on another extension appear and disappear as you install or remove it, with no reload. The view only exists in empty windows; windows with a folder or workspace open are left alone.

## Install

Build a `.vsix` from source and install it:

```sh
git clone https://github.com/mordilloSan/vscode-start-view.git
cd vscode-start-view
npx @vscode/vsce package
code --install-extension start-view-1.0.0.vsix
```

Requires VS Code 1.74 or later.

## Settings

Every setting is on by default.

| Setting | What it does |
| --- | --- |
| `startView.openOnStartup` | Open the Explorer side bar when a window starts with no folder. |
| `startView.hideNoFolderView` | Hide the built-in **No Folder Opened** view so only Start shows. |
| `startView.items.openFolder` | Show the **Open Folder** button. |
| `startView.items.projectManager` | Show the **Project Manager** button. |
| `startView.items.openRemoteRepository` | Show the **Open Remote Repository** button. |
| `startView.items.cloneRepository` | Show the **Clone Repository** button. |
| `startView.items.remoteExplorer` | Show the **Remote Explorer** button. |
| `startView.items.wslExplorer` | Show the **WSL Explorer** button. |

A group heading disappears when all of its buttons are hidden.

### Bringing back "No Folder Opened"

VS Code remembers that the built-in view was hidden, so turning off `startView.hideNoFolderView` is not enough on its own. After turning it off, open the Explorer `...` menu and tick **No Folder Opened**.
