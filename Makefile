.PHONY: lint
lint: node_modules
	@npx prettier --write .

node_modules: package.json package-lock.json
	@npm install
