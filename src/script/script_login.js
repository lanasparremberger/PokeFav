const API = "https://pokeapi.co/api/v2";

const TYPES = [
    { id: "normal",   label: "Normal",    icon: "fa-circle",             color: "#A8A878" },
    { id: "fire",     label: "Fogo",      icon: "fa-fire",               color: "#F08030" },
    { id: "water",    label: "Água",      icon: "fa-droplet",            color: "#6890F0" },
    { id: "electric", label: "Elétrico",  icon: "fa-bolt",               color: "#F8D030" },
    { id: "grass",    label: "Planta",    icon: "fa-leaf",               color: "#78C850" },
    { id: "ice",      label: "Gelo",      icon: "fa-snowflake",          color: "#98D8D8" },
    { id: "fighting", label: "Lutador",   icon: "fa-hand-fist",          color: "#C03028" },
    { id: "poison",   label: "Venenoso",  icon: "fa-skull-crossbones",   color: "#A040A0" },
    { id: "ground",   label: "Terra",     icon: "fa-mountain",           color: "#E0C068" },
    { id: "flying",   label: "Voador",    icon: "fa-feather",            color: "#A890F0" },
    { id: "psychic",  label: "Psíquico",  icon: "fa-brain",              color: "#F85888" },
    { id: "bug",      label: "Inseto",    icon: "fa-bug",                color: "#A8B820" },
    { id: "rock",     label: "Pedra",     icon: "fa-gem",                color: "#B8A038" },
    { id: "ghost",    label: "Fantasma",  icon: "fa-ghost",              color: "#705898" },
    { id: "dragon",   label: "Dragão",    icon: "fa-dragon",             color: "#7038F8" },
    { id: "dark",     label: "Sombrio",   icon: "fa-moon",               color: "#705848" },
    { id: "steel",    label: "Aço",       icon: "fa-shield-halved",      color: "#B8B8D0" },
    { id: "fairy",    label: "Fada",      icon: "fa-wand-magic-sparkles",color: "#EE99AC" },
];
const typeById = Object.fromEntries(TYPES.map(t => [t.id, t]));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


 

/* =====================================================
   Fundo animado — campo de partículas tipo "scanner"
   ===================================================== */
(function initBackground() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    const COLORS = ["#e3350d", "#ffcb05", "#6890f0"];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    function makeParticles() {
        const count = Math.min(70, Math.floor((w * h) / 22000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.6 + 0.6,
            vy: -(Math.random() * 0.25 + 0.05),
            vx: (Math.random() - 0.5) * 0.15,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }));
    }

    function step() {
        ctx.clearRect(0, 0, w, h);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
        }

        // linhas de conexão (efeito "constelação de dados")
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.strokeStyle = `rgba(168, 176, 200, ${0.12 * (1 - dist / 130)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        for (const p of particles) {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.55;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        requestAnimationFrame(step);
    }

    resize();
    makeParticles();
    requestAnimationFrame(step);
    window.addEventListener("resize", () => { resize(); makeParticles(); });
})();

/* =====================================================
   Tema claro / escuro
   ===================================================== */
(function initTheme() {
    const root = document.documentElement;
    const btn = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-toggle-icon");
    const saved = localStorage.getItem("pokefav-theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

    applyTheme(saved);

    btn?.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
        localStorage.setItem("pokefav-theme", next);
    });

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        if (icon) icon.className = theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }
})();

/* =====================================================
   Menu mobile
   ===================================================== */
(function initMobileMenu() {
    const btn = document.getElementById("hamburger-btn");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", () => {
        menu.classList.toggle("open");
        const isOpen = menu.classList.contains("open");
        btn.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        menu.classList.remove("open");
        btn.querySelector("i").className = "fa-solid fa-bars";
    }));
})();


 const campoSenha = document.getElementById('senha');
    const btnToggle = document.getElementById('btn-toggle');
    const iconeOlho = document.getElementById('icone-olho');

    btnToggle.addEventListener('click', function() {
        // Altera o tipo do input
        if (campoSenha.type === 'password') {
            campoSenha.type = 'text';
            // Muda o ícone para olho riscado (fa-eye-slash)
            iconeOlho.className = 'fas fa-eye-slash';
        } else {
            campoSenha.type = 'password';
            // Volta para o ícone de olho aberto (fa-eye)
            iconeOlho.className = 'fas fa-eye';
        }
    });

/* =====================================================
   Reveal on scroll
   ===================================================== */
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* =====================================================
   Grade de tipos
   ===================================================== */
const typeGrid = document.getElementById("type-grid");
if (typeGrid) {
    typeGrid.innerHTML = TYPES.map(t => `
        <li>
            <button data-type="${t.id}"
                class="type-card w-full rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-2 sm:gap-3 text-center"
                style="--tc: ${t.color}">
                <i class="fa-solid ${t.icon} text-2xl sm:text-3xl relative z-10" style="color: ${t.color}"></i>
                <span class="font-display font-bold text-sm sm:text-base relative z-10">${t.label}</span>
            </button>
        </li>
    `).join("");
}

const typePage = document.getElementById("type-page");
const typePageContent = document.getElementById("type-page-content");

function damageLabel(key) {
    return {
        double_damage_to: { title: "Super eficaz contra", icon: "fa-burst", tone: "text-emerald-400" },
        double_damage_from: { title: "Fraco contra", icon: "fa-triangle-exclamation", tone: "text-red-400" },
        half_damage_from: { title: "Resistente a", icon: "fa-shield", tone: "text-sky-400" },
        no_damage_from: { title: "Imune a", icon: "fa-ban", tone: "text-violet-400" },
    }[key];
}

async function openTypePage(typeId) {
    const t = typeById[typeId];
    typePage.classList.add("open");
    typePage.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    typePageContent.innerHTML = `
        <div class="flex items-center gap-4 mb-10">
            <i class="fa-solid ${t.icon} text-4xl sm:text-5xl" style="color:${t.color}"></i>
            <div>
                <p class="font-mono text-xs uppercase tracking-[0.25em]" style="color:var(--text-soft)">Tipo</p>
                <h2 class="font-display text-3xl sm:text-5xl font-black">${t.label}</h2>
            </div>
        </div>
        <div class="flex items-center gap-3" style="color:var(--text-soft)">
            <div class="pokeball-loader"></div> Carregando dados do tipo...
        </div>
    `;

    try {
        const res = await fetch(`${API}/type/${typeId}`);
        if (!res.ok) throw new Error("Falha ao buscar o tipo");
        const data = await res.json();

        const relKeys = ["double_damage_to", "double_damage_from", "half_damage_from", "no_damage_from"];
        const relationsHtml = relKeys.map(key => {
            const meta = damageLabel(key);
            const items = data.damage_relations[key];
            if (!items.length) return "";
            return `
                <div class="rounded-2xl p-5" style="background:var(--bg-panel); border:1px solid var(--line)">
                    <p class="font-semibold mb-3 flex items-center gap-2 ${meta.tone}">
                        <i class="fa-solid ${meta.icon}"></i> ${meta.title}
                    </p>
                    <div class="flex flex-wrap gap-2">
                        ${items.map(i => {
                            const rt = typeById[i.name];
                            return `<span class="damage-chip rounded-full px-3 py-1.5 text-sm flex items-center gap-1.5">
                                <i class="fa-solid ${rt ? rt.icon : 'fa-circle'}" style="color:${rt ? rt.color : '#999'}"></i>
                                ${rt ? rt.label : i.name}
                            </span>`;
                        }).join("")}
                    </div>
                </div>
            `;
        }).join("");

        const samplePokemon = data.pokemon.slice(0, 25);
        const details = await Promise.all(
            samplePokemon.map(p => fetch(p.pokemon.url).then(r => r.json()).catch(() => null))
        );

        const pokemonHtml = details.filter(Boolean).map(p => `
            <div class="rounded-2xl p-4 flex flex-col items-center gap-2 hover:-translate-y-1 duration-200" style="background:var(--bg-panel); border:1px solid var(--line)">
                <img src="${p.sprites.front_default || ''}" alt="${p.name}" class="w-14 h-14 sm:w-16 sm:h-16 object-contain" loading="lazy">
                <span class="text-xs sm:text-sm capitalize font-medium text-center">${p.name}</span>
            </div>
        `).join("");

        typePageContent.innerHTML = `
            <div class="flex items-center gap-4 mb-8 sm:mb-10">
                <i class="fa-solid ${t.icon} text-4xl sm:text-5xl" style="color:${t.color}"></i>
                <div>
                    <p class="font-mono text-xs uppercase tracking-[0.25em]" style="color:var(--text-soft)">Tipo</p>
                    <h2 class="font-display text-3xl sm:text-5xl font-black">${t.label}</h2>
                </div>
            </div>

            <h3 class="font-display text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-simple"></i> Características de combate
            </h3>
            <div class="grid sm:grid-cols-2 gap-4 mb-8 sm:mb-10">
                ${relationsHtml || `<p style="color:var(--text-soft)">Sem relações de dano especiais.</p>`}
            </div>

            <h3 class="font-display text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <i class="fa-solid fa-paw"></i> Alguns Pokémons deste tipo
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                ${pokemonHtml}
            </div>
        `;
    } catch (err) {
        typePageContent.innerHTML += `
            <p class="text-red-400 mt-4"><i class="fa-solid fa-circle-exclamation mr-2"></i>Não foi possível carregar os dados agora. Tente novamente.</p>
        `;
    }
}

typeGrid?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-type]");
    if (btn) openTypePage(btn.dataset.type);
});

document.getElementById("type-page-close")?.addEventListener("click", closeTypePage);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTypePage(); });

function closeTypePage() {
    typePage?.classList.remove("open");
    typePage?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

/* =====================================================
   Favoritos
   ===================================================== */
const STORAGE_KEY = "pokefav-favorites";
const favList = document.getElementById("favorite-pokemon-list");
const favEmpty = document.getElementById("favorites-empty");
const form = document.getElementById("pokemon-form");
const nameInput = document.getElementById("pokemon-name");
const errorBox = document.getElementById("pokemon-form-error");
const addBtnLabel = document.getElementById("add-btn-label");

function loadFavorites() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
}
function saveFavorites(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function renderFavorites() {
    if (!favList) return;
    const favorites = loadFavorites();
    favEmpty?.classList.toggle("hidden", favorites.length > 0);
    favList.innerHTML = favorites.map(p => `
        <li class="fav-card rounded-2xl p-4 flex items-center gap-3">
            <img src="${p.sprite}" alt="${p.name}" class="w-14 h-14 object-contain shrink-0">
            <div class="flex-1 min-w-0">
                <p class="font-display font-semibold capitalize truncate">${p.name}</p>
                <div class="flex gap-1.5 mt-1 flex-wrap">
                    ${p.types.map(tn => {
                        const rt = typeById[tn];
                        return `<span class="text-[10px] uppercase tracking-wide font-mono px-2 py-0.5 rounded-full" style="background:${rt ? rt.color : '#555'}22; color:${rt ? rt.color : '#ccc'}">${rt ? rt.label : tn}</span>`;
                    }).join("")}
                </div>
            </div>
            <button data-remove="${p.name}" class="px-2 duration-200" style="color:var(--text-soft)" title="Remover">
                <i class="fa-solid fa-trash"></i>
            </button>
        </li>
    `).join("");
}
renderFavorites();

favList?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-remove]");
    if (!btn) return;
    const favorites = loadFavorites().filter(p => p.name !== btn.dataset.remove);
    saveFavorites(favorites);
    renderFavorites();
});

form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = nameInput.value.trim().toLowerCase();
    errorBox.classList.add("hidden");
    if (!query) return;

    addBtnLabel.innerHTML = `<div class="pokeball-loader"></div>`;

    try {
        const res = await fetch(`${API}/pokemon/${query}`);
        if (!res.ok) throw new Error("not-found");
        const data = await res.json();

        const favorites = loadFavorites();
        if (favorites.some(p => p.name === data.name)) {
            errorBox.querySelector("span").textContent = "Esse Pokémon já está na sua lista de favoritos.";
            errorBox.classList.remove("hidden");
        } else {
            favorites.unshift({
                name: data.name,
                sprite: data.sprites.front_default,
                types: data.types.map(t => t.type.name),
            });
            saveFavorites(favorites);
            renderFavorites();
            nameInput.value = "";
        }
    } catch {
        errorBox.querySelector("span").textContent = `Pokémon "${query}" não encontrado. Confira o nome e tente de novo.`;
        errorBox.classList.remove("hidden");
    } finally {
        addBtnLabel.innerHTML = `<i class="fa-solid fa-plus"></i> Adicionar`;
    }
});