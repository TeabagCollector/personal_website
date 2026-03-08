/**
 * 页面渲染逻辑：根据 content/*.js 的数据渲染各区块
 * 改内容只需改 content 文件，此处逻辑一般不动。
 */

(function () {
    const education = window.EDUCATION_DATA || [];
    const projects = window.PROJECTS_DATA || [];
    const skills = window.SKILLS_DATA || [];
    const experience = window.EXPERIENCE_DATA || [];

    function renderEducation(targetId, entries) {
        const target = document.getElementById(targetId);
        if (!target) return;
        target.innerHTML = "";

        entries.forEach((entry) => {
            const row = document.createElement("div");
            row.className = "item edu-item";
            row.innerHTML = `
                <div class="edu-period">${entry.period}</div>
                <div>
                    <h3 class="item-title">${entry.institution}</h3>
                    <p class="item-desc">${entry.detail}</p>
                </div>
            `;
            target.appendChild(row);
        });
    }

    function renderProjects(targetId, entries) {
        const target = document.getElementById(targetId);
        if (!target) return;
        target.innerHTML = "";

        entries.forEach((entry) => {
            const metaHtml = (entry.meta || []).map((tag) => `<span>${tag}</span>`).join("");
            const card = document.createElement("a");
            card.className = "item link-item";
            card.href = entry.href || "#";
            card.target = "_blank";
            card.rel = "noopener noreferrer";
            card.innerHTML = `
                <div class="item-header">
                    <span class="item-title">${entry.title}</span>
                    <span class="item-arrow">→</span>
                </div>
                <p class="item-desc">${entry.description}</p>
                <div class="item-meta">${metaHtml}</div>
            `;
            target.appendChild(card);
        });
    }

    function renderSkills(targetId, entries) {
        const target = document.getElementById(targetId);
        if (!target) return;

        if (!entries || entries.length === 0) {
            target.innerHTML = `<div class="placeholder">能力模块建设中：后续将补充技术栈、研究方向与工具偏好。</div>`;
            return;
        }

        target.innerHTML = "";
        entries.forEach((entry) => {
            const row = document.createElement("div");
            row.className = "item edu-item";
            const itemsHtml = Array.isArray(entry.items)
                ? entry.items.join(" · ")
                : (entry.name || String(entry));
            row.innerHTML = `
                <div class="edu-period">${entry.category || ""}</div>
                <div><p class="item-desc">${itemsHtml}</p></div>
            `;
            target.appendChild(row);
        });
    }

    function renderExperience(targetId, entries) {
        const target = document.getElementById(targetId);
        if (!target) return;

        if (!entries || entries.length === 0) {
            target.innerHTML = `<div class="placeholder">经历模块建设中：后续将补充科研、实习与跨学科实践。</div>`;
            return;
        }

        target.innerHTML = "";
        entries.forEach((entry) => {
            const row = document.createElement("div");
            row.className = "item edu-item";
            row.innerHTML = `
                <div class="edu-period">${entry.period || ""}</div>
                <div>
                    <h3 class="item-title">${entry.title || entry.company}</h3>
                    <p class="item-desc">${entry.detail || entry.description}</p>
                </div>
            `;
            target.appendChild(row);
        });
    }

    function initPage() {
        const renderEd = window.renderEducation || renderEducation;
        const renderProj = window.renderProjects || renderProjects;
        const renderSk = window.renderSkills || renderSkills;
        const renderExp = window.renderExperience || renderExperience;
        renderEd("education-list", education);
        renderProj("projects-list", projects);
        renderSk("skills-list", skills);
        renderExp("experience-list", experience);
    }

    function initNavScroll() {
        window.addEventListener("scroll", () => {
            const nav = document.getElementById("navbar");
            if (nav) {
                nav.classList.toggle("scrolled", window.scrollY > 50);
            }
        });
    }

    function init() {
        initPage();
        initNavScroll();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
