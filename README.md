# MB-Front-teste

Projeto para o teste de frontend do mercado bitcoin criado com o scafolding padrão do expressjs: [express-generator](https://expressjs.com/en/starter/generator.html) e para o front foi criado um porjeto dentro da pasta public do projeto com o scafolding pasrão do vue3 [Create Vue](https://github.com/vuejs/create-vue).

### Instruções para execução

#### Download do projeto e instalação das dependências

##### Instalação das dependncias do projeto com expressjs(backend)

```bash
$ git clone https://github.com/tvmota/mb-frontend-test
$ cd mb-frontend-test
#----------Execução_Com_NPM---------
$ npm i
#----------Execução_Com_YARN---------
$ yarn
```

##### Instalação das dependncias do projeto com vue(frontend)

```bash
$ cd mb-frontend-test/public/javascript/mb-frontend-app
#----------Execução_Com_NPM---------
$ npm i
#----------Execução_Com_YARN---------
$ yarn
```

#### Execução do servidor de desenvolvimento

```bash
$ cd mb-frontend-test
#----------Execução_Com_NPM---------
$ npm run dev
#----------Execução_Com_YARN---------
$ yarn dev
```

Após executar o comando o projeto com a parte do backend ficará disponível em : [http://localhost:3001/](http://localhost:3001/).

#### Execução e build do projeto do front

A parte com o front fica hospedada na pasta `/public/javascript/mb-frontend-app` e o build do front com os arquivos estaticos finais está dentro da pasta `/public/javascripts/app`. Para gerar um novo build do front basta executar o seguinte comando:

##### Geração do build do front

```bash
$ cd mb-frontend-test
#----------Execução_Com_NPM---------
$ npm run build:front
#----------Execução_Com_YARN---------
$ yarn build:front
```

##### Desenvolvimento do projeto de front

```bash
$ cd mb-frontend-test
#----------Execução_Com_NPM---------
$ npm run build:front:watch
#----------Execução_Com_YARN---------
$ yarn build:front:watch
```

Este comando gera os arquivos estáticos do front e os copia para a pasta `/public` e fica "escutando" as modificações dos arquivos do front executando novamente o build e copiando os arquivos, com isso é possível consumir os arquivos de front no servidor do back no endereço: [http://localhost:3001/](http://localhost:3001/) ou [http://localhost:3001/registration](http://localhost:3001/registration)

##### Servidor de desenvolvimento do front

```bash
$ cd mb-frontend-test
#----------Execução_Com_NPM---------
$ npm run start:front
#----------Execução_Com_YARN---------
$ yarn start:front
```

Este comando disponíbiliza um servidor para desenvolvimento do front em [http://localhost:5173/](http://localhost:5173/), mas não é possível acessar a api em [http://localhost:3001/](http://localhost:3001/) por questões de CORS, sendo assim esse comando seria para executar um desenvolvimento "offline" do front.

### Libs utilizadas

#### Backend

- **framework**: [Express.js](https://expressjs.com/).
- **Gerenciador de processos**: [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/).
- **Templates**: [Pug](https://pugjs.org/).
- **Validação**: [Yup](https://yup-docs.vercel.app/).
- **Manipulação de datas**: [Date-fns](https://date-fns.org/).
- **Linter**: [eslint](https://eslint.org/).

#### frontend

- **Framework UI**: [Vue v3](https://vuejs.org/).
- **Roteamento**: [Vue router](https://router.vuejs.org/)
- **Empacotador(Module Bundler)**: [Vitejs](https://vitejs.dev/)
  Opção padrão para criação de novos projetos com vue v3 também mantida pelos criadores do vuejs
- **Processador CSS**: [Postcss](https://postcss.org/)
  Processador css que utiliza plugins para processar o css, como exemplo neste projeto foi utilizado para compilar o tailwind e também o purgecss para otimizar o css removendo css inutilizado
- **Validação**: [Yup](https://yup-docs.vercel.app/).
- **Manipulação de datas**: [Date-fns](https://date-fns.org/).
- **Linter**: [eslint](https://eslint.org/).
