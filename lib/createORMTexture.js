'use strict';
var cv = require('opencv4nodejs');
var path = require('path');
var Cesium = require('cesium');

var defined = Cesium.defined;

module.exports = createORMTexture;
/**
 * Create an ORM texture from separate metallic, roughness and occlusion maps.
 *
 * @param {String} metallicMapPath The path to the greyscale texture for the metallic map
 * @param {String} roughnessMapPath The path to the greyscale texture for the roughness map
 * @param {String} occlusionMapPath The path to the greyscale texture for the occlusion map
 * @param {String} outputFolderPath The path to the output folder in which we want to write the ORMTexture
 * @returns {String} The path to the map for metallicRoughnessOcclusionTexture which is created through this function
 *
 * @private
 */
function createORMTexture(metallicMapPath, roughnessMapPath, occlusionMapPath, outputFolderPath) {
    let metalnessRoughnessOcclusionPath = undefined;
    if (defined(metallicMapPath) || defined(roughnessMapPath) || defined(occlusionMapPath))
    {
        var metallicMap = defined(metallicMapPath) ? cv.imread(metallicMapPath, cv.CV_8UC1) : new cv.Mat(512, 512, cv.CV_8UC1, 0);
        var roughnessMap = defined(roughnessMapPath) ? cv.imread(roughnessMapPath, cv.CV_8UC1) : new cv.Mat(512, 512, cv.CV_8UC1, 0);
        var occlusionMap = defined(occlusionMapPath) ? cv.imread(occlusionMapPath, cv.CV_8UC1) : new cv.Mat(512, 512, cv.CV_8UC1, 0);

        var image = new cv.Mat([metallicMap, roughnessMap, occlusionMap]) //(b,g,r)

        metalnessRoughnessOcclusionPath = path.join(outputFolderPath, 'metallicRoughnessOcclusionMap.jpg');
        cv.imwrite(metalnessRoughnessOcclusionPath, image);
    }

    return metalnessRoughnessOcclusionPath;
}
