# Consulta Fácil - Protótipo

Este é um protótipo desenvolvido para a matéria de **Desenvolvimento para dispositivos móveis**, com o objetivo de materializar as telas projetadas no Figma e demonstrar a implementação da arquitetura de componentes proposta na etapa anterior do projeto final.

## 📋 Sobre o Projeto

O **Consulta Fácil** é uma plataforma web para agendamento de consultas médicas, desenvolvida como protótipo funcional para validar a viabilidade técnica e de experiência do usuário das telas projetadas no Figma.

### 🎯 Objetivos do Protótipo

- **Materialização do Design**: Transformar as telas do Figma em código funcional
- **Validação da Arquitetura**: Implementar e testar a arquitetura de componentes proposta
- **Experiência do Usuário**: Validar fluxos de navegação e interação
- **Viabilidade Técnica**: Demonstrar a implementação das funcionalidades core, ainda que sem integração com back. 

## 🏗️ Arquitetura de Componentes

O projeto segue a arquitetura de componentes proposta, organizada em:

```
src/
├── components/          # Componentes reutilizáveis
│   ├── atoms/          # Componentes atômicos (botões, inputs, etc.)
│   └── layout/         # Componentes de layout (header, footer)
├── containers/         # Containers/páginas da aplicação
│   ├── Auth/          # Autenticação (login, cadastro)
│   ├── Landing/       # Páginas principais (home, about, profile)
│   ├── Pacient/       # Funcionalidades do paciente
│   └── Professional/  # Funcionalidades do profissional
├── store/             # Gerenciamento de estado (auth)
├── services/          # Serviços e APIs
├── models/            # Tipos e interfaces TypeScript
└── theme/             # Configuração de tema e estilos
```

## 🚀 Funcionalidades Implementadas

### 👥 Autenticação
- Login de usuários (pacientes e profissionais)
- Cadastro de pacientes
- Cadastro de profissionais
- Recuperação de senha

### 🏥 Agendamento de Consultas
- Busca de profissionais por especialidade
- Filtros por valor, data e localização
- Agendamento de consultas
- Visualização de horários disponíveis
- Cancelamento e reagendamento

### 👨‍⚕️ Painel do Profissional
- Visualização de agendamentos
- Gerenciamento de consultas
- Visualização de avaliações dos pacientes
- Perfil profissional com informações e agenda

### 👤 Perfil do Paciente
- Histórico de consultas
- Avaliação de profissionais
- Informações pessoais
- Exames e diagnósticos (mock)

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização
- **React Router** - Navegação
- **Context API** - Gerenciamento de estado

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre no diretório
cd consulta-facil

# Instale as dependências
npm install
```

### Execução
```bash
# Inicie o servidor de desenvolvimento
npm start

# Acesse http://localhost:3000
```

### Scripts Disponíveis

- `npm start` - Executa o app em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm test` - Executa os testes (não implementados no protótipo)

## 🎨 Design System

O projeto utiliza um design system consistente com:
- **Cores**: Paleta baseada em tons de verde (#426B1F)
- **Tipografia**: Fonte Inter para melhor legibilidade
- **Componentes**: Sistema de componentes atômicos
- **Responsividade**: Layout adaptável para diferentes dispositivos

## 📱 Protótipo vs. Produção

Este é um **protótipo funcional** que demonstra:
- ✅ Fluxos de navegação completos
- ✅ Interface responsiva
- ✅ Validações básicas
- ✅ Dados mockados realistas

**Não implementado** (para versão de produção):
- ❌ Backend real
- ❌ Autenticação segura
- ❌ Banco de dados
- ❌ Testes automatizados
- ❌ Deploy em produção

## 📊 Estrutura de Dados (Mock)

O protótipo utiliza dados mockados para simular:
- Usuários (pacientes e profissionais)
- Agendamentos
- Avaliações
- Horários disponíveis
- Informações de hospitais/clínicas

## 🎯 Próximos Passos

Para evoluir do protótipo para uma aplicação de produção:
1. Implementar backend robusto
2. Adicionar autenticação segura
3. Integrar com banco de dados
4. Implementar testes automatizados
5. Configurar CI/CD
6. Deploy em ambiente de produção

## 📝 Documentação do Projeto

Este protótipo faz parte de um projeto acadêmico de **Desenvolvimento Móvel**, onde:
- **Fase 1**: Design e prototipagem no Figma
- **Fase 2**: Definição da arquitetura de componentes
- **Fase 3**: Implementação do protótipo (este repositório)
- **Fase 4**: Apresentação

---

**Desenvolvido para fins acadêmicos** - Universidade IFSP Guarulhos - Disciplina de Desenvolvimento Mobile
