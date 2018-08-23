const crypto = require('crypto');

// Create Login Session.
exports.createSession = (req, id) => {
  return new Promise((resolve, reject) => {
    req.session.id_hash = id;
    resolve();
  });
};

// Check Login Session.
exports.isValid = (req, res) => {
  return req.session.id_hash !== undefined
};

// Destroy Session
exports.destroy = (req, callback) => {
  req.session.destroy(() => {
    if (callback) callback();
  });
};


// Crypto
getEncryptPassword = (_password) => {
  return crypto.createHmac('sha256', keyConfig.PASSWORDKEY)
    .update(_password).digest('hex');
};

getEncryptSessionValue = (_value) => {
  const sessionCipher = crypto.createCipher('aes-256-ctr', keyConfig.SESSIONKEY);
  let crypted = sessionCipher.update(_value, 'utf8', 'hex');
  crypted += sessionCipher.final('hex');
  return crypted;
};

getDecryptSessionValue = (_encrypt) => {
  const sessionDecipher = crypto.createDecipher('aes-256-ctr', keyConfig.SESSIONKEY);
  let dec = sessionDecipher.update(_encrypt, 'hex', 'utf8');
  dec += sessionDecipher.final('utf8');
  return dec;
};

getHash = (_id) => {
  return crypto.createHmac('sha256', keyConfig.HASHIDKEY)
    .update(_id).digest('hex');
};
