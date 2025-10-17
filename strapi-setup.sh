#!/bin/bash

# Create Strapi project with PostgreSQL
echo "Creating Strapi CMS project..."

cd "$(dirname "$0")"

# Create strapi project with typescript and postgresql
npx create-strapi-app@latest strapi-cms \
  --no-run \
  --skip-cloud \
  --typescript \
  --dbclient=postgres \
  --dbhost=db.xmawmworhpksnusoyfaq.supabase.co \
  --dbport=5432 \
  --dbname=postgres \
  --dbusername=postgres \
  --dbpassword=\${POSTGRES_PASSWORD} \
  --dbssl=true

echo "Strapi project created successfully!"
echo "Next steps:"
echo "1. Set your POSTGRES_PASSWORD environment variable"
echo "2. cd strapi-cms"
echo "3. npm run develop"