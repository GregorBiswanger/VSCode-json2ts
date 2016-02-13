"use strict";

import * as vscode from "vscode";
import * as copyPaste from "copy-paste";
import * as _ from "underscore";

export function activate(context: vscode.ExtensionContext) {

    console.log("Congratulations, your extension 'json2ts' is now active!");

    let disposable = vscode.commands.registerCommand("convert.json2ts", () => {
        copyPaste.paste((error, content) => {
            console.log("Original: " + content);
            if (isJson(content)) {

                let jsonContent = JSON.parse(content);
                let optionalKeys: string[] = [];

                for (let key in jsonContent) {
                    let value = jsonContent[key];

                    if (_.isArray(value)) {
                        if (value.length === 0) {
                            jsonContent[key] = "any[];";
                        } else if (_.all(value, _.isString)) {
                            jsonContent[key] = "string[];";
                        } else if (_.all(value, _.isNumber)) {
                            jsonContent[key] = "number[];";
                        } else if (_.all(value, _.isBoolean)) {
                            jsonContent[key] = "boolean[];";
                        } else {
                            jsonContent[key] = "any[];";
                        }
                    }
                    else if (_.isDate(value)) {
                        jsonContent[key] = "Date;";
                    }
                    else if (_.isString(value)) {
                        jsonContent[key] = "string;";
                    } else if (_.isBoolean(value)) {
                        jsonContent[key] = "boolean;";
                    } else if (_.isNumber(value)) {
                        jsonContent[key] = "number;";
                    } else {
                        jsonContent[key] = "any;";
                        optionalKeys.push(key);
                    }
                }

                let result = JSON.stringify(jsonContent, null, "\t")
                    .replace(new RegExp("\"", "g"), "")
                    .replace(new RegExp(",", "g"), "");

                for (let index = 0, length = optionalKeys.length; index < length; index++) {
                    let element = optionalKeys[index];
                    result = result.replace(element + ":", element + "?:");
                }

                vscode.window.activeTextEditor.edit((editBuilder) => {
                    let startLine = vscode.window.activeTextEditor.selection.start.line;
                    let lastCharIndex = vscode.window.activeTextEditor.document.lineAt(startLine).text.length;
                    let position = new vscode.Position(startLine, lastCharIndex);
                    editBuilder.insert(position, result);

                    console.log("Converted: " + result);
                });
            } else {
                vscode.window.showErrorMessage("Clipboard have no JSON content.");
            }
        });
    });

    context.subscriptions.push(disposable);
}

function isJson(stringContent) {
    try {
        JSON.parse(stringContent);
    } catch (e) {
        return false;
    }
    return true;
}

// this method is called when your extension is deactivated
export function deactivate() {
}