import * as assert from "assert";
import * as vscode from "vscode";
import * as extension from "./../src/Json2Ts";
let Json2Ts = extension.Json2Ts;

suite("json2ts Tests", () => {
    test("Convert JSON-Value to String-Type", () => {
        let json = `{\n\t"Name": "Mustermann"\n}`;
        let ts = `{\n\tName: string;\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Number-Type", () => {
        let json = `{\n\t"Alter": 42\n}`;
        let ts = `{\n\tAlter: number;\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Boolean-Type", () => {
        let json = `{\n\t"maennlich": true\n}`;
        let ts = `{\n\tmaennlich: boolean;\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Any-Type", () => {
        let json = `{\n\t"Partner": null\n}`;
        let ts = `{\n\tPartner?: any;\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to String[]-Type", () => {
        let json = `{\n\t"Hobbys": ["Reiten","Golfen","Lesen"]\n}`;
        let ts = `{\n\tHobbys: string[];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Number[]-Type", () => {
        let json = `{\n\t"zahlen": [1, 3, 5]\n}`;
        let ts = `{\n\tzahlen: number[];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Boolean[]-Type", () => {
        let json = `{\n\t"booleans": [true, false, true]\n}`;
        let ts = `{\n\tbooleans: boolean[];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Any[]-Type", () => {
        let json = `{\n\t"Kinder": []\n}`;
        let ts = `{\n\tKinder: any[];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to String[][]-Type", () => {
        let json = `{\n\t"multiarrays": [["Reiten", "wohoo"], ["wohoo", "ssss"]]\n}`;
        let ts = `{\n\tmultiarrays: string[][];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Number[][]-Type", () => {
        let json = `{\n\t"multiarrays": [[4, 3], [2, 1]]\n}`;
        let ts = `{\n\tmultiarrays: number[][];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Boolean[][]-Type", () => {
        let json = `{\n\t"multiarrays": [[true, false], [false, false]]\n}`;
        let ts = `{\n\tmultiarrays: boolean[][];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to Any[][]-Type", () => {
        let json = `{\n\t"multiarrays": [[true, 5], ["Wohoo", false]]\n}`;
        let ts = `{\n\tmultiarrays: any[][];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });

    test("Convert JSON-Value to String[][][]-Type", () => {
        let json = `{\n\t"multiarrays": [[["Reiten", "wohoo"], ["wohoo", "ssss"]], [["Reiten", "wohoo"], ["wohoo", "ssss"]]]\n}`;
        let ts = `{\n\tmultiarrays: string[][][];\n}`;

        let json2ts = new Json2Ts();
        let result = json2ts.convert(json);

        assert.equal(result, ts);
    });
});