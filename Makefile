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

# Alias for muscle memory
.PHONY: fmt
fmt: lint-fix

.PHONY: test
test: node_modules
	@echo "Skipping tests until there's something meaningful again"
	@#npm test

node_modules: package.json package-lock.json
	@npm install
	@touch node_modules
