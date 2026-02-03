// NOT USED

function readJsonBody(request, limitBytes = 1000000) {
  return new Promise((resolve, reject) => {
    let data = '';
    let bytes = 0;

    request.on('data', (chunk) => {
      bytes += chunk.length;
      if (bytes > limitBytes) {
        reject(new Error('Request body is too large'));
        request.destroy();
        return;
      }
      data += chunk.toString('utf8');
    });

    request.on('end', () => {
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    request.on('error', reject);
  });
}

module.exports = { readJsonBody };