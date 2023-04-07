'use strict';

var _sendgrid = require('sendgrid');

var _sendgrid2 = _interopRequireDefault(_sendgrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleSendGridAdapter = function SimpleSendGridAdapter(mailOptions) {
  if (!mailOptions || !mailOptions.apiKey || !mailOptions.fromAddress) {
    throw 'SimpleSendGridAdapter requires an API Key.';
  }
  var sendgrid = (0, _sendgrid2.default)(mailOptions.apiKey);

  var sendMail = function sendMail(_ref) {
    var to = _ref.to,
        subject = _ref.subject,
        text = _ref.text;

    return new Promise(function (resolve, reject) {
      sendgrid.send({
        from: mailOptions.fromAddress,
        to: to,
        subject: subject,
        text: text
      }, function (err, json) {
        if (err) {
          reject(err);
        }
        resolve(json);
      });
    });
  };

  var sendPasswordResetEmail = function sendPasswordResetEmail(options) {
    var user = options.user;
    var to = user.get("email") || user.get('username');
    var link = options.link;
    var appName = options.appName;
    var locale = options.locale;

    var subject = "Password Reset Request for " + appName;
    var text = "Hi,\n\nYou requested to reset your password for " + appName + ". \n\nClick here to reset it: \n" + link;

    if (locale.includes("ja")) {
      subject = "motusTHROWのパスワードリセット要求";
      text = "もしもし！\n\nmotusTHROWのパスワードを再設定するよう要求しました。 \n\nリセットするにはここをクリックしてください：\n" + link;
    }

    return new Promise(function (resolve, reject) {
      sendgrid.send({
        from: mailOptions.fromAddress,
        to: to,
        subject: subject,
        text: text
      }, function (err, json) {
        if (err) {
          reject(err);
        }
        resolve(json);
      });
    });
  };

  return Object.freeze({
    sendMail: sendMail,
    sendPasswordResetEmail: sendPasswordResetEmail
  });
};

module.exports = SimpleSendGridAdapter;