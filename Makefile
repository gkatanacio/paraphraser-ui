.env:
	cp .env.example .env

.env.aws:
	cp .env.aws.example .env.aws

.PHONY: deps
deps:
	npm install

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test:
	npm run test

.PHONY: dev
dev:
	npm run dev

.PHONY: build
build:
	npm run build

.PHONY: deploy
deploy: .env.aws dist
	docker run --rm -it --entrypoint sh -v ./dist:/aws/dist --env-file .env.aws amazon/aws-cli \
	-c 'aws s3 sync dist s3://$$S3_STATIC_SITE_BUCKET --delete --storage-class ONEZONE_IA && aws cloudfront create-invalidation --distribution-id $$CF_DISTRIBUTION_ID --paths "/*" --no-cli-pager'
