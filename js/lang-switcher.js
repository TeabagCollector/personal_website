/**
 * 语言切换逻辑：中文 / English
 * 含向上淡出 → 切换内容 → 淡入 的丝滑过渡
 */
(function() {
    const STORAGE_KEY = 'site-lang';
    const DEFAULT_LANG = 'zh';
    const DURATION = 320;

    // 注入过渡动画样式
    const style = document.createElement('style');
    style.textContent = `
        .container.lang-fade-out {
            animation: langFadeOut ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .container.lang-fade-in {
            animation: langFadeIn ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes langFadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-24px); }
        }
        @keyframes langFadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    }

    function setLang(lang, skipTransition) {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        const container = document.querySelector('.container');
        if (!container || skipTransition) {
            applyLang(lang);
            updateToggleBtn(lang);
            return;
        }

        // 1. 向上淡出
        container.classList.remove('lang-fade-in');
        container.classList.add('lang-fade-out');

        container.addEventListener('animationend', function onOut() {
            container.removeEventListener('animationend', onOut);
            container.classList.remove('lang-fade-out');

            // 2. 切换内容
            applyLang(lang);
            updateToggleBtn(lang);

            // 3. 淡入（下一帧触发，确保新内容已渲染）
            requestAnimationFrame(function() {
                container.classList.add('lang-fade-in');
                container.addEventListener('animationend', function onIn() {
                    container.removeEventListener('animationend', onIn);
                    container.classList.remove('lang-fade-in');
                }, { once: true });
            });
        }, { once: true });
    }

    function getData(lang) {
        const suffix = lang === 'en' ? '_EN' : '';
        return {
            education: window['EDUCATION_DATA' + suffix] || window.EDUCATION_DATA || [],
            projects: window['PROJECTS_DATA' + suffix] || window.PROJECTS_DATA || [],
            skills: window['SKILLS_DATA' + suffix] || window.SKILLS_DATA || [],
            experience: window['EXPERIENCE_DATA' + suffix] || window.EXPERIENCE_DATA || []
        };
    }

    function applyLang(lang) {
        const t = (window.I18N && window.I18N[lang]) || {};
        const isIndex2 = !!document.querySelector('.section-number');
        const key = isIndex2 ? 'heroIntro' : 'heroIntroIndex';

        // Hero intro
        const intro = document.querySelector('.hero-intro');
        if (intro && t[key]) intro.innerHTML = t[key];

        // Explore button
        const cta = document.querySelector('.hero-cta');
        if (cta) {
            const text = isIndex2 ? t.exploreShort : t.explore;
            if (text) cta.innerHTML = text + ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
        }

        // Section titles
        const sectionHeaders = document.querySelectorAll('.section-header');
        const titles = [t.education, t.selectedWork, t.capabilities, t.experience];
        const nums = [t.educationNum, t.selectedWorkNum, t.capabilitiesNum, t.experienceNum];
        sectionHeaders.forEach((el, i) => {
            const numEl = el.querySelector('.section-number');
            const titleEl = el.querySelector('.section-title');
            if (numEl && nums[i]) numEl.textContent = nums[i];
            if (titleEl && titles[i]) titleEl.textContent = titles[i];
        });

        // Contact dropdown labels (index.html)
        document.querySelectorAll('.contact-dropdown .contact-label').forEach((el, i) => {
            if (i === 0 && t.email) el.textContent = t.email;
            if (i === 1 && t.phone) el.textContent = t.phone;
        });

        // Re-render content
        const data = getData(lang);
        if (window.renderEducation) window.renderEducation('education-list', data.education);
        if (window.renderProjects) window.renderProjects('projects-list', data.projects);
        if (window.renderSkills) window.renderSkills('skills-list', data.skills);
        if (window.renderExperience) window.renderExperience('experience-list', data.experience);
    }

    function updateToggleBtn(lang) {
        const btn = document.getElementById('lang-toggle');
        if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';
    }

    function init() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        const btn = document.createElement('button');
        btn.id = 'lang-toggle';
        btn.className = 'nav-link lang-toggle';
        btn.textContent = getLang() === 'zh' ? 'EN' : '中文';
        btn.style.cssText = 'background:none;border:none;cursor:pointer;font:inherit;';
        btn.setAttribute('aria-label', 'Switch language');

        btn.addEventListener('click', function() {
            const next = getLang() === 'zh' ? 'en' : 'zh';
            setLang(next);
        });

        navLinks.insertBefore(btn, navLinks.firstChild);
        setLang(getLang(), true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
