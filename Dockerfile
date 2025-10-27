# Usar uma imagem base do Nginx
FROM nginx:alpine

# Copiar todos os arquivos do projeto para o diretório do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 8082 (porta interna do container)
EXPOSE 8082

# Rodar o Nginx com configuração para usar a porta 8081
CMD ["nginx", "-g", "daemon off;"]