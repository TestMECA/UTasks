!/bin/sh
#This is a gpg decryption script that we can use in CI tools to decrypt the updated encrypted env files and place it in the right location

gpg --quiet --batch --yes --passphrase="$DECRYPT_SECRETS_PASSPHRASE" --output ./cypress.env.json   --decrypt ./.github/scripts/secrets/cypress.env.json.gpg
gpg --quiet --batch --yes --passphrase="$DECRYPT_SECRETS_PASSPHRASE" --output ./.env   --decrypt ./.github/scripts/secrets/env.gpg