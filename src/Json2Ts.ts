import * as _ from "underscore";

export class Json2Ts {
    convert(content: string): string {
        let jsonContent = JSON.parse(content);
        let optionalKeys: string[] = [];

        for (let key in jsonContent) {
            let value = jsonContent[key];

            if (_.isArray(value)) {
                let mm = this.detectMultiArrayTypes(value);
                let arrayTypes: any = this.detectMultiArrayTypes(value);

                if (arrayTypes.length === 1) {
                    jsonContent[key] = arrayTypes[0];
                } else {
                    let multiArrayBrackets = this.getMultiArrayBrackets(value);

                    if (this.isAllEqual(arrayTypes)) {
                        jsonContent[key] = arrayTypes[0].replace("[]", multiArrayBrackets);
                    } else {
                        jsonContent[key] = "any" + multiArrayBrackets + ";";
                    }
                }

            } else if (_.isDate(value)) {
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

        return result;
    }

    detectMultiArrayTypes(value: any, valueType: string[] = []): string[] {
        if (_.isArray(value)) {
            if (value.length === 0) {
                valueType.push("any[];");
            } else if (_.isArray(value[0])) {
                for (let index = 0, length = value.length; index < length; index++) {
                    let element = value[index];

                    let valueTypeResult = this.detectMultiArrayTypes(element, valueType);
                    valueType.concat(valueTypeResult);
                }
            } else if (_.all(value, _.isString)) {
                valueType.push("string[];");
            } else if (_.all(value, _.isNumber)) {
                valueType.push("number[];");
            } else if (_.all(value, _.isBoolean)) {
                valueType.push("boolean[];");
            } else {
                valueType.push("any[];");
            }
        }

        return valueType;
    }

    isAllEqual(array: string[]) {
        return _.all(array.slice(1), _.partial(_.isEqual, array[0]));
    }

    getMultiArrayBrackets(content: string) {
        let jsonString = JSON.stringify(content);
        let brackets = "";

        for (let index = 0, length = jsonString.length; index < length; index++) {
            let element = jsonString[index];

            if (element === "[") {
                brackets = brackets + "[]";
            } else {
                index = length;
            }
        }

        return brackets;
    }
}

export function isJson(stringContent) {
    try {
        JSON.parse(stringContent);
    } catch (e) {
        return false;
    }
    return true;
}