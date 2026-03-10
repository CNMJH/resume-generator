/**
 * 构建脚本 - 从 JSON 生成简历
 */

const ResumeBuilder = require('../src/index');
const fs = require('fs').promises;
const path = require('path');

async function build() {
  const args = process.argv.slice(2);
  const jsonFile = args[0] || path.join(__dirname, '..', 'examples', 'sample.json');
  
  console.log('🚀 简历生成器\n');
  console.log(`📄 读取文件: ${jsonFile}`);
  
  try {
    const data = JSON.parse(await fs.readFile(jsonFile, 'utf-8'));
    
    console.log('⏳ 正在生成简历...\n');
    
    const builder = new ResumeBuilder({
      template: 'modern'
    });
    
    const result = await builder.build(data);
    
    console.log('✅ 简历生成成功！\n');
    console.log(`📄 PDF: ${result.pdfPath}`);
    console.log(`👤 姓名: ${result.data.name}`);
    console.log(`💼 职位: ${result.data.title}`);
    console.log(`📊 工作年限: ${result.data.yearsOfExperience} 年`);
    
  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    process.exit(1);
  }
}

build();
