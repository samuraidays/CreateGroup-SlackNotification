function deleteGroupFlow(formdata) {
  
  var applicant=formdata[1]; // 申請者
  var groupID=formdata[8]; // 削除グループアドレス

  // Group削除
  var errtx = deleteGroup(groupID);
  // エラーをSlackへ通知
  if(errtx == 'ok'){
    tx = groupID + 'グループが削除されました！';
    callSlackWebhook(applicant, tx);
    return;
  } else {
    tx = errtx;
    callSlackWebhook(applicant, tx);
    return;
  }
}

//Group削除
function deleteGroup(groupID) {
  try {
    var group = AdminDirectory.Groups.remove(groupID);
    Logger.log(group);
    return 'ok';
  } catch(e) {
    // エラーメッセージを返す
    var error = groupID + 'グループ削除に失敗しました。このメッセージを#corp_itに投げてください' + '\n' + 'name：'　+ e.name + '\n' + 'message：'　+ e.message
    return error;
  }
}
