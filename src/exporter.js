/**
 * PDF 导出模块
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class PDFExporter {
  constructor(options = {}) {
    this.outputDir = options.outputDir || path.join(__dirname, '..', 'output');
  }

  /**
   * 导出 HTML 为 PDF
   */
  async export(html, filename) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // 设置 HTML 内容
      await page.setContent(html, {
        waitUntil: ['networkidle0', 'domcontentloaded']
      });

      // 确保输出目录存在
      await fs.mkdir(this.outputDir, { recursive: true });

      // 生成文件名
      const safeFilename = filename.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
      const pdfPath = path.join(this.outputDir, `${safeFilename}_简历.pdf`);

      // 导出 PDF
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      });

      return pdfPath;
    } finally {
      await browser.close();
    }
  }

  /**
   * 导出为 Markdown
   */
  async exportMarkdown(data, filename) {
    const mdContent = this.generateMarkdown(data);
    const safeFilename = filename.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
    const mdPath = path.join(this.outputDir, `${safeFilename}_简历.md`);
    
    await fs.mkdir(this.outputDir, { recursive: true });
    await fs.writeFile(mdPath, mdContent, 'utf-8');
    
    return mdPath;
  }

  /**
   * 生成 Markdown 内容
   */
  generateMarkdown(data) {
    return `# ${data.name}
${data.title} | ${data.email} | ${data.phone}

## 个人简介
${data.summary}

## 技能
${Object.entries(data.skillsByCategory || {}).map(([cat, skills]) => 
  `- **${cat}**: ${skills.join('、')}`
).join('\n')}

## 工作经历
${(data.experience || []).map(job => `
### ${job.company} - ${job.position}
${job.duration} | ${job.location || '远程'}

${job.description}

**成就:**
${(job.achievements || []).map(a => `- ${a}`).join('\n')}
`).join('\n')}

## 教育背景
${(data.education || []).map(edu => `
### ${edu.school}
${edu.degree} | ${edu.duration}
`).join('\n')}

## 项目经历
${(data.projects || []).map(proj => `
### ${proj.name}
${proj.description}

**技术栈:** ${proj.techStack?.join('、') || 'N/A'}
`).join('\n')}
`;
  }
}

module.exports = PDFExporter;
