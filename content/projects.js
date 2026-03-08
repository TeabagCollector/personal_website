/**
 * 项目作品数据
 * 修改此文件即可更新页面，无需改动 HTML 结构。
 *
 * 示例格式：
 * {
 *     title: "项目名称",
 *     description: "项目简介，一两句话描述。",
 *     meta: ["Python", "标签2"],     // 技术栈/标签，会以灰色小字展示
 *     href: "https://github.com/xxx" // 点击跳转链接
 * }
 */
window.PROJECTS_DATA = [
    {
        title: "Rough Volatility 复刻（Gatheral 2014）",
        description: "完整复现 rough volatility 建模流程：MUZ 高频 tick 方差代理 → Hurst 变差估计 → RFSV 区间积分核预测。支持沪深300与 AEX 荷指对比，验证模型在不同市场的适用性。含变差图、P-ratio 评估及 AR/HAR 基准。",
        meta: ["Python", "MUZ", "Hurst", "RFSV", "Quantitative Finance"],
        href: "https://github.com/TeabagCollector/rough_volatility_construction"
    },
    {
        title: "北京大学经济金融类题库建设平台",
        description: "北京大学金融工程实验室项目，是集题目创建、题库管理、论坛讨论等功能于一体的在线学习平台，接入大语言模型在多环节进行辅助。同时致力于创建高质量大语言模型经济金融类知识测试题库。（需北大内网访问）",
        meta: ["Typescript", "Vite", "React", "Python"],
        href: "http://222.29.71.12:3000"
    },
];

window.PROJECTS_DATA_EN = [
    {
        title: "Rough Volatility Replication (Gatheral 2014)",
        description: "Full pipeline: MUZ tick variance proxy → Hurst variogram → RFSV Riemann-sum prediction. CSI 300 vs AEX comparison. Variogram plots, P-ratio evaluation, AR/HAR benchmarks.",
        meta: ["Python", "MUZ", "Hurst", "RFSV", "Quantitative Finance"],
        href: "https://github.com/TeabagCollector/rough_volatility_construction"
    },
    {
        title: "Peking University Econ-Finance Question Bank Platform",
        description: "Lab project: question creation, bank management, forum. LLM-assisted. Builds high-quality econ-finance test sets for LLM evaluation. (Campus network required)",
        meta: ["Typescript", "Vite", "React", "Python"],
        href: "http://222.29.71.12:3000"
    },
];
