# Etapa base: usar imagem leve do Nginx
FROM nginx:stable-alpine

# Copia seus arquivos HTML, CSS e JS para a pasta pública do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# O Nginx inicia automaticamente ao rodar o container
