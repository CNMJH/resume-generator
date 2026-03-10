/**
 * 简历数据生成和优化模块
 */

class ResumeGenerator {
  constructor() {
    this.defaultData = {
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certifications: []
    };
  }

  /**
   * 优化简历数据
   */
  optimize(data) {
    return {
      ...this.defaultData,
      ...data,
      // 自动计算工作年限
      yearsOfExperience: this.calculateExperience(data.experience),
      // 技能分类
      skillsByCategory: this.categorizeSkills(data.skills),
      // 生成摘要
      summary: data.summary || this.generateSummary(data),
      // 格式化日期
      experience: this.formatDates(data.experience),
      education: this.formatDates(data.education)
    };
  }

  /**
   * 计算工作年限
   */
  calculateExperience(experience = []) {
    if (!experience.length) return 0;
    
    let totalMonths = 0;
    experience.forEach(job => {
      const start = new Date(job.startDate);
      const end = job.endDate ? new Date(job.endDate) : new Date();
      const months = (end - start) / (1000 * 60 * 60 * 24 * 30);
      totalMonths += months;
    });
    
    return Math.round(totalMonths / 12 * 10) / 10;
  }

  /**
   * 技能分类
   */
  categorizeSkills(skills = []) {
    const categories = {
      frontend: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'HTML', 'CSS', 'Sass'],
      backend: ['Node.js', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'Ruby'],
      database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
      devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Jenkins'],
      ai: ['Machine Learning', 'TensorFlow', 'PyTorch', 'OpenAI', 'LLM']
    };

    const result = {};
    skills.forEach(skill => {
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(k => skill.toLowerCase().includes(k.toLowerCase()))) {
          result[category] = result[category] || [];
          result[category].push(skill);
          return;
        }
      }
      result.other = result.other || [];
      result.other].push(skill);
    });

    return result;
  }

  /**
   * 生成个人摘要
   */
  generateSummary(data) {
    const { name, title, yearsOfExperience, skills } = data;
    const topSkills = skills?.slice(0, 3).join('、') || '';
    
    return `${name} 是一位拥有 ${yearsOfExperience} 年经验的 ${title}。` +
           `精通 ${topSkills}，致力于构建高质量、可扩展的软件解决方案。`;
  }

  /**
   * 格式化日期
   */
  formatDates(items = []) {
    return items.map(item => ({
      ...item,
      duration: this.formatDuration(item.startDate, item.endDate)
    }));
  }

  formatDuration(start, end) {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths}个月`;
    if (remainingMonths === 0) return `${years}年`;
    return `${years}年${remainingMonths}个月`;
  }
}

module.exports = ResumeGenerator;
