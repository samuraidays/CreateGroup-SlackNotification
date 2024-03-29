function createGroupFlow(formdata) {

  var applicant=formdata[1]; // 申請者
  var groupID=formdata[3]; // グループアドレス
  var desc=formdata[4]; // 説明
  var memberemail=formdata[5]; // オーナー
  
  // Group作成
  var errtx = createGroup(groupID, desc);
  // エラーをSlackへ通知
  if(errtx !== 'ok'){
    callSlackWebhook(applicant, errtx);
    return;
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
    var tx = groupID + 'グループが作成されました！';
    callSlackWebhook(applicant, tx);
    return;
  } else {
    var tx = groupID + 'グループの作成に失敗しました！';
    callSlackWebhook(applicant, tx);
    return;
  }
}

//Group作成
function createGroup(groupID, desc) {
  try {
    var group = AdminDirectory.Groups.insert({email: groupID, description: desc});
    Logger.log(group);
    return 'ok';
  } catch(e) {
    // エラーメッセージを返す
    var error = groupID + 'グループ作成に失敗しました。このメッセージを#corp_itに投げてください' + '\n' + 'name：'　+ e.name + '\n' + 'message：'　+ e.message
    return error;
  }
}