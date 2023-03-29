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
	@npm test -- --watchAll=false

.PHONY: test-dev
test-dev: node_modules
	@npm test

.PHONY: test-coverage
test-coverage: node_modules
	@npm test -- --coverage --watchAll=false

.PHONY: test-coverage-dev
test-coverage-dev: node_modules
	@npm test -- --coverage

.PHONY: clean
clean:
	rm -rf node_modules

node_modules: package.json package-lock.json
	@npm install
	@npx husky install
	@touch node_modules
