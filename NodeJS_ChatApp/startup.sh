if [ ! -d /usr/src/app/node_modules ]; then
  echo "Install dependencies..."
  cd /usr/src/app && npm install --no-bin-links
fi
cd /usr/src/app && nodemon -L index.js
