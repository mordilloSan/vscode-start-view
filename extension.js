const vscode = require('vscode');

// Buttons that only work when another extension is installed. Each one gets a
// context key that the Start view's "when" clauses in package.json test.
const OPTIONAL = {
  'startView.hasProjectManager': ['alefragnani.project-manager'],
  'startView.hasRemoteHub': ['github.remotehub'],
  'startView.hasRemoteExplorer': ['ms-vscode.remote-explorer', 'ms-vscode-remote.remote-ssh', 'ms-vscode-remote.remote-wsl'],
  'startView.hasWslManager': ['jkudo.wsl-manager'],
};

function updateContext() {
  for (const [key, ids] of Object.entries(OPTIONAL)) {
    const installed = ids.some((id) => vscode.extensions.getExtension(id));
    vscode.commands.executeCommand('setContext', key, installed);
  }
}

exports.activate = async (context) => {
  // Only for empty windows: windows with a folder remember their own layout.
  if (vscode.workspace.workspaceFolders) return;

  updateContext();
  context.subscriptions.push(vscode.extensions.onDidChange(updateContext));

  const config = vscode.workspace.getConfiguration('startView');
  if (config.get('openOnStartup')) {
    await vscode.commands.executeCommand('workbench.view.explorer');
  }
  if (config.get('hideNoFolderView')) {
    // Hide the built-in "No Folder Opened" view so only Start shows; VS Code remembers this.
    // Fails harmlessly when it is already hidden or Start is not visible yet.
    vscode.commands.executeCommand('workbench.explorer.emptyView.removeView').then(undefined, () => {});
  }
};
