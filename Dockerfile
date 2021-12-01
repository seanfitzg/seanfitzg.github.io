FROM nginx
COPY . /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

# docker build -f Dockerfile -t eiresurfer .
# docker run -it --rm -p 3000:80 eiresurfer