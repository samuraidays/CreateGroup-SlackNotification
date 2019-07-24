function onFormSubmit(e) {
  //var range = e.range; //=> Rangeオブジェクトで取得
  var array = e.values;
  // Logger.log(array); //=> ['2015/05/04 15:00', 'Jane', 'Doe']
  //  var json = e.namedValues;
  //  Logger.log(json); //=> { 'Timestamp': ['2015/05/04 15:00'], 'First Name': ['Jane'], 'Last Name': ['Doe'] }
  
  var applicant=array[1];
  var groupID=array[3];
  var desc=array[4];
  var memberemail=array[5];
  
  // Group作成
  var errtx = createGroup(groupID, desc);
  if(errtx !== 'ok'){
    callSlackWebhook(applicant, errtx);
    return ;
  }
  
  // Groupの詳細設定
  var errtx = updateGroupSettings(groupID);
  if(errtx !== 'ok'){
    callSlackWebhook(applicant, errtx);
    return;
  }
  
  // オーナーとしてメンバー追加
  var errtx = addOwnerMember(memberemail, groupID);
  if(errtx !== 'ok'){
    callSlackWebhook(applicant, errtx);
    return;
  }
  
  // Slackへの通知
  if(errtx == 'ok'){
    var tx = 'グループが作成されました！';
    callSlackWebhook(applicant, tx);
    return;
  } else {
    var tx = 'グループの作成に失敗しました！';
    callSlackWebhook(applicant, tx);
    return;
  }
}