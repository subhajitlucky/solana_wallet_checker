// This file is used to deploy the Vite build output to GitHub Pages
const ghpages = require('gh-pages');

ghpages.publish('dist', function(err) {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Deployed to GitHub Pages!');
  }
});
