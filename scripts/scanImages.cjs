const fs = require('fs');
const path = require('path');

const rootFolder = path.resolve(__dirname, '../public/images'); // 图片文件夹
const outputFile = path.resolve(__dirname, '../src/assets/imageData.json');

function isImageFile(filename) {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
}

function scanImageFolders(root) {
    const folders = fs.readdirSync(root, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory());

    const result = folders.map(folder => {
        const folderPath = path.join(root, folder.name);
        const files = fs.readdirSync(folderPath).filter(isImageFile);
        return {
            folder: folder.name,
            images: files
        };
    });

    return result;
}

function run() {
    const data = scanImageFolders(rootFolder);
    fs.mkdirSync(path.dirname(outputFile), {recursive: true});
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
}

run();
