const META_VOTOS = 20000000;

const textos = {
    pt: {
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
        errorMessage: 'Não foi possível registrar o voto.'
    },
    en: {
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
        errorMessage: 'Could not register vote.'
    }
};

function detectarIdioma() {
    const idioma = navigator.language || navigator.userLanguage || '';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const estaNoBrasil = idioma.toLowerCase() === 'pt-br' || timezone === 'America/Sao_Paulo';

    return estaNoBrasil ? 'pt' : 'en';
}

let idiomaAtual = detectarIdioma();

function aplicarIdioma() {
    document.documentElement.lang = idiomaAtual === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const chave = el.getAttribute('data-i18n');
        if (textos[idiomaAtual][chave]) {
            el.textContent = textos[idiomaAtual][chave];
        }
    });
}

function aplicarFlagPercentual(exibirPercentual) {
    const percentual = document.getElementById('percentualNeymar');
    if (!percentual) return;

    percentual.hidden = !exibirPercentual;
}

function formatarNumero(valor) {
    return Number(valor || 0).toLocaleString(idiomaAtual === 'pt' ? 'pt-BR' : 'en-US');
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
        throw new Error(json?.error || 'Erro na requisição');
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

        document.getElementById('percentualNeymar').textContent =
            idiomaAtual === 'pt'
                ? `${percentualQuerem}% querem Neymar na Copa`
                : `${percentualQuerem}% want Neymar in the World Cup`;

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

    if (!email) {
        exibirMensagem(textos[idiomaAtual].emailRequired, 'erro');
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

        exibirMensagem(textos[idiomaAtual].successMessage, 'sucesso');
        await carregarDashboard();

        setTimeout(function () {
            fecharModal();
        }, 1200);
    } catch (error) {
        exibirMensagem(textos[idiomaAtual].errorMessage, 'erro');
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
