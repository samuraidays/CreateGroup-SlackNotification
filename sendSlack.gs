// Slackのwebhookにリクエストを送る
function callSlackWebhook(applicant) {
  var sp = PropertiesService.getScriptProperties();
  var SLACK_WEBHOOK_URL = sp.getProperty('SLACK_WEBHOOK_URL');
  var suserid = getSlackUserId(applicant);
  suserid = '@' + suserid;
  
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      channel: suserid, // 通知するチャンネル
      text:'テストん',
      link_names: 1,
    })
  };
  var response = UrlFetchApp.fetch(SLACK_WEBHOOK_URL, params);
  Logger.log("response:", response);
  return response;
}

// 申請者のEメールからSlackユーザIDを取得する
function getSlackUserId(applicant) {
  // アクティブなシート取得
  var sp = PropertiesService.getScriptProperties();
  var SLACK_ACCESS_TOKEN = sp.getProperty('SLACK_ACCESS_TOKEN');
  
  var slackURLBase = "https://slack.com/api"
  var slackUserListAPI = slackURLBase + "/users.list?token=" + SLACK_ACCESS_TOKEN
  
  var res = UrlFetchApp.fetch(slackUserListAPI) // kanmu.esa.io に登録されているユーザの一覧を取得する API にアクセスする
  var data = JSON.parse(res);  // APIから得られたデータを連想配列に変換する
  
  //Logger.log(data.members)

  var userid;
  for (var i in data.members) {
    if(data.members[i].profile.email == applicant){
      userid = data.members[i].id;
    }
  }
  Logger.log(userid);
  return userid;
}
  
