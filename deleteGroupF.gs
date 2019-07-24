//Group削除
function deleteGroup(groupID) {
  try {
    var group = AdminDirectory.Groups.remove(groupID);
    Logger.log(group);
    return 'ok';
  } catch(e) {
    // エラーメッセージを返す
    var error = groupID + 'グループ作成に失敗しました。このメッセージを#corp_itに投げてください' + '\n' + 'name：'　+ e.name + '\n' + 'message：'　+ e.message
    return error;
  }
}