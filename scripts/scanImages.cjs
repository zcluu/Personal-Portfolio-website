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

    const allImages = [];

    const result = folders.map(folder => {
        const folderPath = path.join(root, folder.name);
        const files = fs.readdirSync(folderPath).filter(isImageFile);

        const images = files.map(file => {
            const filePath = path.join(folderPath, file);
            const stat = fs.statSync(filePath);
            const imageObj = {
                folder: folder.name,
                filename: file,
                path: `/images/${folder.name}/${file}`,
                mtime: stat.mtime
            };
            allImages.push(imageObj);
            return imageObj;
        });

        return {
            folder: folder.name,
            images
        };
    });

    return {all: result, allImages};
}


function getLatestImages(imageList, count = 8) {
    return imageList
        .sort((a, b) => b.mtime - a.mtime)
        .slice(0, count);
}

function run() {
    const {all, allImages} = scanImageFolders(rootFolder);
    const latest = getLatestImages(allImages);

    const data = {
        latest,
        all
    };

    fs.mkdirSync(path.dirname(outputFile), {recursive: true});
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
}

run();
