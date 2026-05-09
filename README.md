# Neymar na Copa - CRUD + Vercel + Supabase

## Estrutura

- `index.html`: tela principal
- `style.css`: layout
- `app.js`: integração do frontend com a API
- `api/votes.js`: CRUD serverless na Vercel
- `supabase.sql`: criação das tabelas, índices e triggers
- `privacy.html`: política de privacidade
- `.env.example`: variáveis necessárias

## 1. Criar banco no Supabase

No Supabase, abra:

```txt
SQL Editor > New Query
```

Cole e execute o conteúdo de `supabase.sql`.

## 2. Criar variáveis locais

Copie:

```bash
cp .env.example .env
```

Preencha:

```env
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
```

A `SERVICE_ROLE_KEY` não deve ir para o frontend.

## 3. Rodar local

```bash
npm install
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## 4. Publicar na Vercel

Na Vercel, importe o repositório e configure as Environment Variables:

```env
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

## Privacidade/LGPD

O formulário exige aceite da Política de Privacidade antes de registrar voto. O e-mail é usado para impedir votos duplicados e permitir atualização do voto pelo mesmo e-mail.

Para bancos criados antes desta versão, rode no SQL Editor do Supabase:

```sql
ALTER TABLE public.neymar_peticao_votos
ADD COLUMN IF NOT EXISTS consentimento_privacidade BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE public.neymar_peticao_votos
ADD COLUMN IF NOT EXISTS consentimento_privacidade_em TIMESTAMPTZ;
```

Sem esse ajuste, a API ainda valida o aceite, mas não consegue guardar as colunas de consentimento no banco antigo.

## CRUD da API

### CREATE ou UPDATE por e-mail

```http
POST /api/votes
```

```json
{
  "pais": "Brasil",
  "email": "teste@email.com",
  "querNeymar": true,
  "consentimentoPrivacidade": true
}
```

### READ dashboard

```http
GET /api/votes
```

### UPDATE

```http
PUT /api/votes
```

```json
{
  "pais": "Portugal",
  "email": "teste@email.com",
  "querNeymar": false,
  "consentimentoPrivacidade": true
}
```

### DELETE

```http
DELETE /api/votes?email=teste@email.com
```

## Flag para exibir ou esconder percentual

No Supabase:

```sql
UPDATE public.neymar_peticao_config
SET exibir_percentual = FALSE
WHERE id = 1;
```

Para voltar a exibir:

```sql
UPDATE public.neymar_peticao_config
SET exibir_percentual = TRUE
WHERE id = 1;
```
