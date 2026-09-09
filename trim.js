const sharp = require('sharp');

sharp('public/logo_header.png')
  .trim()
  .toFile('src/app/icon.png')
  .then(info => {
    console.log('Trimmed icon generated:', info);
  })
  .catch(err => {
    console.error('Error trimming image:', err);
  });
