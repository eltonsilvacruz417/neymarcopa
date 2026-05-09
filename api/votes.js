import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseClient;

function getSupabase() {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error('Variáveis SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY não configuradas.');
    }

    if (!supabaseClient) {
        supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
    }

    return supabaseClient;
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
}

function normalizarEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function normalizarPais(pais) {
    const valor = String(pais || '').trim();
    return valor || 'Outro';
}

function normalizarBoolean(valor) {
    if (typeof valor === 'boolean') return valor;
    if (typeof valor === 'string') {
        const normalizado = valor.trim().toLowerCase();
        if (['true', '1', 'sim', 'yes'].includes(normalizado)) return true;
        if (['false', '0', 'nao', 'não', 'no'].includes(normalizado)) return false;
    }

    return Boolean(valor);
}

function erroHttp(res, status, mensagem) {
    return res.status(status).json({ error: mensagem });
}

async function lerDashboard(supabase) {
    const { count: totalVotos, error: erroTotal } = await supabase
        .from('neymar_peticao_votos')
        .select('id', { count: 'exact', head: true });

    if (erroTotal) throw erroTotal;

    const { count: totalQuerem, error: erroQuerem } = await supabase
        .from('neymar_peticao_votos')
        .select('id', { count: 'exact', head: true })
        .eq('quer_neymar', true);

    if (erroQuerem) throw erroQuerem;

    const { data: votos, error: erroVotos } = await supabase
        .from('neymar_peticao_votos')
        .select('pais, quer_neymar');

    if (erroVotos) throw erroVotos;

    const rankingMap = new Map();

    for (const voto of votos || []) {
        const pais = normalizarPais(voto.pais);
        const atual = rankingMap.get(pais) || {
            pais,
            total_votos: 0,
            total_querem: 0
        };

        atual.total_votos += 1;

        if (voto.quer_neymar) {
            atual.total_querem += 1;
        }

        rankingMap.set(pais, atual);
    }

    const ranking = Array.from(rankingMap.values())
        .sort((a, b) => b.total_votos - a.total_votos || a.pais.localeCompare(b.pais));

    const { data: config, error: erroConfig } = await supabase
        .from('neymar_peticao_config')
        .select('exibir_percentual')
        .eq('id', 1)
        .maybeSingle();

    if (erroConfig) throw erroConfig;

    return {
        totalVotos: totalVotos || 0,
        totalQuerem: totalQuerem || 0,
        ranking,
        config: {
            exibir_percentual: config?.exibir_percentual ?? true
        }
    };
}

async function salvarVoto(supabase, body) {
    const email = normalizarEmail(body?.email);

    if (!validarEmail(email)) {
        return {
            status: 400,
            body: { error: 'E-mail inválido.' }
        };
    }

    if (!Object.prototype.hasOwnProperty.call(body || {}, 'querNeymar')) {
        return {
            status: 400,
            body: { error: 'Campo querNeymar é obrigatório.' }
        };
    }

    const { data, error } = await supabase
        .from('neymar_peticao_votos')
        .upsert({
            pais: normalizarPais(body.pais),
            email,
            quer_neymar: normalizarBoolean(body.querNeymar),
            atualizado_em: new Date().toISOString()
        }, {
            onConflict: 'email'
        })
        .select('id, pais, email, quer_neymar, criado_em, atualizado_em')
        .single();

    if (error) throw error;

    return {
        status: 200,
        body: data
    };
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    try {
        const supabase = getSupabase();

        if (req.method === 'GET') {
            return res.status(200).json(await lerDashboard(supabase));
        }

        if (req.method === 'POST') {
            const resultado = await salvarVoto(supabase, req.body || {});
            return res.status(resultado.status).json(resultado.body);
        }

        if (req.method === 'PUT') {
            const email = normalizarEmail(req.body?.email);

            if (!validarEmail(email)) {
                return erroHttp(res, 400, 'E-mail inválido.');
            }

            const { data, error } = await supabase
                .from('neymar_peticao_votos')
                .update({
                    pais: normalizarPais(req.body?.pais),
                    quer_neymar: normalizarBoolean(req.body?.querNeymar),
                    atualizado_em: new Date().toISOString()
                })
                .eq('email', email)
                .select('id, pais, email, quer_neymar, criado_em, atualizado_em')
                .maybeSingle();

            if (error) throw error;
            if (!data) return erroHttp(res, 404, 'Voto não encontrado.');

            return res.status(200).json(data);
        }

        if (req.method === 'DELETE') {
            const email = normalizarEmail(req.query?.email);

            if (!validarEmail(email)) {
                return erroHttp(res, 400, 'E-mail inválido.');
            }

            const { data, error } = await supabase
                .from('neymar_peticao_votos')
                .delete()
                .eq('email', email)
                .select('id');

            if (error) throw error;

            return res.status(200).json({
                deleted: data?.length || 0
            });
        }

        res.setHeader('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
        return erroHttp(res, 405, 'Método não permitido.');
    } catch (error) {
        console.error(error);
        return erroHttp(res, 500, error.message || 'Erro interno.');
    }
}
