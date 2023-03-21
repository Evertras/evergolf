.PHONY: dev
dev: node_modules
	@npm start

.PHONY: build
build: node_modules
	@npm run build

.PHONY: lint
lint: node_modules
	@npx prettier --check .

.PHONY: lint-fix
lint-fix: node_modules
	@npx prettier --write .

.PHONY: test
test: node_modules
	@npm test

node_modules: package.json package-lock.json
	@npm install
