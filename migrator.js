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
migrator.migrate = function(xmlData, callback){
    let ciraProfileObj = null;
    let amtProfileObj = createNewAMTProfile();
    if (xmlData.Profile.RCSProfileName) { amtProfileObj.ProfileName = xmlData.Profile.RCSProfileName + "_AMTConfiguration"; }
    if (xmlData.Profile.AdminCredentials.SourceForAdminPassword == "Defined"){
        amtProfileObj.AMTPassword = xmlData.Profile.AdminCredentials.AdminPassword;
    } else {
        amtProfileObj.GenerateRandomPassword = true;
    }
    if (xmlData.Profile.RCSParameters.PreferredMode) { amtProfileObj.Activation = (xmlData.Profile.RCSParameters.PreferredMode === 1 ? "acmactivate" : "ccmactivate"); }
    if (xmlData.Profile.RemoteAccess.MPSs !== undefined){
        ciraProfileObj = createNewCIRAProfile();
        if (xmlData.Profile.RCSProfileName) { ciraProfileObj.ConfigName = xmlData.Profile.RCSProfileName + "_CIRAConfiguration"; }
        if (xmlData.Profile.RemoteAccess && xmlData.Profile.RemoteAccess.MPSs && xmlData.Profile.RemoteAccess.MPSs.MPS) { 
            ciraProfileObj.MPSServerAddress = xmlData.Profile.RemoteAccess.MPSs.MPS.MPSAddress;
            ciraProfileObj.MPSPort = xmlData.Profile.RemoteAccess.MPSs.MPS.MPSaddressPort;
            if (xmlData.Profile.RemoteAccess.MPSs.MPS.MPSAuthenticationUsingCertificate == false){
                ciraProfileObj.Username = xmlData.Profile.RemoteAccess.MPSs.MPS.MPSUsername;
                ciraProfileObj.Password = xmlData.Profile.RemoteAccess.MPSs.MPS.MPSPassword;
            }
            ciraProfileObj.CommonName = xmlData.Profile.RemoteAccess.MPSs.MPS.MPSCn;
            ciraProfileObj.MPSRootCertificate = xmlData.Profile.RemoteAccess.MPSs.MPS.MPSCertificate;
        }
    }
    let migratedProfileObj = new Object();
    migratedProfileObj.AMTProfile = amtProfileObj;
    if (ciraProfileObj !== null) { migratedProfileObj.CIRAProfile = ciraProfileObj; }
    callback(migratedProfileObj);
};


module.exports = migrator;

function createNewAMTProfile(){
    let profileObj = new Object();
    profileObj.ProfileName = null;
    profileObj.AMTPassword = null;
    profileObj.GenerateRandomPassword = false;
    profileObj.RandomPasswordLength = 8;
    profileObj.Activation = null;
    profileObj.CIRAConfigName = null;
    return profileObj;
};

function createNewCIRAProfile(){
    let profileObj = new Object();
    profileObj.ConfigName = null;
    profileObj.MPSServerAddress = null;
    profileObj.MPSPort = null;
    profileObj.Username = null;
    profileObj.Password = null;
    profileObj.CommonName = null;
    profileObj.ServerAddressFormat = 201;
    profileObj.AuthMethod = 2;
    profileObj.MPSRootCertificate = null;
    profileObj.ProxyDetails = null;
    return profileObj;
}
