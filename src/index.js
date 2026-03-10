const ResumeGenerator = require('./generator');
const TemplateEngine = require('./template');
const PDFExporter = require('./exporter');

class ResumeBuilder {
  constructor(options = {}) {
    this.generator = new ResumeGenerator();
    this.template = new TemplateEngine(options.template);
    this.exporter = new PDFExporter();
  }

  async build(data) {
    // 1. 验证和优化数据
    const optimizedData = this.generator.optimize(data);
    
    // 2. 渲染模板
    const html = await this.template.render(optimizedData);
    
    // 3. 导出 PDF
    const pdfPath = await this.exporter.export(html, data.name);
    
    return {
      html,
      pdfPath,
      data: optimizedData
    };
  }
}

module.exports = ResumeBuilder;
