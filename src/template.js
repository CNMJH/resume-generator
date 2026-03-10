/**
 * 模板引擎模块
 */

const Handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

class TemplateEngine {
  constructor(templateName = 'modern') {
    this.templateName = templateName;
    this.templateDir = path.join(__dirname, '..', 'templates');
  }

  /**
   * 渲染模板
   */
  async render(data) {
    const templatePath = path.join(this.templateDir, `${this.templateName}.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    
    // 注册辅助函数
    this.registerHelpers();
    
    const template = Handlebars.compile(templateContent);
    return template(data);
  }

  /**
   * 注册 Handlebars 辅助函数
   */
  registerHelpers() {
    // 条件判断
    Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
      switch (operator) {
        case '==': return v1 == v2 ? options.fn(this) : options.inverse(this);
        case '===': return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '!=': return v1 != v2 ? options.fn(this) : options.inverse(this);
        case '>': return v1 > v2 ? options.fn(this) : options.inverse(this);
        case '<': return v1 < v2 ? options.fn(this) : options.inverse(this);
        default: return options.inverse(this);
      }
    });

    // 格式化列表
    Handlebars.registerHelper('join', function(array, separator) {
      return array ? array.join(separator) : '';
    });

    // 首字母大写
    Handlebars.registerHelper('capitalize', function(str) {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    });
  }

  /**
   * 列出可用模板
   */
  async listTemplates() {
    const files = await fs.readdir(this.templateDir);
    return files
      .filter(f => f.endsWith('.hbs'))
      .map(f => path.basename(f, '.hbs'));
  }
}

module.exports = TemplateEngine;
