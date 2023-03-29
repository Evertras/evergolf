.PHONY: dev
dev: node_modules .husky
	@npm start

.PHONY: build
build: node_modules .husky
	@npm run build

.PHONY: lint
lint: node_modules .husky
	@npx prettier --check .

.PHONY: lint-fix
lint-fix: node_modules .husky
	@npx prettier --write .

# Alias for muscle memory
.PHONY: fmt .husky
fmt: lint-fix .husky

.PHONY: test
test: node_modules
	@echo "Skipping tests until there's something meaningful again"
	@#npm test

node_modules: package.json package-lock.json
	@npm install
	@touch node_modules

.husky: node_modules
	@npx husky install
