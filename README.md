# Chopperia Nº 1 — Sistema de Controle de Mesas

Dois arquivos, um link só:

- **`index.html`** → tela de operação (mapa de mesas, cardápio, fechamento de conta). Compartilhe esse link com os garçons/caixa. Pode ser aberto em quantos celulares/tablets/PCs vocês quiserem, ao mesmo tempo.
- **`admin.html`** → área restrita por senha (cardápio, vendas, despesas, lucro líquido, metas).

Os dois ficam sincronizados em tempo real através do **Firebase** (banco de dados gratuito do Google). É por isso que dá para fechar conta em vários aparelhos e o relatório do dia soma tudo automaticamente.

---

## Passo 1 — Criar o projeto Firebase (grátis, 5 minutos)

1. Acesse **console.firebase.google.com** e faça login com uma conta Google.
2. Clique em **"Adicionar projeto"**, dê um nome (ex: `chopperia-n1`) e siga o assistente (pode desativar o Google Analytics, não é necessário).
3. Dentro do projeto, no menu lateral, clique em **Compilação (Build) → Firestore Database → Criar banco de dados**.
   - Escolha o local mais próximo (ex: `southamerica-east1` — São Paulo).
   - Selecione **"Iniciar em modo de produção"**.
4. Vá em **Compilação → Firestore Database → Regras** e substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

   Isso libera leitura/escrita para quem tiver o link. **É simples de propósito**, para não exigir login dos garçons. A segurança real do sistema está em: (a) o link do admin pedir senha, e (b) o link da operação não expor nada sensível (preços e pedidos, só isso). Se um dia quiser reforçar, dá pra evoluir para Firebase Authentication — me chame que ajudo.

5. Volte à página inicial do projeto (ícone de casa), clique no ícone **`</>`** ("Web") para registrar um app da Web. Dê um apelido (ex: `sistema-mesas`) e clique em **Registrar app**.
6. O Firebase vai mostrar um bloco `firebaseConfig = { apiKey: ..., ... }`. **Copie esses valores.**

## Passo 2 — Preencher o `firebase-config.js`

Abra o arquivo `firebase-config.js` e cole os valores copiados no lugar de `COLE_AQUI...`. Salve.

## Passo 3 — Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado).
2. Suba os 4 arquivos: `index.html`, `admin.html`, `firebase-config.js`, `logo.jpg`.
3. Vá em **Settings → Pages**, em "Branch" selecione `main` e pasta `/root`, salve.
4. Em alguns minutos o GitHub mostra o link público, algo como:
   `https://seuusuario.github.io/nome-do-repositorio/`

Esse é o link que vocês vão usar todo santo dia — `index.html` abre direto nessa raiz. O link do admin fica em `.../admin.html`.

## Passo 4 — Primeiro acesso

- A tela de operação já nasce com as mesas do restaurante (2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 34, 38, V-1 a V-8) e as categorias (Executivos, Grelhados, Aperitivos, Guarnições, Bebidas, Pizza, Vinhos, Sobremesa, Extras) — só falta cadastrar os itens com preço, que você faz em **Admin → Cardápio**.
- O valor do **couvert por pessoa** vem padrão em R$ 15,00 — dá pra mudar em **Admin → Configurações**. Na comanda, o garçom marca a caixinha "Couv." e informa quantas pessoas; o sistema multiplica automaticamente.
- **Senha padrão do admin: `admin123`**. Troque assim que entrar, em **Admin → Configurações**.
- Na primeira vez que abrir `index.html` em cada aparelho, ele vai pedir um nome para identificar o dispositivo (ex: "Caixa", "Garçom Ana") — isso aparece no relatório do dia.

## Como funciona no dia a dia

1. Garçom abre o link, toca na mesa, adiciona os itens do cardápio.
2. Qualquer outro aparelho que abrir a mesma mesa vê os itens em tempo real.
3. No fechamento, escolhe a forma de pagamento → o sistema imprime o recibo (usa a impressão do navegador, então a impressora térmica de rede precisa estar instalada como impressora padrão do aparelho) e grava o fechamento.
4. Botão **"Relatório do dia"** na tela de operação soma todos os fechamentos do dia, não importa em qual aparelho foram feitos.
5. No **Admin**, a aba **Vendas** mostra o total por mês/ano; **Despesas** funciona como uma planilha de custos fixos e variáveis; **Lucro líquido** cruza vendas menos despesas; **Metas** compara o realizado com a meta que você define.

## Sobre a impressora térmica de rede

Como o sistema roda no navegador, a impressão usa a caixa de diálogo de impressão do próprio sistema operacional do aparelho. Para imprimir direto na térmica:
- No Windows/Android/iOS, adicione a impressora de rede (Wi-Fi) nas configurações de impressora do aparelho que vai operar o caixa.
- No fechamento, o `index.html` já abre o recibo formatado para 78mm — é só confirmar a impressão na impressora certa.
- Cada aparelho que for imprimir precisa da impressora configurada nele (não tem como "forçar" a impressão remotamente por segurança do navegador).

## Dúvidas / evoluções futuras

Esse sistema já resolve os dois pedidos: (1) fechamento multi-dispositivo com relatório diário consolidado, e (2) separação clara entre a tela pública de operação e a área administrativa com senha, guardando histórico para relatório mensal e controle financeiro. Se quiser depois: login individual por garçom, controle de estoque, ou emissão de nota fiscal, dá pra evoluir em cima da mesma base — é só me chamar.
