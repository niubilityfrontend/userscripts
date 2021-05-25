const path = require('path')
const glob = require('glob')
const fs = require('fs')
const extend = require("extend")
const WebpackUserscript = require('./webpackuserscript/index')
// const WebpackUserscript = require('webpack-userscript')


const {
  parseMeta,
  p,
  stringIncludesAny,
  entries,
  log
} = require('./webpack.comom')

const typmap = {
  dev: 1,
  alpha: 2,
  beta: 3,
  pro: 5,
  u1: 6,
  u2: 7
}

function getVersionString(buildtime) {

  if (typeof buildtime != 'Date')
    buildtime = new Date(buildtime)
  return `${buildtime.toString('yyyy.M')}.5${buildtime.toString('DDhhmmss')}`;
}

let wpus = new WebpackUserscript({
  headers: function (data) {
    let origionpath = entries[data.chunkName];
    p(origionpath)
    if (!fs.existsSync(origionpath)) {
      console.log(data)
      console.log(`--${data.chunkName}  --  ${entry[data.chunkName]}            
    END-------------------------
    `)
      return {};
    } else {

      let header = parseMeta(fs.readFileSync(origionpath, 'utf8'));
      var versionpath = path.resolve(path.parse(origionpath).dir, data.chunkName + '.version.json');
      var hash = data.chunkHash;
      if (process.env.WEBPACK_DEV_SERVER) {
        //开发状态下
        log.debug('开发状态下' + versionpath);
        return extend(true, {}, header, {
          version: getVersionString(data.buildTime, 'dev')
        });
      } else { // 编译状态下（开发模式或者生产模式）
        let newverstring = getVersionString(data.buildTime, 'pro');

        var newheader = {
          version: newverstring
        };

        try {
          let savedVersions = JSON.parse(fs.readFileSync(versionpath, 'utf8'));
          let savedVer = savedVersions[hash];
          if (savedVer) { // 存在此hash

            return extend(true, {}, header, {
              version: savedVer
            });
          } else {
            //hash不存在
            //keep  需要读取上次hash的版本，以及判断如果没有设置版本号，则需要生成
            var newsavedvers = Object.entries(savedVersions).reduce((pre, [key, val], i) => {
              if (i < 5) pre[key] = val;
              return pre
            }, {
              [hash]: newverstring
            });
            log.debug('hash不存在 newsavedvers：' + JSON.stringify(newsavedvers));
            fs.writeFileSync(versionpath, JSON.stringify(newsavedvers), 'utf8');
            return extend(true, {}, header, newheader);
          }

        } catch (e) {
          p(`JSON parse error, file path :${versionpath},Errors:${e} `)
          if (!fs.existsSync(versionpath)) {
            let curVersionJson = {
              [hash]: newverstring
            };
            log.debug('文件不存在' + versionpath);
            fs.writeFileSync(versionpath, JSON.stringify(curVersionJson));
          }
          return extend(true, {}, header, newheader);
        }
      }
    }
  },
  pretty: true,
  metajs: true,
  updateBaseUrl: 'https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/',
  updateBaseUrl: 'https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/',
  // proxyScript: {
  //   baseUrl: 'https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/',
  //   filename: '[chunkName].js',
  //   enable: false
  // },

});


module.exports = {

  webpackUserscript: wpus
}