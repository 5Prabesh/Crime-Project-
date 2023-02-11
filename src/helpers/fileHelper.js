const fs = require("fs");
const path = require("path");
const crypto = require('crypto');

const removeFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

const mkDirByPathSync = (targetDir, { isRelativeToScript = false } = {}) => {
    const { sep } = path;
    const initDir = path.isAbsolute(targetDir) ? sep : "";
    const baseDir = isRelativeToScript ? __dirname : ".";

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === "EEXIST") {
                // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === "ENOENT") {
                // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ["EACCES", "EPERM", "EISDIR"].indexOf(err.code) > -1;
            if (!caughtErr || (caughtErr && targetDir === curDir)) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
};

const uploadFileToPath = (uploadConfig) => {
    const {
        file,
        absDir,
        rootDir = "public/uploads/",
        replacePreviousFile = {},
        renameFile= true
    } = uploadConfig;
    let fileName = "";
    const dir = rootDir + absDir;
    if (file) {
        mkDirByPathSync(dir);
        const image = file;
        fileName = image.name;
        const fileNameSplit = fileName.split(".");
        const ext = fileNameSplit[fileNameSplit.length - 1];
        if (!ext) {
            throw new Error("Invalid file extension.");
        }
        if(renameFile){
            fileName = `${generateRandomString(8)}`;
            fileName = `${fileName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.${ext}`;
        }
        image.mv(dir + fileName, (err) => {
            if (err) {
                fileName = "";
            }
        });
    }
    if (Object.keys(replacePreviousFile).length > 0) {
        const { fileName: previousFile } = replacePreviousFile;
        if(previousFile){
            if (fs.existsSync(dir + previousFile)) {
                fs.unlinkSync(dir + previousFile);
            }
        }

    }
    return fileName;
};

function generateRandomString(stringLength) {
    let randomString = '';
    let asciiLow = 65;
    let asciiHigh = 90;

    for (let i = 0; i < stringLength; i++) {
        let randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
        randomString += String.fromCharCode(randomAscii);
    }

    return randomString + crypto.randomBytes(6).toString("hex");

}

module.exports = {
    removeFile,
    uploadFileToPath,
    mkDirByPathSync
};
