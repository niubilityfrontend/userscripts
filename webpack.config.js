const path = require('path');
const glob = require('glob')

const WebpackUserscript = require('webpack-userscript')
const dev = true; // process.env.NODE_ENV === 'development'
const parseMeta = require('./src/../libs/parseMeta');
const fs = require('fs');


let entry =
  glob.sync(path.resolve('./src/*/*.@(js|es6|mjs|cjs|ts)')).reduce((entries, entry) => {
    const entryName = path.parse(entry).name
    entries[entryName] = entry
    return entries
  }, {});

module.exports = {
  mode: 'development',
  entry,
  //watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    clean: true,
    chunkFilename: '[name].js'
  },


  plugins: [
    new WebpackUserscript({
      headers: function (data) {
        let origionpath = entry[data.chunkName];
        if (!fs.existsSync(origionpath)) {
          console.log(data);
          console.log(`--${data.chunkName}  --  ${entry[data.chunkName]}  
          
          END-------------------------
          `);
          return {};
        } else {
          return parseMeta(fs.readFileSync(origionpath, 'utf8'));
        }
      },
      pretty: false,
      metajs: false
    })
  ]
};