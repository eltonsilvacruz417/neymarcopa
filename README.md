# Neymar na Copa - CRUD + Vercel + Supabase

## Estrutura

- `index.html`: tela principal
- `style.css`: layout
- `app.js`: integração do frontend com a API
- `api/votes.js`: CRUD serverless na Vercel
- `supabase.sql`: criação das tabelas, índices e triggers
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

A `SERVICE_ROLE_KEY` não deve ir para o frontend. Ela fica segura na função serverless da Vercel.

## 3. Rodar local

```bash
npm install
npx vercel dev
```

Acesse:

```txt
http://localhost:3000
```

## 4. Publicar na Vercel

Suba no GitHub:

```bash
git init
git add .
git commit -m "crud votos neymar"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/neymar-copa-crud.git
git push -u origin main
```

Na Vercel:

1. Add New Project
2. Import Git Repository
3. Escolha o repositório
4. Configure as Environment Variables:

```env
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

5. Deploy

## CRUD da API

### CREATE ou UPDATE por e-mail

```http
POST /api/votes
```

```json
{
  "pais": "Brasil",
  "email": "teste@email.com",
  "querNeymar": true
}
```

### READ dashboard

```http
GET /api/votes
```

Retorna:

```json
{
  "totalVotos": 1,
  "totalQuerem": 1,
  "ranking": [
    {
      "pais": "Brasil",
      "total_votos": 1,
      "total_querem": 1
    }
  ],
  "config": {
    "exibir_percentual": true
  }
}
```

### UPDATE

```http
PUT /api/votes
```

```json
{
  "pais": "Portugal",
  "email": "teste@email.com",
  "querNeymar": false
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

## Monetização

### Pix

Edite `app.js` e troque:

```js
const PIX_KEY = 'SUA_CHAVE_PIX_AQUI';
```

pela sua chave Pix real.

### Política e aviso

O projeto inclui:

- `privacy.html`: Política de Privacidade
- Aviso na página principal: projeto independente, sem vínculo oficial com Neymar

### AdSense

Depois que o Google AdSense aprovar o domínio, substitua o bloco visual `.ad-area`
por um bloco oficial do AdSense e inclua o script fornecido pelo Google.
