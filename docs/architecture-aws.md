# Arquitetura AWS - GitHub Users Integration

## Componentes da Arquitetura

### 1. Amazon S3

- Armazena os artefatos estáticos da aplicação (HTML, JavaScript, CSS, assets)
- Bucket configurado para hosting de site estático
- Custo operacional muito baixo

### 2. Amazon CloudFront

- CDN em frente ao bucket S3
- Entrega conteúdo via HTTPS (certificado gerenciado pelo ACM)
- Faz cache dos arquivos estáticos, reduzindo latência e custo de S3

### 3. Amazon Route 53 (opcional)

- Gerencia o DNS quando há domínio próprio
- Registros `A (Alias)` apontando o domínio para a distribuição CloudFront

## Fluxo de Requisições

1. O usuário acessa o domínio da aplicação.
2. O DNS (Route 53, quando usado) resolve o domínio para a distribuição CloudFront.
3. O CloudFront serve os arquivos estáticos a partir do S3 (ou do próprio cache).
4. O bundle React é carregado no navegador.
5. A aplicação React consome diretamente a API pública do GitHub (`api.github.com`) a partir do cliente.

## Deploy da Aplicação

1. Gerar o build da aplicação React/Vite: `npm install` e `npm run build` (gera a pasta `dist/`).
2. Criar um bucket S3 configurado como site estático.
3. Fazer upload do conteúdo de `dist/` para o bucket S3.
4. Criar uma distribuição CloudFront apontando para o bucket S3.
5. (Opcional) Configurar Route 53 para apontar um domínio próprio para a distribuição CloudFront.
6. Em novos releases: rodar `npm run build`, reenviar `dist/` para o S3 e invalidar o cache do CloudFront.

## Diagrama Simplificado

```
Usuário
  ↓ HTTPS
CloudFront (CDN)
  ↓
S3 (arquivos estáticos da aplicação)
  ↓
Navegador carrega React
  ↓ HTTPS
API do GitHub (api.github.com)
```
