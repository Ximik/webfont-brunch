'use strict';

const fs = require('fs'),
      webfontsGenerator = require('webfonts-generator');

class WebfontBrunch {
  constructor(config) {
    config = config && config.plugins && config.plugins.webfont || {};
    this.src = config.src || 'app/webfont';
    delete config.src;
    this.config = Object.assign({
      dest: 'public/'
    }, config)
  }

  onCompile() {
    if (!fs.existsSync(this.src)) {
      return;
    }
    console.log("compile");
    const files = fs.readdirSync(this.src).map((f) => `${this.src}/${f}`).filter((f) => f.substr(-4) === '.svg');
    const config = Object.assign(this.config, { files });
    webfontsGenerator(config, function(error) {
      if (error) {
        throw ('webfont-brunch ' + error);
      }
    });
  }
}

WebfontBrunch.prototype.brunchPlugin = true;

module.exports = WebfontBrunch;