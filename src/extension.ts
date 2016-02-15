"use strict";

import * as vscode from "vscode";
import * as copyPaste from "copy-paste";
import * as extension from "./Json2Ts";
let Json2Ts = extension.Json2Ts;

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand("convert.json2ts", () => {
        copyPaste.paste((error, content) => {

            if (extension.isJson(content)) {
                let json2ts = new Json2Ts();
                let result = json2ts.convert(content);

                vscode.window.activeTextEditor.edit((editBuilder) => {
                    let startLine = vscode.window.activeTextEditor.selection.start.line;
                    let lastCharIndex = vscode.window.activeTextEditor.document.lineAt(startLine).text.length;
                    let position = new vscode.Position(startLine, lastCharIndex);
                    editBuilder.insert(position, result);
                });
            } else {
                vscode.window.showErrorMessage("Clipboard has no valid JSON content.");
            }
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}