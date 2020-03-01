const fs = require('fs');
const path = require('path');
const brand = require('../data/brand');
const product = require('../data/product');

(function main() {
    const collections = [brand, product];

    createIndex(collections)
        .then(() => {
            process.exit(0);
        })
        .catch(() => {
            process.exit(1);
        });
})();


function createIndex(collections) {
    return Promise.all(collections.map((coll) => generate(coll)));
}

function generate(collection) {
    const data = indexCollection(collection);
    return writeFileP(
        path.join(__dirname, `../src/data/${collection.name}.ts`),
        toTsModule(JSON.stringify(data, null, '  ')),
        {encoding: 'utf8'}
    );
}
function indexCollection(collection) {
    return collection.index.reduce((indexed, pk) => {
        return {
            ...indexed,
            [pk]: collection.documents.reduce((acc, doc) => {
                return {
                    ...acc,
                    [doc[pk]]: doc
                };
            }, {})
        };
    }, {collection: collection.name});
}

function toTsModule(json) {
    return `export default ${json}`;
}

function writeFileP(filename, data, option) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, option, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
