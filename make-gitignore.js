const fs = require('fs')

const rootIgnore = '.idea\n.git\n'    // 根 .gitignore 列表
// 写之前先清空 .gitignore 文件,同时写入根 .gitignore 列表
fs.writeFile('.gitignore', rootIgnore, (err) => {
    if (err) throw err;
    console.log(`Thev .gitignore file has been inited!`);


    fs.readdir('./', { withFileTypes: true }, (err, files) => {
        if (err) throw err

        // 循环文件
        files.forEach(file => {
            const _gitIgnorePath = file.name + '/.gitignore'
            if (file.isDirectory()) {
                fs.access(_gitIgnorePath, fs.constants.F_OK, (err) => {
                    if (!err) {
                        fs.readFile(_gitIgnorePath, 'utf8', (err, data) => {
                            if (err) throw err;

                            let _pathArray = data.split(/[\n]/)
                            const _pathArrayEdited = _pathArray.map(path => {
                                if (path[0] === '/') {
                                    return file.name + path
                                } else if (!path.includes('#') && path !== '\r' && path !== '') {
                                    return file.name + '/' + path
                                }
                            }).filter(item => item !== undefined)
                            const _writeData = `######${file.name}######\n` + _pathArrayEdited.join('\n') + '\n\n'
                            fs.writeFile('.gitignore', _writeData, { flag: 'a' }, (err) => {
                                if (err) throw err;
                                console.log(`The ${file.name} .gitignore file has been added!`);
                            });
                        });
                    }
                });
            }
        })
    })
});
