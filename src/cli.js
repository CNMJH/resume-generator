#!/usr/bin/env node

/**
 * 命令行界面
 */

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs').promises;
const path = require('path');
const ResumeBuilder = require('./index');

program
  .name('resume-gen')
  .description('AI 驱动的简历生成器')
  .version('1.0.0');

// 交互式创建简历
program
  .command('create')
  .description('交互式创建简历')
  .option('-t, --template <name>', '选择模板', 'modern')
  .option('-o, --output <dir>', '输出目录', './output')
  .action(async (options) => {
    console.log(chalk.blue('🚀 欢迎使用简历生成器！\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '姓名:',
        validate: input => input.length > 0 || '请输入姓名'
      },
      {
        type: 'input',
        name: 'title',
        message: '职位头衔:',
        default: '软件工程师'
      },
      {
        type: 'input',
        name: 'email',
        message: '邮箱:',
        validate: input => /\S+@\S+\.\S+/.test(input) || '请输入有效邮箱'
      },
      {
        type: 'input',
        name: 'phone',
        message: '电话:'
      },
      {
        type: 'input',
        name: 'location',
        message: '所在地:'
      },
      {
        type: 'input',
        name: 'website',
        message: '个人网站/GitHub:'
      },
      {
        type: 'input',
        name: 'summary',
        message: '个人简介（可选，留空自动生成）:'
      },
      {
        type: 'checkbox',
        name: 'skills',
        message: '选择技能:',
        choices: [
          'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
          'Node.js', 'Python', 'Java', 'Go', 'Rust',
          'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
          'Docker', 'Kubernetes', 'AWS', 'Azure',
          'Machine Learning', 'TensorFlow', 'OpenAI'
        ]
      }
    ]);

    // 工作经历
    const experience = [];
    let addMore = true;
    while (addMore) {
      const job = await inquirer.prompt([
        {
          type: 'input',
          name: 'company',
          message: '公司名称:'
        },
        {
          type: 'input',
          name: 'position',
          message: '职位:'
        },
        {
          type: 'input',
          name: 'startDate',
          message: '开始日期 (YYYY-MM):'
        },
        {
          type: 'input',
          name: 'endDate',
          message: '结束日期 (YYYY-MM 或 至今):'
        },
        {
          type: 'input',
          name: 'description',
          message: '工作描述:'
        }
      ]);
      
      if (job.company) {
        experience.push({
          ...job,
          endDate: job.endDate === '至今' ? null : job.endDate
        });
      }
      
      const { continue: cont } = await inquirer.prompt([{
        type: 'confirm',
        name: 'continue',
        message: '添加更多工作经历?',
        default: false
      }]);
      addMore = cont;
    }

    answers.experience = experience;

    // 生成简历
    console.log(chalk.yellow('\n⏳ 正在生成简历...'));
    
    try {
      const builder = new ResumeBuilder({
        template: options.template
      });
      
      const result = await builder.build(answers);
      
      console.log(chalk.green('\n✅ 简历生成成功！'));
      console.log(chalk.cyan(`📄 PDF: ${result.pdfPath}`));
      
    } catch (error) {
      console.error(chalk.red('\n❌ 生成失败:'), error.message);
      process.exit(1);
    }
  });

// 从 JSON 文件生成
program
  .command('build <file>')
  .description('从 JSON 文件生成简历')
  .option('-t, --template <name>', '选择模板', 'modern')
  .action(async (file, options) => {
    try {
      const data = JSON.parse(await fs.readFile(file, 'utf-8'));
      
      console.log(chalk.yellow('⏳ 正在生成简历...'));
      
      const builder = new ResumeBuilder({
        template: options.template
      });
      
      const result = await builder.build(data);
      
      console.log(chalk.green('\n✅ 简历生成成功！'));
      console.log(chalk.cyan(`📄 PDF: ${result.pdfPath}`));
      
    } catch (error) {
      console.error(chalk.red('❌ 错误:'), error.message);
      process.exit(1);
    }
  });

// 列出可用模板
program
  .command('templates')
  .description('列出可用模板')
  .action(async () => {
    const TemplateEngine = require('./template');
    const engine = new TemplateEngine();
    const templates = await engine.listTemplates();
    
    console.log(chalk.blue('可用模板:\n'));
    templates.forEach(t => console.log(`  • ${t}`));
  });

program.parse();
