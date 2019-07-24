//Groupの詳細設定
function updateGroupSettings(groupEmail) {
  try {
    var group = AdminGroupsSettings.Groups.get(groupEmail);
    
    group.whoCanPostMessage = "ANYONE_CAN_POST"; //投稿を公開 外部
    group.messageModerationLevel = "MODERATE_NONE"; // 
    group.whoCanViewGroup = "ALL_IN_DOMAIN_CAN_VIEW"; //トピックを表示 ドメイン全体
    
    AdminGroupsSettings.Groups.patch(group, groupEmail);

    return 'ok';
  } catch(e) {
    var error = 'グループ詳細設定に失敗しました。このメッセージを#corp_itに投げてください' + '\n' + 'name：'　+ e.name + '\n' + 'message：'　+ e.message
    return error;
  }
}