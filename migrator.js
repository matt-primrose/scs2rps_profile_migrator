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
* @description migrator, module that understands RPS supported AMT configuration and maps SCS profile to RPS schema
* @author Matt C Primrose
* @version v0.1.0
*/

let migrator = new Object();
migrator.migrate = function(xmlData){
    let jsonObj = new Object();
    let ptr = null;
    
};


module.exports = migrator;

const SupportedFields = [
    {
        name:"Profile",
        subfields:["RCSParameters", "AdminCredentials", "EnvironmentDetection", "RemoteAccess"]
    },
    {
        name:"RCSParameters",
        subfields:["PreferredMode"]
    },
    {
        name:"AdminCredentials",
        subfields:["AdminPassword"]
    },
    {
        name:"EnvironmentDetection",
        subfields:["Suffix", "AllowVPN"]
    },
    {
        name:"RemoteAccess",
        subfields:["MPSs","RemoteAccessPolicies"]
    },
    {
        name:"MPSs",
        subfields:["MPS"]
    },
    {
        name:"MPS",
        subfields:["MPSAddress", "MPSId", "MPSaddressPort", "MPSUsername", "MPSPassword"]
    },
    {
        name:"RemoteAccessPolicies",
        subfields:["RemoteAccessPolicy"]
    },
    {
        name:"RemoteAccessPolicy",
        subfields:["RemoteAccessPolicyName", "AlertTrigger", "PeriodicTrigger", "UserTrigger", "PrimaryMps", "TimeBetweenConn", "TunnelLifeTime"]
    }
];
function getFieldData(key, data){

};
