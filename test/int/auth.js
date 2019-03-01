/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import convertFile from 'convert/file'

test('noauth', t => {
  const result = convertFile('test/material/2/noauth.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";

export let options = { maxRedirects: 4 };

export default function() {
  let res;

  res = http.get("http://example.com");
}
`)
})

test('basic', t => {
  const result = convertFile('test/material/2/basic.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";

export let options = { maxRedirects: 4 };

export default function() {
  let res;

  res = http.get("http://user123:secret@example.com", {
    auth: "basic"
  });
}
`)
})

test('bearer', t => {
  const result = convertFile('test/material/2/bearer.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";

export let options = { maxRedirects: 4 };

export default function() {
  let res;

  res = http.get("http://example.com", {
    headers: {
      Authorization: "Bearer secrettoken"
    }
  });
}
`)
})

test('digest', t => {
  const result = convertFile('test/material/2/digest.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";

export let options = { maxRedirects: 4 };

export default function() {
  let res;

  res = http.get("http://user123:secret@example.com", {
    auth: "digest"
  });
}
`)
})

test('ntlm', t => {
  const result = convertFile('test/material/2/ntlm.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";

export let options = { maxRedirects: 4 };

export default function() {
  let res;

  res = http.get("http://user123:secret@example.com", {
    auth: "ntlm"
  });
}
`)
})

test('awsv4', t => {
  const result = convertFile('test/material/2/awsv4.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";
import URI from "./urijs.js";
import aws4 from "./aws4.js";

export let options = { maxRedirects: 4 };

export default function() {
  let res, address, options, credential, signed;

  address = new URI("http://example.com");
  options = {
    method: "get",
    protocol: address.protocol(),
    hostname: address.hostname(),
    port: address.port(),
    path: address.path() + address.search(),
    region: "region",
    service: "service"
  };
  credential = {
    accessKeyId: "accesskey",
    secretAccessKey: "secretkey",
    sessionToken: "session"
  };
  signed = aws4.sign(options, credential);
  res = http.get(${'`http://${signed.hostname}${signed.path}`'}, {
    headers: signed.headers
  });
}
`)
})

test('oauth1 header sha1', t => {
  const result = convertFile('test/material/2/oauth1-header-sha1.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

export default function() {
  let res, options, oauth, request, auth, token;

  options = {
    consumer: {
      key: "conkey",
      secret: "consec"
    },
    signature_method: "HMAC-SHA1",
    hash_function(data, key) {
      return hmac("sha1", key, data, "base64");
    },
    version: "1.0",
    realm: "realm@example.com"
  };
  request = {
    method: "GET",
    url: "http://example.com",
    data: {
      oauth_timestamp: "1",
      oauth_nonce: "10"
    }
  };
  token = {
    key: "tokkey",
    secret: "toksec"
  };
  oauth = OAuth(options);
  auth = oauth.toHeader(oauth.authorize(request, token));
  res = http.get("http://example.com", {
    headers: auth
  });
}
`)
})

test('oauth1 header sha256', t => {
  const result = convertFile('test/material/2/oauth1-header-sha256.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

export default function() {
  let res, options, oauth, request, auth, token;

  options = {
    consumer: {
      key: "conkey",
      secret: "consec"
    },
    signature_method: "HMAC-SHA256",
    hash_function(data, key) {
      return hmac("sha256", key, data, "base64");
    },
    version: "1.0",
    realm: "realm@example.com"
  };
  request = {
    method: "GET",
    url: "http://example.com",
    data: {
      oauth_timestamp: "1",
      oauth_nonce: "10"
    }
  };
  token = {
    key: "tokkey",
    secret: "toksec"
  };
  oauth = OAuth(options);
  auth = oauth.toHeader(oauth.authorize(request, token));
  res = http.get("http://example.com", {
    headers: auth
  });
}
`)
})

test('oauth1 header text', t => {
  const result = convertFile('test/material/2/oauth1-header-text.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

export default function() {
  let res, options, oauth, request, auth, token;

  options = {
    consumer: {
      key: "conkey",
      secret: "consec"
    },
    signature_method: "PLAINTEXT",
    version: "1.0",
    realm: "realm@example.com"
  };
  request = {
    method: "GET",
    url: "http://example.com",
    data: {
      oauth_timestamp: "1",
      oauth_nonce: "10"
    }
  };
  token = {
    key: "tokkey",
    secret: "toksec"
  };
  oauth = OAuth(options);
  auth = oauth.toHeader(oauth.authorize(request, token));
  res = http.get("http://example.com", {
    headers: auth
  });
}
`)
})

test('oauth1 body', t => {
  const result = convertFile('test/material/2/oauth1-body.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";
import OAuth from "./oauth-1.0a.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

export default function() {
  let res, options, oauth, request, auth, token;

  options = {
    consumer: {
      key: "conkey",
      secret: "consec"
    },
    signature_method: "HMAC-SHA1",
    hash_function(data, key) {
      return hmac("sha1", key, data, "base64");
    },
    version: "1.0",
    realm: "realm@example.com"
  };
  request = {
    method: "POST",
    url: "http://example.com",
    data: {
      oauth_timestamp: "1",
      oauth_nonce: "10"
    }
  };
  token = {
    key: "tokkey",
    secret: "toksec"
  };
  oauth = OAuth(options);
  auth = oauth.authorize(request, token);
  res = http.post("http://example.com", auth);
}
`)
})

test('oauth1 address', t => {
  const result = convertFile('test/material/2/oauth1-address.json')
  t.is(result, `// Auto-generated by the Load Impact converter

import http from "k6/http";
import OAuth from "./oauth-1.0a.js";
import URI from "./urijs.js";
import { hmac } from "k6/crypto";

export let options = { maxRedirects: 4 };

export default function() {
  let res, options, oauth, request, auth, token, address;

  options = {
    consumer: {
      key: "conkey",
      secret: "consec"
    },
    signature_method: "HMAC-SHA1",
    hash_function(data, key) {
      return hmac("sha1", key, data, "base64");
    },
    version: "1.0",
    realm: "realm@example.com"
  };
  request = {
    method: "GET",
    url: "http://example.com",
    data: {
      oauth_timestamp: "1",
      oauth_nonce: "10"
    }
  };
  token = {
    key: "tokkey",
    secret: "toksec"
  };
  oauth = OAuth(options);
  auth = oauth.authorize(request, token);
  address = new URI("http://example.com");
  for (const key of Object.keys(auth)) {
    address.addQuery(key, auth[key]);
  }
  res = http.get(address.toString(), "line1\\nline2\\nline3\\n");
}
`)
})
