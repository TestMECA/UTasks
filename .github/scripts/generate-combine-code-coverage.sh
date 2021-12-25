!/bin/sh
#This script generate a combine code coverage between cypress (e2e) and jest (unit test)

[ -d ./cypress/reports/coverage ] || yarn shx mkdir cypress/reports/coverage
yarn shx cp cypress/reports/cy-coverage/coverage-final.json cypress/reports/coverage/cypress-coverage.json
yarn shx cp cypress/reports/jest-coverage/coverage-final.json cypress/reports/coverage/jest-coverage.json
yarn nyc merge cypress/reports/coverage  coverage/combined-coverage.json
