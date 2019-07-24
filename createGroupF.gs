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