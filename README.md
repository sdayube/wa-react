# WA Film - React

Essa aplicação foi desenvolvida como desafio técnico para a empresa WA - Work Anywhere, referente à parte do front-end, em paralelo a uma [API em Node.js no back-end](https://github.com/sdayube/wa-film-api).

Como não foi fornecida uma base de design para a página, utilizei algumas estilizações simples utilizando a lib [Stitches](https://stitches.dev/) para a escrita do css, sob o modelo CSS-in-JS (de modo parecido com o styled-components).

Utilizei também o Next.js por ser uma opçao que permite server-side rendering (SSR) e cuja arquitetura de páginas torna um projeto desse tipo mais simples de desenvolver. Também fiz essa opçao por conta da facilidade de integração com a Vercel para o deploy da aplicação.

## Como executar
Para executar localmente a aplicação, é necessário:
- instalar as dependências por meio de um `npm install` na pasta raiz
- renomeie o arquivo `example.env` para `.env`
  - Esse arquivo guarda as rotas do back-end de produção e desenvolvimento
  - Caso queira rodar o back-end localmente junto ao front, basta alterar a rota
- utilizar o comando `npm run dev`
  - A aplicação irá rodar na porta **3000** do localhost

## Testes
A aplicação inclui testes com Jest + RTL para a página principal. Para rodar os testes, execute o comando `npm test`


## Deploy
A aplicação foi deployados por meio do plano gratuito da plataforma Vercel, que funciona de maneira similar ao Heroku. Para acessar o front-end, utilize a url [https://wa-react.vercel.app/](https://wa-react.vercel.app/).

*Obs.: Como utilizei o plano gratuito da plataforma Render no back-end, o serviço irá entrar em standby após 15 minutos sem uso, ou seja, caso a primeira tentativa de carregar a página retorne um erro de timeout, o Render provavelmente estará buildando a aplicação novamente. Tente novamente após cerca de 2 a 3 minutos e provavelmente a página carregará normalmente.*
