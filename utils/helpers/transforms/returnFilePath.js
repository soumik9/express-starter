// single image file upload -> image path
const returnSingleFilePath = async (files) => {

    let filePath;

    if (files && Object.keys(files).length > 0) {
        if (Array.isArray(files)) {
            filePath = files[0].path;
        } else {
            filePath = files.single?.[0]?.path;
        }
    }

    return filePath;
}

// mutiple image file upload -> image paths
const returnMultipleFilePath = async (files) => {

    let imagesPaths = [];

    if (files && Object.keys(files).length > 0) {
        files.multiple.map((item) => {
            imagesPaths.push(item.path);
        })
    }

    return imagesPaths;
}

export default {
    returnSingleFilePath,
    returnMultipleFilePath,
}