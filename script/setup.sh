#!/bin/sh

# Require PROJECT_ID argument
[ "$#" -eq 1 ] || {
    echo "Requires one argument, PROJECT_ID" >&2;
    exit 1;
}

# https://serverless.com/framework/docs/providers/google/guide/credentials/

PROJECT=${1}

# Enable APIs
./api.sh "${PROJECT}"

# Create new service account and assign roles to it
./credentials.sh "${PROJECT}"