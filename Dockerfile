# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Exponha a porta usada pela API
EXPOSE 3000

# Comando para iniciar a API
CMD ["npm", "start"]
