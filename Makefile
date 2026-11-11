.DEFAULT_GOAL := help
.PHONY: help build

help: ## Show this help
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z_-]+:.*## / {printf "make %-6s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: node_modules ## Package the extension into start-view-<version>.vsix
	npm run package

node_modules: package-lock.json
	npm ci --ignore-scripts
	@touch node_modules
