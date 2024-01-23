.env:
	cp .env.example .env

.env.aws:
	cp .env.aws.example .env.aws

.PHONY: envfiles
envfiles: .env .env.aws

.PHONY: deps
deps: envfiles
	docker-compose run --rm node npm install

.PHONY: lint
lint: envfiles
	docker-compose run --rm node npm run lint

.PHONY: test
test: envfiles
	docker-compose run --rm node npm run test

.PHONY: dev
dev: envfiles
	docker-compose run --rm --service-ports node npm run dev

.PHONY: build
build: envfiles
	docker-compose run --rm node npm run build

.PHONY: deploy
deploy: envfiles dist
	docker compose run --rm aws-cli \
	-c 'aws s3 sync dist s3://$$S3_STATIC_SITE_BUCKET --delete --storage-class ONEZONE_IA && aws cloudfront create-invalidation --distribution-id $$CF_DISTRIBUTION_ID --paths "/*" --no-cli-pager'
