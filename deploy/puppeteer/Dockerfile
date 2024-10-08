########################################
FROM --platform=$TARGETPLATFORM node:19-alpine AS FILES_CACHE

WORKDIR /data/source-files
COPY . .

RUN mkdir -p /data/meta-files \
    && find . -not -path "*/node_modules/*" -name "package.json" \
      | xargs -i dirname {} \
      | xargs -i sh -c "mkdir -p /data/meta-files/{} && cp {}/package.json /data/meta-files/{}" \
    && cp /data/source-files/pnpm-lock.yaml \
          /data/source-files/.npmrc \
          /data/source-files/pnpm-workspace.yaml \
          /data/meta-files

# 格式化 package.json
RUN node ./deploy/deps/purify-package-json.js /data/meta-files

########################################
# 准备仅包含 package.json 和 pnpm-lock.yaml 的最小构建依赖文件
# package.json 以外的文件修改将不会影响缓存命中
FROM --platform=$TARGETPLATFORM node:19-alpine AS MODULES_CACHE

ARG BUILD_DIR=/data/build

WORKDIR ${BUILD_DIR}

RUN yarn global add pnpm@8.2.0

COPY --from=FILES_CACHE /data/meta-files/pnpm-lock.yaml ${BUILD_DIR}/pnpm-lock.yaml
RUN pnpm fetch

# 本仓库所有项目共享 pnpm install 缓存
COPY --from=FILES_CACHE /data/meta-files ${BUILD_DIR}
RUN pnpm install -r

# node_modules 已准备完毕；此时复制完整源代码
COPY --from=FILES_CACHE /data/source-files ${BUILD_DIR}

RUN pnpm build
RUN rm -rf ./node_modules/ && pnpm install -r --prod

########################################
# 最终镜像，仅复制可执行的程序文件和准备必要的系统服务（nginx、curl）
FROM --platform=$TARGETPLATFORM node:19-alpine

# 其他项目若将本语句置于最前方，可共享缓存命中
RUN yarn global add pm2 && pm2 install pm2-logrotate

LABEL maintainer="work@fangqk.com"
WORKDIR /data/puppeteer

RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY --from=MODULES_CACHE /data/build .

# 此步骤会使文件发生改变，应放在后方避免影响缓存命中
ARG commitSHA=Unknown
RUN sed -i 's/COMMIT_SHA/'${commitSHA}'/g' ./packages/puppeteer-backend/ecosystem.config.js
LABEL commitSHA="${commitSHA}"

CMD pm2-runtime ./packages/puppeteer-backend/ecosystem.config.js --env ${ENV}
