"use strict";

import * as vscode from "vscode";
import * as copyPaste from "copy-paste";
import * as request from "request";
import * as extension from "./Json2Ts";
let Json2Ts = extension.Json2Ts;

export function activate(context: vscode.ExtensionContext) {
    let clipboardJson2ts = vscode.commands.registerCommand("convert.json2ts", () => {
        copyPaste.paste((error, content) => {
            if (extension.isJson(content)) {
                convert(content);
            } else {
                vscode.window.showErrorMessage("Clipboard has no valid JSON content.");
            }
        });
    });

    let restJson2ts = vscode.commands.registerCommand("rest.json2ts", () => {
        copyPaste.paste((error, content) => {
            if (content && content.indexOf("http") > -1) {
                callRestService(content);
            } else {
                vscode.window.showInputBox({ prompt: "Insert your REST-Service URL." })
                    .then((userInput) => {
                        if (content && content.indexOf("http") > -1) {
                            callRestService(userInput);
                        } else {
                            vscode.window.showErrorMessage("No valid REST-Service URL.");
                        }
                    });
            }
        });

        function callRestService(url: string) {
            vscode.window.setStatusBarMessage("Call " + url + "...");
            request(url, (error, response, body) => {
                if (extension.isJson(body)) {
                    convert(body);
                } else {
                    vscode.window.showErrorMessage("REST-Service has no valid JSON result.");
                }
            });
        }
    });

    context.subscriptions.push(clipboardJson2ts, restJson2ts);
}

function convert(content: string) {
    vscode.window.setStatusBarMessage("Convert JSON to TypeScript interfaces...");

    let json2ts = new Json2Ts();
    let result = json2ts.convert(content);

    vscode.window.activeTextEditor.edit((editBuilder) => {
        let startLine = vscode.window.activeTextEditor.selection.start.line;
        let lastCharIndex = vscode.window.activeTextEditor.document.lineAt(startLine).text.length;
        let position = new vscode.Position(startLine, lastCharIndex);
        editBuilder.insert(position, result);

        vscode.window.setStatusBarMessage("Here are your TypeScript interfaces... Enjoy! :)");
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}