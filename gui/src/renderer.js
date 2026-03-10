/**
 * Electron 渲染进程 - 前端逻辑
 */

const { ipcRenderer } = require('electron');

// 状态管理
let resumeData = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: []
};

// DOM 元素
const elements = {
  navItems: document.querySelectorAll('.nav-item'),
  sections: document.querySelectorAll('.form-section'),
  inputs: {
    name: document.getElementById('input-name'),
    title: document.getElementById('input-title'),
    email: document.getElementById('input-email'),
    phone: document.getElementById('input-phone'),
    location: document.getElementById('input-location'),
    website: document.getElementById('input-website'),
    summary: document.getElementById('input-summary')
  },
  skillTags: document.querySelectorAll('.skill-tag'),
  selectedSkills: document.getElementById('selected-skills'),
  customSkill: document.getElementById('input-custom-skill'),
  btnAddSkill: document.getElementById('btn-add-skill'),
  experienceList: document.getElementById('experience-list'),
  educationList: document.getElementById('education-list'),
  projectsList: document.getElementById('projects-list'),
  btnLoad: document.getElementById('btn-load'),
  btnSave: document.getElementById('btn-save'),
  btnLoadSample: document.getElementById('btn-load-sample'),
  btnClear: document.getElementById('btn-clear'),
  btnPreview: document.getElementById('btn-preview'),
  btnGenerate: document.getElementById('btn-generate'),
  btnAddExperience: document.getElementById('btn-add-experience'),
  btnAddEducation: document.getElementById('btn-add-education'),
  btnAddProject: document.getElementById('btn-add-project'),
  templateSelect: document.getElementById('template-select'),
  previewModal: document.getElementById('preview-modal'),
  previewFrame: document.getElementById('preview-frame'),
  loading: document.getElementById('loading'),
  toast: document.getElementById('toast')
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initInputs();
  initSkills();
  initButtons();
  initLists();
});

// 导航切换
function initNavigation() {
  elements.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      
      // 更新导航状态
      elements.navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // 切换表单区域
      elements.sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(`section-${section}`).classList.add('active');
    });
  });
}

// 输入框事件
function initInputs() {
  Object.entries(elements.inputs).forEach(([key, input]) => {
    if (input) {
      input.addEventListener('input', (e) => {
        resumeData[key] = e.target.value;
      });
    }
  });
}

// 技能选择
function initSkills() {
  // 预设技能点击
  elements.skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const skill = tag.dataset.skill;
      toggleSkill(skill);
    });
  });
  
  // 添加自定义技能
  elements.btnAddSkill.addEventListener('click', () => {
    const skill = elements.customSkill.value.trim();
    if (skill && !resumeData.skills.includes(skill)) {
      toggleSkill(skill);
      elements.customSkill.value = '';
    }
  });
  
  elements.customSkill.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      elements.btnAddSkill.click();
    }
  });
}

function toggleSkill(skill) {
  const index = resumeData.skills.indexOf(skill);
  if (index > -1) {
    resumeData.skills.splice(index, 1);
  } else {
    resumeData.skills.push(skill);
  }
  updateSelectedSkills();
  updateSkillTags();
}

function updateSelectedSkills() {
  elements.selectedSkills.innerHTML = resumeData.skills.map(skill => `
    <span class="selected-skill">
      ${skill}
      <span class="remove" onclick="removeSkill('${skill}')">&times;</span>
    </span>
  `).join('');
}

function updateSkillTags() {
  elements.skillTags.forEach(tag => {
    const skill = tag.dataset.skill;
    if (resumeData.skills.includes(skill)) {
      tag.classList.add('selected');
    } else {
      tag.classList.remove('selected');
    }
  });
}

function removeSkill(skill) {
  const index = resumeData.skills.indexOf(skill);
  if (index > -1) {
    resumeData.skills.splice(index, 1);
    updateSelectedSkills();
    updateSkillTags();
  }
}

// 列表管理
function initLists() {
  elements.btnAddExperience.addEventListener('click', () => addExperience());
  elements.btnAddEducation.addEventListener('click', () => addEducation());
  elements.btnAddProject.addEventListener('click', () => addProject());
}

function addExperience(data = {}) {
  const id = Date.now();
  const card = document.createElement('div');
  card.className = 'item-card';
  card.dataset.id = id;
  card.innerHTML = `
    <button class="remove-btn" onclick="removeItem('experience', ${id})">&times;</button>
    <div class="item-row">
      <input type="text" placeholder="公司名称" class="exp-company" value="${data.company || ''}">
      <input type="text" placeholder="职位" class="exp-position" value="${data.position || ''}">
    </div>
    <div class="item-row">
      <input type="text" placeholder="开始日期 (YYYY-MM)" class="exp-start" value="${data.startDate || ''}">
      <input type="text" placeholder="结束日期 (YYYY-MM 或 至今)" class="exp-end" value="${data.endDate || ''}">
    </div>
    <div class="item-row">
      <input type="text" placeholder="工作地点" class="exp-location" value="${data.location || ''}">
    </div>
    <div class="item-row">
      <textarea placeholder="工作描述" class="exp-desc">${data.description || ''}</textarea>
    </div>
    <div class="item-row">
      <textarea placeholder="主要成就（每行一个）" class="exp-achievements">${(data.achievements || []).join('\n')}</textarea>
    </div>
  `;
  elements.experienceList.appendChild(card);
}

function addEducation(data = {}) {
  const id = Date.now();
  const card = document.createElement('div');
  card.className = 'item-card';
  card.dataset.id = id;
  card.innerHTML = `
    <button class="remove-btn" onclick="removeItem('education', ${id})">&times;</button>
    <div class="item-row">
      <input type="text" placeholder="学校名称" class="edu-school" value="${data.school || ''}">
      <input type="text" placeholder="学位/专业" class="edu-degree" value="${data.degree || ''}">
    </div>
    <div class="item-row">
      <input type="text" placeholder="开始日期 (YYYY-MM)" class="edu-start" value="${data.startDate || ''}">
      <input type="text" placeholder="结束日期 (YYYY-MM)" class="edu-end" value="${data.endDate || ''}">
    </div>
  `;
  elements.educationList.appendChild(card);
}

function addProject(data = {}) {
  const id = Date.now();
  const card = document.createElement('div');
  card.className = 'item-card';
  card.dataset.id = id;
  card.innerHTML = `
    <button class="remove-btn" onclick="removeItem('projects', ${id})">&times;</button>
    <div class="item-row">
      <input type="text" placeholder="项目名称" class="proj-name" value="${data.name || ''}">
      <input type="text" placeholder="技术栈（逗号分隔）" class="proj-tech" value="${(data.techStack || []).join(', ')}">
    </div>
    <div class="item-row">
      <textarea placeholder="项目描述" class="proj-desc">${data.description || ''}</textarea>
    </div>
  `;
  elements.projectsList.appendChild(card);
}

function removeItem(type, id) {
  const list = type === 'experience' ? elements.experienceList :
               type === 'education' ? elements.educationList :
               elements.projectsList;
  const card = list.querySelector(`[data-id="${id}"]`);
  if (card) {
    card.remove();
  }
}

// 按钮事件
function initButtons() {
  // 加载示例
  elements.btnLoadSample.addEventListener('click', async () => {
    try {
      const data = await ipcRenderer.invoke('get-sample-data');
      loadData(data);
      showToast('示例数据已加载', 'success');
    } catch (error) {
      showToast('加载示例失败: ' + error.message, 'error');
    }
  });
  
  // 清空
  elements.btnClear.addEventListener('click', () => {
    if (confirm('确定要清空所有数据吗？')) {
      clearAll();
    }
  });
  
  // 打开文件
  elements.btnLoad.addEventListener('click', async () => {
    try {
      const data = await ipcRenderer.invoke('load-json');
      if (data) {
        loadData(data);
        showToast('数据已加载', 'success');
      }
    } catch (error) {
      showToast('加载失败: ' + error.message, 'error');
    }
  });
  
  // 保存文件
  elements.btnSave.addEventListener('click', async () => {
    try {
      const data = collectData();
      const filePath = await ipcRenderer.invoke('save-json', data, `${data.name || 'my'}-resume.json`);
      if (filePath) {
        showToast(`已保存到: ${filePath}`, 'success');
      }
    } catch (error) {
      showToast('保存失败: ' + error.message, 'error');
    }
  });
  
  // 预览
  elements.btnPreview.addEventListener('click', async () => {
    try {
      const data = collectData();
      // 这里可以生成预览 HTML
      showToast('预览功能开发中...', 'success');
    } catch (error) {
      showToast('预览失败: ' + error.message, 'error');
    }
  });
  
  // 生成 PDF
  elements.btnGenerate.addEventListener('click', async () => {
    try {
      const data = collectData();
      
      // 验证必填项
      if (!data.name || !data.title || !data.email) {
        showToast('请填写姓名、职位和邮箱', 'error');
        return;
      }
      
      elements.loading.classList.remove('hidden');
      
      const result = await ipcRenderer.invoke('generate-resume', {
        ...data,
        template: elements.templateSelect.value
      });
      
      elements.loading.classList.add('hidden');
      
      if (result.success) {
        showToast(`简历生成成功！`, 'success');
        
        // 询问是否打开
        if (confirm('简历已生成，是否打开文件？')) {
          await ipcRenderer.invoke('open-file', result.pdfPath);
        }
      } else {
        showToast('生成失败: ' + result.error, 'error');
      }
    } catch (error) {
      elements.loading.classList.add('hidden');
      showToast('生成失败: ' + error.message, 'error');
    }
  });
  
  // 关闭预览
  document.querySelector('.modal-close').addEventListener('click', () => {
    elements.previewModal.classList.remove('show');
  });
}

// 收集表单数据
function collectData() {
  const data = {
    name: elements.inputs.name.value,
    title: elements.inputs.title.value,
    email: elements.inputs.email.value,
    phone: elements.inputs.phone.value,
    location: elements.inputs.location.value,
    website: elements.inputs.website.value,
    summary: elements.inputs.summary.value,
    skills: [...resumeData.skills],
    experience: [],
    education: [],
    projects: []
  };
  
  // 收集工作经历
  elements.experienceList.querySelectorAll('.item-card').forEach(card => {
    data.experience.push({
      company: card.querySelector('.exp-company').value,
      position: card.querySelector('.exp-position').value,
      startDate: card.querySelector('.exp-start').value,
      endDate: card.querySelector('.exp-end').value === '至今' ? null : card.querySelector('.exp-end').value,
      location: card.querySelector('.exp-location').value,
      description: card.querySelector('.exp-desc').value,
      achievements: card.querySelector('.exp-achievements').value.split('\n').filter(a => a.trim())
    });
  });
  
  // 收集教育背景
  elements.educationList.querySelectorAll('.item-card').forEach(card => {
    data.education.push({
      school: card.querySelector('.edu-school').value,
      degree: card.querySelector('.edu-degree').value,
      startDate: card.querySelector('.edu-start').value,
      endDate: card.querySelector('.edu-end').value
    });
  });
  
  // 收集项目经历
  elements.projectsList.querySelectorAll('.item-card').forEach(card => {
    data.projects.push({
      name: card.querySelector('.proj-name').value,
      description: card.querySelector('.proj-desc').value,
      techStack: card.querySelector('.proj-tech').value.split(',').map(t => t.trim()).filter(t => t)
    });
  });
  
  return data;
}

// 加载数据到表单
function loadData(data) {
  // 清空现有数据
  clearAll();
  
  // 基本信息
  elements.inputs.name.value = data.name || '';
  elements.inputs.title.value = data.title || '';
  elements.inputs.email.value = data.email || '';
  elements.inputs.phone.value = data.phone || '';
  elements.inputs.location.value = data.location || '';
  elements.inputs.website.value = data.website || '';
  elements.inputs.summary.value = data.summary || '';
  
  // 技能
  resumeData.skills = data.skills || [];
  updateSelectedSkills();
  updateSkillTags();
  
  // 工作经历
  (data.experience || []).forEach(exp => addExperience(exp));
  
  // 教育背景
  (data.education || []).forEach(edu => addEducation(edu));
  
  // 项目经历
  (data.projects || []).forEach(proj => addProject(proj));
}

// 清空所有
function clearAll() {
  // 清空输入
  Object.values(elements.inputs).forEach(input => {
    if (input) input.value = '';
  });
  
  // 清空技能
  resumeData.skills = [];
  updateSelectedSkills();
  updateSkillTags();
  
  // 清空列表
  elements.experienceList.innerHTML = '';
  elements.educationList.innerHTML = '';
  elements.projectsList.innerHTML = '';
}

// 显示提示
function showToast(message, type = 'info') {
  elements.toast.textContent = message;
  elements.toast.className = `toast ${type}`;
  elements.toast.classList.add('show');
  
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}

// 暴露全局函数（供 HTML 调用）
window.removeSkill = removeSkill;
window.removeItem = removeItem;
