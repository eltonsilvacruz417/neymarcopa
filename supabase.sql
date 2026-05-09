CREATE TABLE IF NOT EXISTS public.neymar_peticao_config
(
    id INT PRIMARY KEY,
    exibir_percentual BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.neymar_peticao_config (id, exibir_percentual)
VALUES (1, TRUE)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.neymar_peticao_votos
(
    id BIGSERIAL PRIMARY KEY,
    pais VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    quer_neymar BOOLEAN NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_neymar_peticao_votos_pais
ON public.neymar_peticao_votos (pais);

CREATE INDEX IF NOT EXISTS ix_neymar_peticao_votos_quer_neymar
ON public.neymar_peticao_votos (quer_neymar);

CREATE OR REPLACE FUNCTION public.set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_neymar_peticao_votos_atualizado_em
ON public.neymar_peticao_votos;

CREATE TRIGGER trg_neymar_peticao_votos_atualizado_em
BEFORE UPDATE ON public.neymar_peticao_votos
FOR EACH ROW
EXECUTE FUNCTION public.set_atualizado_em();

DROP TRIGGER IF EXISTS trg_neymar_peticao_config_atualizado_em
ON public.neymar_peticao_config;

CREATE TRIGGER trg_neymar_peticao_config_atualizado_em
BEFORE UPDATE ON public.neymar_peticao_config
FOR EACH ROW
EXECUTE FUNCTION public.set_atualizado_em();

-- Como a API usa SERVICE_ROLE_KEY no backend da Vercel,
-- mantenha RLS ligado e bloqueie acesso público direto às tabelas.
ALTER TABLE public.neymar_peticao_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neymar_peticao_votos ENABLE ROW LEVEL SECURITY;
