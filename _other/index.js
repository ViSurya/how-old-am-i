const fs = require('fs');
const parseString = require('xml2js').parseString;
const request = require('request');
const { google } = require('googleapis');
const key = require('./api.json');

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

// Read and parse the XML file
fs.readFile('./sitemap_years.xml', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading sitemap XML file:', err);
    return;
  }

  // Parse XML data
  parseString(data, (err, result) => {
    if (err) {
      console.error('Error parsing sitemap XML:', err);
      return;
    }

    const urls = result.urlset.url.map(url => url.loc[0]);

    // Authorize Google API
    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.error('Error authorizing Google API:', err);
        return;
      }

      const items = urls.map(url => ({
        'Content-Type': 'application/http',
        'Content-ID': '',
        body:
          'POST /v3/urlNotifications:publish HTTP/1.1\n' +
          'Content-Type: application/json\n\n' +
          JSON.stringify({
            url: url,
            type: 'URL_UPDATED'
          })
      }));

      const options = {
        url: 'https://indexing.googleapis.com/batch',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/mixed'
        },
        auth: { bearer: tokens.access_token },
        multipart: items
      };

      // Send request to Google API
      request(options, (err, resp, body) => {
        if (err) {
          console.error('Error sending request to Google API:', err);
          return;
        }
        console.log(body);
      });
    });
  });
});
