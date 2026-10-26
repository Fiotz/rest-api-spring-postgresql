# 🚀 API REST Spring Boot + PostgreSQL + SPA

Este projeto é uma aplicação Full Stack completa rodando em um ambiente conteinerizado via GitHub Codespaces. Ele conta com uma API REST em Java (Spring Boot), persistência de dados com JPA/Hibernate no PostgreSQL e um Frontend SPA (Single Page Application) feito com Vanilla JS.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Java 17, Spring Boot 3, Maven
* **Banco de Dados:** PostgreSQL 16 (via Docker)
* **Persistência:** Spring Data JPA / Hibernate
* **Frontend:** HTML5, CSS3 (Sakura.css), JavaScript (Vanilla SPA)
* **Infraestrutura:** GitHub Codespaces + Dev Containers (Docker Compose)

---

## 🚀 Como Rodar o Projeto

Como o projeto está configurado com Dev Containers, **você não precisa instalar Java, Maven ou PostgreSQL na sua máquina**.

### 1. Iniciar o Codespace
1. No seu repositório no GitHub, clique no botão verde **`Code`**.
2. Vá para a aba **`Codespaces`** e clique em **`Create codespace on main`**.
3. Aguarde alguns minutos. O GitHub vai ler a pasta `.devcontainer` e montar automaticamente:
   * A máquina virtual com Java 17.
   * O banco de dados PostgreSQL com o banco `meubanco` criado.

### 2. Rodar a Aplicação (Backend + Frontend)
Com o Codespace aberto (VS Code no navegador), abra o terminal (`Ctrl + '`) e execute:

```bash
mvn spring-boot:run
``` 

# mvn: command not found
Causa: A imagem base do Java no Codespace não vem com o Maven instalado por padrão.
Solução Rápida: Instale o Maven na sessão atual rodando:

```bash
source /usr/local/sdkman/bin/sdkman-init.sh && sdk install maven
```

Solução Definitiva: Adicione a configuração de instalação do Maven no arquivo .devcontainer/devcontainer.json e faça um Rebuild Container.


# Erro HTTP 502 (Bad Gateway) ao abrir a página no navegador
Causa: O Codespace não conseguiu redirecionar o tráfego externo para a porta da sua aplicação, ou a aplicação não estava rodando.
Solução:

Certifique-se de que o terminal mostra Tomcat started on port 8080.

Vá na aba PORTS, encontre a porta 8080, mude a visibilidade para Public e tente novamente. (Às vezes, alternar entre Private e Public força a atualização do túnel).

# Falha ao criar o container: .devcontainer/docker-compose.yml not found
Causa: O arquivo devcontainer.json está tentando referenciar o docker-compose.yml, mas ele não está no repositório.
Solução: Certifique-se de que a pasta .devcontainer contém os dois arquivos: devcontainer.json e docker-compose.yml. Se você acabou de criá-los, faça um git push e recrie o Codespace.

# Erro de Conexão com o Banco de Dados (JPA/Hibernate)
Causa: O Spring Boot não consegue achar o PostgreSQL.
Solução: Verifique o arquivo src/main/resources/application.properties. A URL de conexão não deve ser localhost, deve apontar para o nome do serviço no Docker Compose:

```properties
spring.datasource.url=jdbc:postgresql://db:5432/meubanco
spring.datasource.username=postgres
spring.datasource.password=postgres
``` 