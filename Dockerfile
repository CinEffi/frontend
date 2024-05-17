FROM node:21.7.1-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3000

# 가만히...
# CMD ["tail", "-f", "/dev/null"]

CMD ["npm", "start"]

# FROM node:21.7.1-alpine as builder 
# # node.js 서버 이미지를 사용해서 환경을 구성 후 다른 서버에서 빌더로 사용하기 위해 as builder
# WORKDIR /app 
# COPY package*.json ./         
# # 현재 프로젝트 폴더에서 package.json, package.lock.json 을 복사해간다
# RUN npm ci   
# # 복사해간 package.json 을 이용하여 의존성 설치
# COPY ./ ./   
# # 현재 폴더내의 데이터를 복사해간다
# RUN npm run build 
# # react build

# FROM nginx:1.20-alpine 
# # nginx image 
# COPY --from=builder /app/build /usr/share/nginx/html 
# # as builder 로 가져온 node.js 서버 환경에서 build 폴더를 찾아 nginx 의 html 폴더 내로 복사
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf  
# # 프로젝트 폴더에 nginx.conf 설정 파일을 만들어서 내용 작성을 먼저 선행한다 (nginx 로 복사해간다)
# EXPOSE 80 
# # 80포트 명시적으로 개방
# CMD ["nginx", "-g", "daemon off;"] 
# # cmd 명령어를 실행 -> nginx -g daemon off