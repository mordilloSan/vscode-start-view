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
  // The Start view is reachable in every window, so every window needs the context keys.
  updateContext();
  context.subscriptions.push(vscode.extensions.onDidChange(updateContext));

  // Only empty windows open on Start: windows with a folder remember their own layout.
  if (vscode.workspace.workspaceFolders) return;

  if (vscode.workspace.getConfiguration('startView').get('openOnStartup')) {
    await vscode.commands.executeCommand('workbench.view.extension.startView');
  }
};
