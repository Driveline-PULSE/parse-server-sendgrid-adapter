import SendGrid from 'sendgrid';

let SimpleSendGridAdapter = mailOptions => {
  if (!mailOptions || !mailOptions.apiKey || !mailOptions.fromAddress) {
    throw 'SimpleSendGridAdapter requires an API Key.';
  }
  let sendgrid = SendGrid(mailOptions.apiKey);

  let sendMail = ({to, subject, text}) => {
    return new Promise((resolve, reject) => {
      sendgrid.send({
        from: mailOptions.fromAddress,
        to: to,
        subject: subject,
        text: text,
      }, function(err, json) {
        if (err) {
           reject(err);
        }
        resolve(json);
      });
    });
  }

  var sendPasswordResetEmail = function sendPasswordResetEmail(options) {
    const user = options.user;
    const to = user.get("email") || user.get('username');
    const link = options.link;
    const appName = options.appName;
    const locale = options.locale;

    var subject = "Password Reset Request for " + appName;
    var text = "Hi,\n\nYou requested to reset your password for " + appName +". \n\nClick here to reset it: \n" + link;

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
      }, function(err, json) {
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
}

module.exports = SimpleSendGridAdapter
