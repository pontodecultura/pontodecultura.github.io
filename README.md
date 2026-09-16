# Barriguda Web TV — App Portável

Aplicação estática, responsiva e portátil feita com HTML5 + CSS3 + JavaScript (ES Modules). Não usa backend nem banco de dados.

## Como executar

1. Extraia o ZIP.
2. Abra `index.html` em um navegador moderno.
3. Para uso em rede local, copie a pasta para um servidor estático simples (por exemplo, XAMPP/Apache ou Live Server do VS Code).

O projeto não possui etapa de build obrigatória; os arquivos entregues já estão organizados para execução.

## Estrutura

- `index.html` — shell da aplicação.
- `css/styles.css` — identidade visual, responsividade e componentes.
- `js/config.js` — configurações centrais (redes, contato, YouTube e marca).
- `js/storage.js` — camada de persistência em `localStorage`.
- `js/model.js` — modelo e dados padrão.
- `js/view.js` — renderização das páginas/componentes.
- `js/app.js` — roteamento hash, eventos e ciclo da aplicação.
- `assets/img/` — logo e imagens de apoio.

## Padrão utilizado

O projeto utiliza uma adaptação simples de MVC para uma SPA estática:

- **Model**: `model.js` + `storage.js`.
- **View**: `view.js`.
- **Controller/Orquestração**: `app.js`.

Isso mantém a separação das responsabilidades sem introduzir uma infraestrutura de backend.

## LocalStorage

As chaves usadas pelo aplicativo possuem o prefixo `barriguda-webtv:`.

- `theme` — tema claro/escuro.
- `config` — sobrescritas das configurações.
- `messages` — mensagens do formulário de contato.
- `gallery` — galeria opcional customizada.

## Onde editar

Abra `js/config.js` para alterar:

- e-mail
- WhatsApp
- cidade/endereço
- URL do canal YouTube
- URL de incorporação da live
- Facebook
- Instagram
- WhatsApp
- YouTube
- descrição da marca

### Importante sobre a Live

A variável `live.youtubeEmbed` deve receber uma URL de incorporação do YouTube, por exemplo:

`https://www.youtube.com/embed/ID_DO_VIDEO`

Para a página ficar estável sem depender da troca manual do vídeo, você pode apontar para um embed oficial usado pela sua estrutura de transmissão ou adaptar a área do player para o método de live adotado pela emissora.

## Logo

A pasta `assets/img/` já contém uma arte da Barriguda Web TV/Rádio incorporada ao projeto. O arquivo usado no cabeçalho é `logo-barriguda-webtv-radio.png`.

Caso você queira usar outra versão da logo, substitua o arquivo e mantenha o mesmo nome, ou ajuste o `src` em `index.html`.

## Limitação do formulário

Sem backend, o formulário de contato não envia mensagens para um servidor/e-mail. Ele apenas armazena os dados no `localStorage` do navegador. Os botões de e-mail e WhatsApp fazem contato externo.
