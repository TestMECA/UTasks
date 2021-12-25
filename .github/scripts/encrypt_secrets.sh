!/bin/sh

#This is a gpg encryption script that we can use in local machine to encrypt the updated env files
echo "Please enter the passphrase for the gpg encryption"
read ENCRYPT_SECRETS_PASSPHRASE

gpg --quiet --batch --yes --passphrase="$ENCRYPT_SECRETS_PASSPHRASE" --output ./.github/scripts/secrets/cypress.env.json.gpg  --symmetric ./cypress.env.json
gpg --quiet --batch --yes --passphrase="$ENCRYPT_SECRETS_PASSPHRASE" --output ./.github/scripts/secrets/env.gpg  --symmetric ./.env
