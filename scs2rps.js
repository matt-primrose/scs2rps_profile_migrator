/*
Copyright 2018-2019 Intel Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/** 
* @description scs2rps, a tool to migrate SCS XML profiles to RPS compatible JSON profiles
* @author Matt C Primrose
* @version v0.1.0
*/

const fs = require('fs');
const parser = require('fast-xml-parser');
const scs2rpsVersion = "0.1.0";
let settings = new Object();

function start(argv){
    let args = parseArguments(argv);
    if ((typeof args.xml) == 'string') { settings.xml = args.xml; }
    if ((typeof args.output) == 'string') { settings.output = args.output; }
    if (settings.xml == null || settings.output == null) { showHelp(); }
    let xmlData = null;
    let jsonObj = null;
    try {
        xmlData = fs.readFileSync(settings.xml).toString('utf8');
    } catch (e){
        console.log(e);
        exit(1);
    }
    let options = {
        attributeNamePrefix: "@_",
        attrNodeName: "attr",
        textnodeName: "#text",
        ignoreAttributes: true,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        parseNodevalue: true,
        parseAttributevalue: false,
        trimValues: true,
        cdataTagName: "__cdata",
        cdataPositionChar: "\\c",
        parseTrueNumberOnly: false,
        arraymode: false,
        stopNodes: ["parse-me-as-string"]
    };
    if (xmlData == null) { exit(1); }
    if (parser.validate(xmlData) === true) {
        jsonObj = parser.parse(xmlData, options);
    }
    

    //let tObj = parser.getTraversalObj(xmldata, options);
    //let jsonObj = parser.convertToJson(tObj, options);
    fs.writeFile(settings.output, JSON.stringify(jsonObj),function(err){
        console.log('File successfully converted.');
    })
}

function showHelp() {
    console.log('SCS2RPS Profile Migrator Tool ' + scs2rpsVersion);
    console.log('Application Help:\r\n');
    console.log('  --xml specifies the SCS profile xml file.');
    console.log('  --output specifies the output json file.');
    console.log('  example: node scs2rps.js --xml scsprofile.xml --output rcsprofile.json');
    exit();
}

function parseArguments(argv){
    let r = new Object(); 
    for (let i in argv) { 
        i = parseInt(i); 
        if (argv[i].startsWith('--') == true) { 
            let key = argv[i].substring(2).toLowerCase(); 
            let val = true; 
            if (((i + 1) < argv.length) && (argv[i + 1].startsWith('--') == false)) { 
                val = argv[i + 1];
            } 
            r[key] = val; 
        } 
    } 
    return r;
}

function exit(status){
    if (status == null) { status = 0; }
    try { process.exit(status); } catch (e) {}
}

start(process.argv);