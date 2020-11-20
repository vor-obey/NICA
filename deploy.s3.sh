#!/bin/bash

npm run build

aws s3 sync ./build s3://teammanagement.dev.fxrlabs.com --profile teamManagementDev --delete && \
aws cloudfront create-invalidation --distribution-id E39NVUI7TQ9B0U --profile teamManagementDev --paths "/*"
