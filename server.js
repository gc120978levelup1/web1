const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "", "/build");
const port = process.env.PORT || 80;

function isSecure(req) {
    if (req.headers['x-forwarded-proto']) {
      return req.headers['x-forwarded-proto'] === 'https';
    }
    return req.secure;
  };

app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test' && !isSecure(req)) {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath,"index.html"));
});

app.listen(port, () =>{
   console.log("Server is up!");
});