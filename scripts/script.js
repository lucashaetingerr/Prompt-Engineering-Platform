const titleEl = document.getElementById('lessonTitle');
const metaEl = document.getElementById('lessonMeta');
const contentEl = document.getElementById('lessonContent');
const barFill = document.getElementById('barFill');
const progressText = document.getElementById('progressText');
const prevBtn = document.getElementById('prevBtn');
const prevLabelEl = document.getElementById('prevLabel');
const nextBtn = document.getElementById('nextBtn');
const nextLabel = document.getElementById('nextLabel');
const gateHint = document.getElementById('gateHint');
const keyboardHintEl = document.getElementById('keyboardHint');
const topicsList = document.getElementById('topicsList');
const completionModal = document.getElementById('completionModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const langButtons = document.querySelectorAll('.lang-btn');
const introModal = document.getElementById('introModal');
const introStartBtn = document.getElementById('introStartBtn');
const aboutBtn = document.getElementById('aboutBtn');
const aboutLabel = document.getElementById('aboutLabel');
const introTitleEl = document.getElementById('introTitle');
const introBodyEl = document.getElementById('introBody');
const completionTitleEl = document.getElementById('completionTitle');
const completionBodyEl = document.getElementById('completionBody');
const modulesLabelEl = document.getElementById('modulesLabel');
const footerGithubLabelEl = document.getElementById('footerGithubLabel');
const footerLinkedinLabelEl = document.getElementById('footerLinkedinLabel');

const STORAGE_NS = 'pe_trilha_v4';
const LS = {
    idx: STORAGE_NS + ':idx',
    visited: STORAGE_NS + ':visited',
    unlocked: STORAGE_NS + ':unlocked',
    introSeen: STORAGE_NS + ':introSeen'
};

const STRINGS = {
    pt: {
        pageTitle: 'Prompt Engineering • Trilha Guiada',
        aboutButton: 'Sobre',
        metaNav: 'Use ←/→ para navegar',
        modulesLabel: 'Módulos',
        prevLabel: 'Voltar',
        nextAdvance: 'Avançar',
        nextFinish: 'Finalizar',
        hintLockedAdvance: s => `Fique ${s}s nesta lição para desbloquear`,
        hintUnlockedAdvance: 'Você pode avançar',
        hintLockedFinish: s => `Fique ${s}s nesta lição para desbloquear`,
        hintUnlockedFinish: 'Você pode finalizar',
        keyboardHint: 'Você também pode usar ←/→ no teclado para voltar e avançar.',
        footerGithubLabel: '@lucashaetingerr',
        footerLinkedinLabel: 'LinkedIn',
        introTitle: 'Bem-vindo à Trilha de Prompt Engineering',
        introBody: `
        <p>Esta plataforma é uma trilha guiada para você aprender, na prática, a criar prompts mais claros,
        estruturados e eficientes para modelos de IA generativa.</p>
        <h3>O que você vai encontrar aqui</h3>
        <ul>
          <li>Uma sequência de módulos curtos explicando conceitos-chave de Prompt Engineering.</li>
          <li>Exemplos práticos de prompts que você pode adaptar para o seu dia a dia.</li>
          <li>Navegação passo a passo, com desbloqueio gradual para incentivar uma progressão organizada.</li>
        </ul>
        <h3>Como funciona</h3>
        <ul>
          <li>A plataforma usa a <strong>memória do seu navegador</strong> (localStorage) para registrar os módulos já acessados e o seu progresso.</li>
          <li>Você <strong>não precisa criar conta</strong>, fazer login ou informar dados pessoais: tudo fica salvo apenas no seu próprio navegador.</li>
          <li>Se quiser recomeçar do zero, basta limpar os dados do site nas configurações do navegador.</li>
        </ul>
        <p>Esta trilha foi desenvolvida por <strong>Lucas Haetinger (@lucashaetingerr)</strong>, com foco em uma experiência simples,
        didática e segura para quem quer aprender a conversar melhor com modelos de IA.</p>
      `,
        introStartReady: 'Começar agora',
        introStartWait: s => `Começar em ${s}s`,
        completionTitle: 'Parabéns! Você concluiu a trilha!',
        completionBody: `
        <p>Você finalizou todos os módulos de Prompt Engineering e agora possui uma base sólida para criar instruções
        claras, eficazes e seguras para modelos de linguagem.</p>
        <h3>Como aplicar o que você aprendeu:</h3>
        <ul>
          <li><strong>Pratique o método CANI:</strong> antes de escrever um prompt, pense sempre em:
          <strong>C</strong>ontexto, <strong>A</strong>ção, <strong>N</strong>ormas e
          <strong>I</strong>nspeção. Essa estrutura simples organiza o raciocínio.</li>
          <li><strong>Teste e itere:</strong> trate seus prompts como um software. A primeira versão raramente é a melhor.
          Monitore os resultados, ajuste uma variável por vez e meça o impacto.</li>
          <li><strong>Seja específico:</strong> ambiguidade é inimiga de bons resultados. Defina formatos de saída
          (como JSON), imponha restrições (contagem de palavras, tom) e forneça exemplos (few-shot) para guiar o modelo.</li>
        </ul>
        <p>Continue explorando e aplicando estes conceitos para extrair o máximo potencial das ferramentas de IA
        generativa.</p>
      `
    },
    en: {
        pageTitle: 'Prompt Engineering • Guided Track',
        aboutButton: 'About',
        metaNav: 'Use ←/→ to navigate',
        modulesLabel: 'Modules',
        prevLabel: 'Back',
        nextAdvance: 'Next',
        nextFinish: 'Finish',
        hintLockedAdvance: s => `Stay ${s}s on this lesson to unlock`,
        hintUnlockedAdvance: 'You can go next',
        hintLockedFinish: s => `Stay ${s}s on this lesson to unlock`,
        hintUnlockedFinish: 'You can finish',
        keyboardHint: 'You can also use ←/→ on your keyboard to go back and forward.',
        footerGithubLabel: '@lucashaetingerr',
        footerLinkedinLabel: 'LinkedIn',
        introTitle: 'Welcome to the Prompt Engineering Track',
        introBody: `
        <p>This platform is a guided path to help you learn, in practice, how to create clearer,
        more structured and more effective prompts for generative AI models.</p>
        <h3>What you will find here</h3>
        <ul>
          <li>A sequence of short modules explaining key Prompt Engineering concepts.</li>
          <li>Practical prompt examples that you can adapt to your daily work.</li>
          <li>Step-by-step navigation, with gradual unlocking to encourage structured progress.</li>
        </ul>
        <h3>How it works</h3>
        <ul>
          <li>The platform uses your browser <strong>local storage</strong> to track which modules you have already visited and your progress.</li>
          <li>You <strong>do not need an account</strong>, login, or personal data: everything is stored only in your own browser.</li>
          <li>If you want to restart from scratch, just clear this site’s data in your browser settings.</li>
        </ul>
        <p>This track was created by <strong>Lucas Haetinger (@lucashaetingerr)</strong>, focusing on a simple,
        didactic and safe experience for anyone who wants to learn how to talk better with AI models.</p>
      `,
        introStartReady: 'Start now',
        introStartWait: s => `Start in ${s}s`,
        completionTitle: "Congrats! You've completed the track!",
        completionBody: `
        <p>You have finished all Prompt Engineering modules and now have a solid foundation to create clear,
        effective and safe instructions for language models.</p>
        <h3>How to apply what you learned:</h3>
        <ul>
          <li><strong>Practice the CANI method:</strong> before writing a prompt, always think about:
          <strong>Context</strong>, <strong>Action</strong>, <strong>Norms</strong> and
          <strong>Inspection</strong>. This simple structure organizes your reasoning.</li>
          <li><strong>Test and iterate:</strong> treat your prompts like software. The first version is rarely the best.
          Monitor outputs, change one variable at a time and measure the impact.</li>
          <li><strong>Be specific:</strong> ambiguity kills quality. Define output formats (such as JSON), add constraints
          (word count, tone) and provide examples (few-shot) to guide the model.</li>
        </ul>
        <p>Keep exploring and applying these ideas to unlock the full potential of generative AI tools.</p>
      `
    }
};

let idx = 0;
let visited = [];
let lastUnlocked = 0;
let gateTimer = null;
const requiredSeconds = 10;

let totalLessons = 0;
const conteudos = { pt: null, en: null };
let currentLang = 'pt';

let currentGateDisabled = true;
let currentGateRemaining = requiredSeconds;

const INTRO_REQUIRED_SECONDS = 10;
let introTimer = null;
let introCanClose = false;
let introRemaining = INTRO_REQUIRED_SECONDS;

function getConteudos() {
    return conteudos[currentLang] || [];
}

const isLastLesson = () => totalLessons > 0 && idx === totalLessons - 1;

function clamp(i) {
    return Math.max(0, Math.min(totalLessons - 1, i));
}

function saveState() {
    try {
        localStorage.setItem(LS.idx, String(idx));
        localStorage.setItem(LS.visited, JSON.stringify(visited));
        localStorage.setItem(LS.unlocked, String(lastUnlocked));
    } catch { }
}

function loadState() {
    let storedVisited = null;
    try {
        const i = parseInt(localStorage.getItem(LS.idx) || '0', 10);
        const vRaw = localStorage.getItem(LS.visited);
        const u = parseInt(localStorage.getItem(LS.unlocked) || '0', 10);
        if (vRaw) storedVisited = JSON.parse(vRaw);
        idx = isFinite(i) ? clamp(i) : 0;
        lastUnlocked = isFinite(u) ? clamp(u) : 0;
    } catch { }
    if (!Array.isArray(storedVisited) || storedVisited.length !== totalLessons) {
        visited = Array(totalLessons).fill(false);
    } else {
        visited = storedVisited.slice(0, totalLessons);
    }
    if (lastUnlocked < 0) lastUnlocked = 0;
}

function setProgress() {
    if (!totalLessons) return;
    const completed = visited.filter(Boolean).length;
    const pct = (completed / totalLessons) * 100;
    barFill.style.width = pct.toFixed(1) + '%';
    progressText.textContent = `${completed}/${totalLessons}`;
}

function buildSidebar() {
    const data = getConteudos();
    if (!data.length) return;
    topicsList.innerHTML = '';
    data.forEach((c, i) => {
        const li = document.createElement('li');
        li.className = 'topic';
        const btn = document.createElement('button');
        btn.type = 'button';
        const isVisited = visited[i];
        const isLocked = i > lastUnlocked && i !== idx;
        const icon = document.createElement('span');
        icon.className = 'material-symbols-rounded icon';
        if (i === idx) {
            icon.textContent = 'play_circle';
            icon.style.color = 'var(--brand)';
        } else if (isVisited) {
            icon.textContent = 'check_circle';
            icon.classList.add('badge-done');
        } else if (isLocked) {
            icon.textContent = 'lock';
        } else {
            icon.textContent = 'bookmark';
        }
        const box = document.createElement('div');
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = c.titulo;
        const small = document.createElement('small');
        small.textContent = isVisited ? (currentLang === 'pt' ? 'Concluído' : 'Completed') : '';
        box.appendChild(title);
        box.appendChild(small);
        btn.appendChild(icon);
        btn.appendChild(box);
        if (i === idx) btn.classList.add('active');
        if (isLocked) btn.classList.add('locked');
        btn.addEventListener('click', () => {
            if (i > lastUnlocked && i !== idx) return;
            goTo(i);
        });
        li.appendChild(btn);
        topicsList.appendChild(li);
    });
}

function updateGateUI(disabled, remaining) {
    const t = STRINGS[currentLang];
    currentGateDisabled = disabled;
    currentGateRemaining = remaining;
    nextBtn.disabled = disabled;
    if (isLastLesson()) {
        const label = disabled ? `${t.nextFinish} • ${remaining}s` : t.nextFinish;
        nextLabel.innerHTML = `<span class="material-symbols-rounded">emoji_events</span>${label}`;
        gateHint.textContent = disabled ? t.hintLockedFinish(remaining) : t.hintUnlockedFinish;
    } else {
        const label = disabled ? `${t.nextAdvance} • ${remaining}s` : t.nextAdvance;
        nextLabel.innerHTML = `<span class="material-symbols-rounded">play_arrow</span>${label}`;
        gateHint.textContent = disabled ? t.hintLockedAdvance(remaining) : t.hintUnlockedAdvance;
    }
    gateHint.style.visibility = 'visible';
}

function resetGateAndStartCountdown() {
    if (gateTimer) {
        clearInterval(gateTimer);
        gateTimer = null;
    }
    let remaining = requiredSeconds;
    updateGateUI(true, remaining);
    gateTimer = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
            updateGateUI(true, remaining);
        } else {
            clearInterval(gateTimer);
            gateTimer = null;
            visited[idx] = true;
            if (lastUnlocked < idx + 1 && idx + 1 < totalLessons) {
                lastUnlocked = idx + 1;
            }
            saveState();
            buildSidebar();
            setProgress();
            updateGateUI(false, 0);
        }
    }, 1000);
}

function render(i) {
    if (!totalLessons) return;
    if (gateTimer) {
        clearInterval(gateTimer);
        gateTimer = null;
    }
    const data = getConteudos();
    if (!data.length) return;
    idx = clamp(i);
    const item = data[idx];
    titleEl.textContent = item.titulo;
    metaEl.textContent = currentLang === 'pt' ? `Módulo ${idx + 1} de ${totalLessons}` : `Module ${idx + 1} of ${totalLessons}`;
    contentEl.innerHTML = item.conteudo;
    contentEl.scrollTop = 0;
    setProgress();
    prevBtn.disabled = idx === 0;
    const alreadyVisited = visited[idx] === true;
    if (alreadyVisited) {
        updateGateUI(false, 0);
    } else {
        resetGateAndStartCountdown();
    }
    buildSidebar();
    if (location.hash !== `#${idx + 1}`) {
        history.replaceState(null, '', `#${idx + 1}`);
    }
}

function goTo(i) {
    idx = clamp(i);
    saveState();
    render(idx);
}

function openCompletionModal() {
    updateCompletionTexts();
    completionModal.classList.add('visible');
}

function closeCompletionModal() {
    completionModal.classList.remove('visible');
}

function updateIntroButtonLabel() {
    const t = STRINGS[currentLang];
    if (!introCanClose) {
        introStartBtn.textContent = t.introStartWait(introRemaining);
        introStartBtn.disabled = true;
    } else {
        introStartBtn.textContent = t.introStartReady;
        introStartBtn.disabled = false;
    }
}

function updateIntroTexts() {
    const t = STRINGS[currentLang];
    introTitleEl.textContent = t.introTitle;
    introBodyEl.innerHTML = t.introBody;
    updateIntroButtonLabel();
}

function updateCompletionTexts() {
    const t = STRINGS[currentLang];
    completionTitleEl.textContent = t.completionTitle;
    completionBodyEl.innerHTML = t.completionBody;
}

function openIntroModal(withDelay) {
    introModal.classList.add('visible');
    if (introTimer) {
        clearInterval(introTimer);
        introTimer = null;
    }
    const t = STRINGS[currentLang];
    if (withDelay) {
        introCanClose = false;
        introRemaining = INTRO_REQUIRED_SECONDS;
        introTitleEl.textContent = t.introTitle;
        introBodyEl.innerHTML = t.introBody;
        updateIntroButtonLabel();
        introTimer = setInterval(() => {
            introRemaining -= 1;
            if (introRemaining > 0) {
                updateIntroButtonLabel();
            } else {
                clearInterval(introTimer);
                introTimer = null;
                introCanClose = true;
                updateIntroButtonLabel();
            }
        }, 1000);
    } else {
        introCanClose = true;
        introRemaining = 0;
        introTitleEl.textContent = t.introTitle;
        introBodyEl.innerHTML = t.introBody;
        updateIntroButtonLabel();
    }
}

function closeIntroModal() {
    introModal.classList.remove('visible');
    if (introTimer) {
        clearInterval(introTimer);
        introTimer = null;
    }
    try {
        localStorage.setItem(LS.introSeen, '1');
    } catch { }
}

prevBtn.addEventListener('click', () => goTo(idx - 1));

nextBtn.addEventListener('click', () => {
    if (!nextBtn.disabled) {
        visited[idx] = true;
        if (lastUnlocked < idx + 1 && idx + 1 < totalLessons) {
            lastUnlocked = idx + 1;
        }
        saveState();
        setProgress();
        if (isLastLesson()) {
            openCompletionModal();
            return;
        }
        goTo(idx + 1);
    }
});

closeModalBtn.addEventListener('click', closeCompletionModal);

completionModal.addEventListener('click', e => {
    if (e.target === completionModal) {
        closeCompletionModal();
    }
});

introStartBtn.addEventListener('click', () => {
    if (!introCanClose) return;
    closeIntroModal();
});

aboutBtn.addEventListener('click', () => {
    openIntroModal(false);
});

document.addEventListener('keydown', e => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!prevBtn.disabled) goTo(idx - 1);
    }
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (!nextBtn.disabled) {
            visited[idx] = true;
            if (lastUnlocked < idx + 1 && idx + 1 < totalLessons) {
                lastUnlocked = idx + 1;
            }
            saveState();
            setProgress();
            if (isLastLesson()) {
                openCompletionModal();
                return;
            }
            goTo(idx + 1);
        }
    }
});

function updateStaticLangUI() {
    const t = STRINGS[currentLang];
    aboutLabel.textContent = t.aboutButton;
    document.title = t.pageTitle;
    metaEl.textContent = t.metaNav;
    modulesLabelEl.textContent = t.modulesLabel;
    prevLabelEl.textContent = t.prevLabel;
    footerGithubLabelEl.textContent = t.footerGithubLabel;
    footerLinkedinLabelEl.textContent = t.footerLinkedinLabel;
    keyboardHintEl.textContent = t.keyboardHint;
    updateGateUI(currentGateDisabled, currentGateRemaining);
    updateIntroTexts();
    updateCompletionTexts();
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang === currentLang) return;
        currentLang = lang;
        langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        updateStaticLangUI();
        render(idx);
    });
});

function indexFromHash() {
    const n = parseInt((location.hash || '').replace('#', ''), 10);
    return isFinite(n) && n >= 1 && n <= totalLessons ? n - 1 : null;
}

function maybeShowIntro() {
    let seen = null;
    try {
        seen = localStorage.getItem(LS.introSeen);
    } catch { }
    if (seen === '1') return;
    openIntroModal(true);
}

function init() {
    totalLessons = conteudos.pt ? conteudos.pt.length : 0;
    if (!totalLessons) {
        titleEl.textContent = 'Erro ao carregar conteúdo';
        metaEl.textContent = 'Verifique se os arquivos JSON estão na mesma pasta.';
        return;
    }
    loadState();
    updateStaticLangUI();
    let byHash = indexFromHash();
    if (byHash != null && byHash <= lastUnlocked) {
        idx = byHash;
    } else if (byHash != null && byHash > lastUnlocked) {
        idx = lastUnlocked;
    }
    render(idx);
    maybeShowIntro();
}

function loadContent() {
    Promise.all([
        fetch('prompt-engineering-content/prompt_trilha_pt.json').then(r => r.json()),
        fetch('prompt-engineering-content/prompt_trilha_en.json').then(r => r.json())
    ])
        .then(([pt, en]) => {
            conteudos.pt = pt;
            conteudos.en = en;
            init();
        })
        .catch(err => {
            console.error(err);
            titleEl.textContent = 'Erro ao carregar conteúdo';
            metaEl.textContent = 'Falha ao buscar os arquivos JSON.';
        });
}

loadContent();