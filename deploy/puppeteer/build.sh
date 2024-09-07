#!/bin/bash

set -e
set -v on

__DIR__=`cd "$(dirname "$0")"; pwd`
ROOT_DIR="${__DIR__}/../.."
cd "${ROOT_DIR}"

imageName=fangqk1991/puppeteer-api
containerName=my-puppeteer-api
env=development
# 静态资源会根据 Refer 判断防盗链，本地环境不能正常访问，故传递参数构建特殊镜像
docker build -t ${imageName} -f "${__DIR__}/Dockerfile" .

docker container stop ${containerName} || true
docker container rm ${containerName} || true

docker run --name ${containerName} --hostname=`hostname` -d \
  -p 6789:6789 \
  -e ENV=${env} \
  ${imageName}
docker exec -it my-puppeteer-api /bin/sh -c 'echo "#" >> /etc/hosts'

echo "You can visit <http://localhost:6789/api-docs/v1/puppeteer> to check."
