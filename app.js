const META_VOTOS = 20000000;
const PIX_KEY = 'a772c977-77a5-4510-83fb-0d1a25097415';
const CODIGOS_PAISES = [
    'AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ',
    'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR',
    'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC',
    'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO',
    'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF',
    'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY',
    'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM',
    'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY',
    'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX',
    'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI',
    'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH',
    'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC',
    'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS',
    'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK',
    'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU',
    'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW'
];

const textos = {
    pt: {
        lang: 'pt-BR',
        locale: 'pt-BR',
        defaultCountryCode: 'BR',
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
        consentRequired: 'Aceite a política de privacidade para registrar seu voto.',
        privacyConsent: 'Li e aceito a Política de Privacidade. Entendo que meu e-mail será usado para impedir votos duplicados e atualizar meu voto.',
        privacyLink: 'Política de Privacidade',
        independentNotice: 'Projeto independente, sem vínculo oficial com Neymar.',
        supportText: 'Apoie a manutenção deste projeto independente via Pix.',
        pixButton: 'Copiar Pix',
        pixCopied: 'Chave Pix copiada!',
        errorMessage: 'Não foi possível registrar o voto.',
        requestError: 'Erro na requisição',
        percentText: percent => `${percent}% querem Neymar na Copa`
    },
    en: {
        lang: 'en',
        locale: 'en-US',
        defaultCountryCode: 'US',
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
        consentRequired: 'Accept the privacy policy to register your vote.',
        privacyConsent: 'I have read and accept the Privacy Policy. I understand my email will be used to prevent duplicate votes and update my vote.',
        privacyLink: 'Privacy Policy',
        independentNotice: 'Independent project with no official connection to Neymar.',
        supportText: 'Support the maintenance of this independent project via Pix.',
        pixButton: 'Copy Pix',
        pixCopied: 'Pix key copied!',
        errorMessage: 'Could not register vote.',
        requestError: 'Request error',
        percentText: percent => `${percent}% want Neymar in the World Cup`
    },
    es: {
        lang: 'es',
        locale: 'es-ES',
        defaultCountryCode: 'ES',
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
        consentRequired: 'Acepta la política de privacidad para registrar tu voto.',
        privacyConsent: 'Leí y acepto la Política de Privacidad. Entiendo que mi e-mail se usará para evitar votos duplicados y actualizar mi voto.',
        privacyLink: 'Política de Privacidad',
        independentNotice: 'Proyecto independiente, sin vínculo oficial con Neymar.',
        supportText: 'Apoya el mantenimiento de este proyecto independiente vía Pix.',
        pixButton: 'Copiar Pix',
        pixCopied: '¡Clave Pix copiada!',
        errorMessage: 'No fue posible registrar el voto.',
        requestError: 'Error en la solicitud',
        percentText: percent => `${percent}% quieren a Neymar en el Mundial`
    },
    ja: {
        lang: 'ja',
        locale: 'ja-JP',
        defaultCountryCode: 'JP',
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
        consentRequired: '投票を登録するにはプライバシーポリシーへの同意が必要です。',
        privacyConsent: 'プライバシーポリシーを読み、同意します。メールは重複投票の防止と投票の更新に使用されることを理解しています。',
        privacyLink: 'プライバシーポリシー',
        independentNotice: 'このプロジェクトは独立したもので、Neymar公式とは関係ありません。',
        supportText: 'この独立プロジェクトの維持をPixで支援できます。',
        pixButton: 'Pixをコピー',
        pixCopied: 'Pixキーをコピーしました！',
        errorMessage: '投票を登録できませんでした。',
        requestError: 'リクエストエラー',
        percentText: percent => `${percent}% がネイマールのW杯出場を望んでいます`
    },
    zh: {
        lang: 'zh-CN',
        locale: 'zh-CN',
        defaultCountryCode: 'CN',
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
        consentRequired: '请接受隐私政策后再登记投票。',
        privacyConsent: '我已阅读并接受隐私政策。我理解邮箱将用于防止重复投票并更新我的投票。',
        privacyLink: '隐私政策',
        independentNotice: '本项目为独立项目，与 Neymar 官方无关联。',
        supportText: '通过 Pix 支持这个独立项目的维护。',
        pixButton: '复制 Pix',
        pixCopied: 'Pix 密钥已复制！',
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

    preencherPaises();
}

function criarDisplayPaises() {
    if (typeof Intl.DisplayNames === 'function') {
        return new Intl.DisplayNames([obterTextos().locale], { type: 'region' });
    }

    return null;
}

function obterNomePais(codigo, displayPaises) {
    return displayPaises?.of(codigo) || codigo;
}

function preencherPaises() {
    const select = document.getElementById('pais');
    if (!select) return;

    const valorAtual = select.value;
    const idioma = obterTextos();
    const displayPaises = criarDisplayPaises();
    const nomes = CODIGOS_PAISES
        .map(codigo => ({
            codigo,
            nome: obterNomePais(codigo, displayPaises)
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome, idioma.locale));

    select.innerHTML = nomes.map(item => (
        `<option value="${escaparHtml(item.nome)}" data-country-code="${item.codigo}">${escaparHtml(item.nome)}</option>`
    )).join('');

    const codigoPreferido = idioma.defaultCountryCode;
    const opcaoAtual = Array.from(select.options).find(option => option.value === valorAtual);
    const opcaoPreferida = Array.from(select.options).find(option => option.dataset.countryCode === codigoPreferido);

    if (opcaoAtual) {
        select.value = valorAtual;
    } else if (opcaoPreferida) {
        select.value = opcaoPreferida.value;
    }
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

async function copiarPix() {
    const msg = document.getElementById('msgPix');
    const idioma = obterTextos();

    try {
        await navigator.clipboard.writeText(PIX_KEY);
        msg.textContent = idioma.pixCopied;
    } catch (error) {
        msg.textContent = PIX_KEY;
    }

    msg.className = 'msg-pix ativo';
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
    const consentimento = document.getElementById('privacyConsent');
    const idioma = obterTextos();

    if (!email) {
        exibirMensagem(idioma.emailRequired, 'erro');
        return;
    }

    if (!consentimento?.checked) {
        exibirMensagem(idioma.consentRequired, 'erro');
        return;
    }

    try {
        await apiRequest('/api/votes', {
            method: 'POST',
            body: JSON.stringify({
                pais,
                email,
                querNeymar,
                consentimentoPrivacidade: true
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
