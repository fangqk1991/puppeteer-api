# puppeteer-api

### 使用 Docker 启动
```
docker pull fangqk1991/puppeteer-api

docker run -d --restart=unless-stopped \
  --name puppeteer-api \
  -p 6789:6789 \
  fangqk1991/puppeteer-api
```

### 访问 Swagger 文档
* <http://localhost:6789/api-docs/v1/puppeteer>

### 执行示例代码

```
curl -X POST 'http://localhost:6789/api/v1/puppeteer/example'
```
