if (process.env.NODE_ENV === 'production') {
    // Serve any static files
     'sails-copy/app/client/build';
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }