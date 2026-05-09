import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import handler from '../api/votes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

await carregarEnv();

async function carregarEnv() {
    const envPath = path.join(root, '.env');

    try {
        const conteudo = await fs.readFile(envPath, 'utf8');

        for (const linha of conteudo.split(/\r?\n/)) {
            const texto = linha.trim();
            if (!texto || texto.startsWith('#')) continue;

            const indice = texto.indexOf('=');
            if (indice === -1) continue;

            const chave = texto.slice(0, indice).trim();
            const valor = texto.slice(indice + 1).trim().replace(/^["']|["']$/g, '');

            if (chave && process.env[chave] === undefined) {
                process.env[chave] = valor;
            }
        }
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }
}

function criarResposta(res) {
    return {
        setHeader(nome, valor) {
            res.setHeader(nome, valor);
        },
        status(codigo) {
            res.statusCode = codigo;
            return this;
        },
        json(payload) {
            if (!res.hasHeader('Content-Type')) {
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
            }
            res.end(JSON.stringify(payload));
            return this;
        },
        end(payload) {
            res.end(payload);
            return this;
        }
    };
}

async function lerBody(req) {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(chunk);
    }

    const texto = Buffer.concat(chunks).toString('utf8');
    if (!texto) return undefined;

    try {
        return JSON.parse(texto);
    } catch {
        return undefined;
    }
}

async function responderApi(req, res, url) {
    req.query = Object.fromEntries(url.searchParams.entries());
    req.body = await lerBody(req);

    await handler(req, criarResposta(res));
}

async function responderArquivo(url, res) {
    const caminhoUrl = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const arquivo = path.resolve(root, `.${caminhoUrl}`);

    if (!arquivo.startsWith(root)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Acesso negado.');
        return;
    }

    try {
        const conteudo = await fs.readFile(arquivo);
        const contentType = mimeTypes[path.extname(arquivo).toLowerCase()] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(conteudo);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Arquivo não encontrado.');
            return;
        }

        throw error;
    }
}

const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url || '/', `http://${req.headers.host || `localhost:${port}`}`);

        if (url.pathname === '/api/votes') {
            await responderApi(req, res, url);
            return;
        }

        await responderArquivo(url, res);
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: error.message || 'Erro interno.' }));
    }
});

server.listen(port, () => {
    console.log(`Servidor local em http://localhost:${port}`);
});
