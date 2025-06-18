VALID_ENVS := LOCAL PROD
ENV ?= LOCAL

# Validate ENV
ifeq (,$(filter $(ENV),$(VALID_ENVS)))
$(error Invalid ENV "$(ENV)". Must be one of: $(VALID_ENVS))
endif

CURRENT_CONTEXT=$(shell kubectl config current-context)

ifeq ($(ENV),LOCAL)
	if [ "$$CURRENT_CONTEXT" = "jw-prod" ]; then \
		echo "LOCAL env can't be used for jw-prod context"; \
    	exit 1; \
    fi
endif

NAMESPACE := jw-apps

help:
	@echo "Usage: make <target> ENV=LOCAL|PROD"
	@echo ""
	@echo "Targets:"
	@echo "  kubectl/apply deploy changes to the kubernetes"
	@echo "  kubectl/update-version deploy new version to the kubernetes"

check-age-key:
ifeq ($(ENV),PROD)
ifdef AGE_KEY
	export SOPS_AGE_KEY=$$(AGE_KEY);
endif
endif

context/print:
	@echo "Current context $(CURRENT_CONTEXT)"

kubectl/apply: context/print check-age-key
ifeq ($(ENV),PROD)
	sops -d infra/k8s/config/prod/secrets.enc.env > infra/k8s/config/prod/secrets.env
	sops -d infra/k8s/config/prod/keycloak.enc.pem > infra/k8s/config/prod/keycloak.pem
	kustomize build infra/k8s/config/prod > infra/k8s/configs.yaml
else
	kustomize build infra/k8s/config/local > infra/k8s/configs.yaml
endif
	kubectl get namespace $(NAMESPACE)  || kubectl create namespace $(NAMESPACE)
	kubectl -n $(NAMESPACE) apply -f infra/k8s

kubectl/update-version: context/print
ifndef VERSION
	$(error VERSION must be provided)
endif
ifdef VERSION
	kubectl -n $(NAMESPACE) set image deployment/congregations-api congregations-api=ghcr.io/ivanskrypka/congregations-api:$(VERSION)
	kubectl -n $(NAMESPACE) rollout status deployment/congregations-api --timeout=300s
endif

db-migration/up: context/print
	@npm install
	@npm run build
	@kubectl port-forward service/postgres-postgresql 5432:5432 -n infra >  /dev/null 2>&1 & PORT_FORWARD_PID=$$!; \
	sleep 3; \
	npm run migration:run; \
	MIGRATION_EXIT_CODE=$$?; \
	kill $$PORT_FORWARD_PID; \
	exit $$MIGRATION_EXIT_CODE
