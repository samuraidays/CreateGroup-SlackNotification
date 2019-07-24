function deleteGroupFlow(formdata) {
  
  var applicant=formdata[1]; // 申請者
  var groupID=formdata[3]; // 削除グループアドレス

  // Group削除
  var errtx = deleteGroup(groupID);
  // エラーをSlackへ通知
  if(errtx !== 'ok'){
    callSlackWebhook(applicant, errtx);
    return;
  }
}
