.PHONY: deploy-development
deploy-development:
	export APP_CONFIG=config/app-config-demo.json && \
	sh script/setup_initial.sh config/app-config-demo.json && \
	sh script/destroy_stacks.sh config/app-config-demo.json