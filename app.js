const META_VOTOS = 20000000;

const textos = {
    pt: {
        lang: 'pt-BR',
        locale: 'pt-BR',
        titleLine1: 'Neymar',
        titleLine2: 'na',
        titleLine3: 'Copa',
        photoWatermark: 'Neymar na Copa',
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
        percentText: percent => `${percent}% querem Neymar na Copa`
    },
    en: {
        lang: 'en',
        locale: 'en-US',
        titleLine1: 'Neymar',
        titleLine2: 'to the',
        titleLine3: 'World Cup',
        photoWatermark: 'Neymar to the World Cup',
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
        percentText: percent => `${percent}% want Neymar in the World Cup`
    },
    es: {
        lang: 'es',
        locale: 'es-ES',
        titleLine1: 'Neymar',
        titleLine2: 'al',
        titleLine3: 'Mundial',
        photoWatermark: 'Neymar al Mundial',
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
        percentText: percent => `${percent}% quieren a Neymar en el Mundial`
    },
    ja: {
        lang: 'ja',
        locale: 'ja-JP',
        titleLine1: 'ネイマール',
        titleLine2: 'を',
        titleLine3: 'W杯へ',
        photoWatermark: 'ネイマールをW杯へ',
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
        percentText: percent => `${percent}% がネイマールのW杯出場を望んでいます`
    },
    zh: {
        lang: 'zh-CN',
        locale: 'zh-CN',
        titleLine1: '内马尔',
        titleLine2: '进',
        titleLine3: '世界杯',
        photoWatermark: '内马尔进世界杯',
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

/*
    CRUD disponível pela API:

    CREATE/UPSERT:
    POST /api/votes
    body: { "pais": "Brasil", "email": "teste@email.com", "querNeymar": true }

    READ:
    GET /api/votes

    UPDATE:
    PUT /api/votes
    body: { "email": "teste@email.com", "pais": "Portugal", "querNeymar": false }

    DELETE:
    DELETE /api/votes?email=teste@email.com
*/

aplicarIdioma();
carregarDashboard();
