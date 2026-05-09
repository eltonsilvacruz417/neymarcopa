const META_VOTOS = 20000000;
const PIX_KEY = 'SUA_CHAVE_PIX_AQUI';

const textos = {
    pt: {
        lang: 'pt-BR',
        locale: 'pt-BR',
        titleLine1: 'Neymar',
        titleLine2: 'na',
        titleLine3: 'Copa',
        photoWatermark: 'Enquete de fã-site',
        fanSiteText: 'Enquete independente criada por fãs. Não há vínculo oficial com Neymar, representantes, patrocinadores, clubes ou entidades esportivas.',
        votesLabel: 'pessoas votaram',
        goalText: 'Meta: 20.000.000 votos',
        mainVoteButton: 'Votar agora',
        rankingTitle: 'Votos por país',
        modalTitle: 'Registrar voto',
        countryLabel: 'País',
        emailLabel: 'E-mail',
        yesButton: 'Quero Neymar',
        noButton: 'Não quero',
        successMessage: 'Voto registrado com sucesso!',
        emailRequired: 'Informe o e-mail.',
        errorMessage: 'Não foi possível registrar o voto.',
        requestError: 'Erro na requisição',
        supportTitle: 'Apoie discretamente',
        supportText: 'Se quiser ajudar a manter esta enquete online, você pode contribuir via Pix.',
        pixButton: 'Copiar Pix',
        pixCopied: 'Chave Pix copiada!',
        pixNotConfigured: 'Pix ainda não configurado.',
        independentNotice: 'Projeto independente, sem vínculo oficial com Neymar.',
        privacyLink: 'Política de Privacidade',
        percentText: percent => `${percent}% querem Neymar na Copa`
    },
    en: {
        lang: 'en',
        locale: 'en-US',
        titleLine1: 'Neymar',
        titleLine2: 'to the',
        titleLine3: 'World Cup',
        photoWatermark: 'Fan-site poll',
        fanSiteText: 'Independent fan-made poll. There is no official connection to Neymar, representatives, sponsors, clubs, or sports organizations.',
        votesLabel: 'people have voted',
        goalText: 'Goal: 20,000,000 votes',
        mainVoteButton: 'Vote now',
        rankingTitle: 'Votes by country',
        modalTitle: 'Register vote',
        countryLabel: 'Country',
        emailLabel: 'Email',
        yesButton: 'I want Neymar',
        noButton: 'I do not want him',
        successMessage: 'Vote registered successfully!',
        emailRequired: 'Please enter your email.',
        errorMessage: 'Could not register vote.',
        requestError: 'Request error',
        supportTitle: 'Discreet support',
        supportText: 'If you want to help keep this poll online, you can contribute via Pix.',
        pixButton: 'Copy Pix',
        pixCopied: 'Pix key copied!',
        pixNotConfigured: 'Pix is not configured yet.',
        independentNotice: 'Independent project with no official connection to Neymar.',
        privacyLink: 'Privacy Policy',
        percentText: percent => `${percent}% want Neymar in the World Cup`
    },
    es: {
        lang: 'es',
        locale: 'es-ES',
        titleLine1: 'Neymar',
        titleLine2: 'al',
        titleLine3: 'Mundial',
        photoWatermark: 'Encuesta de fans',
        fanSiteText: 'Encuesta independiente creada por fans. No existe vínculo oficial con Neymar, representantes, patrocinadores, clubes o entidades deportivas.',
        votesLabel: 'personas votaron',
        goalText: 'Meta: 20.000.000 votos',
        mainVoteButton: 'Votar ahora',
        rankingTitle: 'Votos por país',
        modalTitle: 'Registrar voto',
        countryLabel: 'País',
        emailLabel: 'E-mail',
        yesButton: 'Quiero a Neymar',
        noButton: 'No lo quiero',
        successMessage: '¡Voto registrado con éxito!',
        emailRequired: 'Ingresa tu e-mail.',
        errorMessage: 'No fue posible registrar el voto.',
        requestError: 'Error en la solicitud',
        supportTitle: 'Apoyo discreto',
        supportText: 'Si quieres ayudar a mantener esta encuesta online, puedes contribuir por Pix.',
        pixButton: 'Copiar Pix',
        pixCopied: '¡Clave Pix copiada!',
        pixNotConfigured: 'Pix aún no está configurado.',
        independentNotice: 'Proyecto independiente, sin vínculo oficial con Neymar.',
        privacyLink: 'Política de Privacidad',
        percentText: percent => `${percent}% quieren a Neymar en el Mundial`
    },
    ja: {
        lang: 'ja',
        locale: 'ja-JP',
        titleLine1: 'ネイマール',
        titleLine2: 'を',
        titleLine3: 'W杯へ',
        photoWatermark: 'ファン投票',
        fanSiteText: 'ファンによる独立した投票です。Neymar本人、代理人、スポンサー、クラブ、スポーツ団体との公式な関係はありません。',
        votesLabel: '人が投票しました',
        goalText: '目標: 20,000,000票',
        mainVoteButton: '今すぐ投票',
        rankingTitle: '国別の投票',
        modalTitle: '投票を登録',
        countryLabel: '国',
        emailLabel: 'メール',
        yesButton: 'ネイマールを望む',
        noButton: '望まない',
        successMessage: '投票が登録されました！',
        emailRequired: 'メールを入力してください。',
        errorMessage: '投票を登録できませんでした。',
        requestError: 'リクエストエラー',
        supportTitle: '控えめな支援',
        supportText: 'この投票ページの運営を支援したい場合は、Pixで寄付できます。',
        pixButton: 'Pixをコピー',
        pixCopied: 'Pixキーをコピーしました！',
        pixNotConfigured: 'Pixはまだ設定されていません。',
        independentNotice: 'このプロジェクトは独立したもので、Neymar公式とは関係ありません。',
        privacyLink: 'プライバシーポリシー',
        percentText: percent => `${percent}% がネイマールのW杯出場を望んでいます`
    },
    zh: {
        lang: 'zh-CN',
        locale: 'zh-CN',
        titleLine1: '内马尔',
        titleLine2: '进',
        titleLine3: '世界杯',
        photoWatermark: '球迷投票',
        fanSiteText: '这是由球迷创建的独立投票，与 Neymar 本人、代表、赞助商、俱乐部或体育组织没有官方关联。',
        votesLabel: '人已投票',
        goalText: '目标：20,000,000 票',
        mainVoteButton: '立即投票',
        rankingTitle: '按国家/地区统计投票',
        modalTitle: '登记投票',
        countryLabel: '国家/地区',
        emailLabel: '邮箱',
        yesButton: '我支持内马尔',
        noButton: '我不支持',
        successMessage: '投票登记成功！',
        emailRequired: '请输入邮箱。',
        errorMessage: '无法登记投票。',
        requestError: '请求错误',
        supportTitle: '低调支持',
        supportText: '如果你想帮助维持这个投票页面在线，可以通过 Pix 捐助。',
        pixButton: '复制 Pix',
        pixCopied: 'Pix 密钥已复制！',
        pixNotConfigured: 'Pix 尚未配置。',
        independentNotice: '本项目为独立项目，与 Neymar 官方无关联。',
        privacyLink: '隐私政策',
        percentText: percent => `${percent}% 支持内马尔参加世界杯`
    }
};

function detectarIdioma() {
    const idioma = (navigator.language || navigator.userLanguage || '').toLowerCase();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    if (idioma === 'pt-br' || timezone === 'America/Sao_Paulo') return 'pt';
    if (idioma.startsWith('es')) return 'es';
    if (idioma.startsWith('ja')) return 'ja';
    if (idioma.startsWith('zh')) return 'zh';

    return 'en';
}

let idiomaAtual = detectarIdioma();

function obterTextos() {
    return textos[idiomaAtual] || textos.en;
}

function aplicarIdioma() {
    const idioma = obterTextos();
    document.documentElement.lang = idioma.lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const chave = el.getAttribute('data-i18n');
        if (idioma[chave]) {
            el.textContent = idioma[chave];
        }
    });

    atualizarPix();
}

function aplicarFlagPercentual(exibirPercentual) {
    const percentual = document.getElementById('percentualNeymar');
    if (!percentual) return;

    percentual.hidden = !exibirPercentual;
}

function formatarNumero(valor) {
    return Number(valor || 0).toLocaleString(obterTextos().locale);
}

function abrirModal() {
    document.getElementById('modalVoto').classList.add('ativo');
    limparMensagem();
}

function fecharModal() {
    document.getElementById('modalVoto').classList.remove('ativo');
}

function exibirMensagem(texto, tipo) {
    const msg = document.getElementById('msgModal');
    msg.textContent = texto;
    msg.className = 'msg-modal ativo ' + tipo;
}

function limparMensagem() {
    const msg = document.getElementById('msgModal');
    msg.textContent = '';
    msg.className = 'msg-modal';
}

function pixConfigurado() {
    return PIX_KEY && PIX_KEY !== 'SUA_CHAVE_PIX_AQUI';
}

function atualizarPix() {
    const pixKey = document.getElementById('pixKey');
    if (!pixKey) return;

    pixKey.textContent = pixConfigurado() ? PIX_KEY : obterTextos().pixNotConfigured;
}

async function copiarPix() {
    const msg = document.getElementById('msgPix');
    const idioma = obterTextos();

    if (!pixConfigurado()) {
        msg.textContent = idioma.pixNotConfigured;
        msg.className = 'msg-modal ativo erro';
        return;
    }

    try {
        await navigator.clipboard.writeText(PIX_KEY);
        msg.textContent = idioma.pixCopied;
        msg.className = 'msg-modal ativo sucesso';
    } catch (error) {
        msg.textContent = PIX_KEY;
        msg.className = 'msg-modal ativo sucesso';
    }
}

async function apiRequest(url, options) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    });

    const json = response.status === 204 ? null : await response.json();

    if (!response.ok) {
        throw new Error(json?.error || obterTextos().requestError);
    }

    return json;
}

async function carregarDashboard() {
    try {
        const data = await apiRequest('/api/votes', { method: 'GET' });

        const totalVotos = data.totalVotos || 0;
        const totalQuerem = data.totalQuerem || 0;
        const percentualQuerem = totalVotos === 0 ? 0 : Math.round((totalQuerem * 100) / totalVotos);
        const percentualMeta = Math.min(100, Math.round((totalVotos * 100) / META_VOTOS));

        document.getElementById('totalVotos').textContent = formatarNumero(totalVotos);
        document.getElementById('percentualMeta').textContent = percentualMeta + '%';
        document.getElementById('barraMeta').style.width = percentualMeta + '%';
        document.getElementById('percentualNeymar').textContent = obterTextos().percentText(percentualQuerem);

        aplicarFlagPercentual(data.config?.exibir_percentual ?? true);
        renderizarRanking(data.ranking || []);
    } catch (error) {
        console.error(error);
    }
}

function escaparHtml(valor) {
    return String(valor)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function renderizarRanking(ranking) {
    const container = document.getElementById('rankingPaises');

    if (!ranking.length) {
        container.innerHTML = '<div class="pais-row"><span>-</span><strong>0</strong></div>';
        return;
    }

    container.innerHTML = ranking.map(item => `
        <div class="pais-row">
            <span>${escaparHtml(item.pais)}</span>
            <strong>${formatarNumero(item.total_votos)}</strong>
        </div>
    `).join('');
}

async function registrarVoto(querNeymar) {
    const pais = document.getElementById('pais').value;
    const email = document.getElementById('email').value.trim();
    const idioma = obterTextos();

    if (!email) {
        exibirMensagem(idioma.emailRequired, 'erro');
        return;
    }

    try {
        await apiRequest('/api/votes', {
            method: 'POST',
            body: JSON.stringify({
                pais,
                email,
                querNeymar
            })
        });

        exibirMensagem(idioma.successMessage, 'sucesso');
        await carregarDashboard();

        setTimeout(function () {
            fecharModal();
        }, 1200);
    } catch (error) {
        exibirMensagem(idioma.errorMessage, 'erro');
        console.error(error);
    }
}

aplicarIdioma();
carregarDashboard();
