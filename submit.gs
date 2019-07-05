function submitForm(e) {
  var range = e.range; //=> Rangeオブジェクトで取得
  var array = e.values;
  Logger.log(array); //=> ['2015/05/04 15:00', 'Jane', 'Doe']
  var json = e.namedValues;
//  Logger.log(json); //=> { 'Timestamp': ['2015/05/04 15:00'], 'First Name': ['Jane'], 'Last Name': ['Doe'] }
  
  var applicant=array[2];
  var groupID=array[3];
  var desc=array[4];
  //var name=
  
  resCreateGroup = createGroup(groupID, desc);
  updateGroupSettings(groupID)
  callSlackWebhook(applicant);
}

//Group作成
function createGroup(groupID, desc) {
  var res = AdminDirectory.Groups.insert({email: groupID, description: desc});
  Logger.log(res);
  return res.id;
}

//Groupの詳細設定
function updateGroupSettings(groupEmail) {
  var group = AdminGroupsSettings.Groups.get(groupEmail);
  
  group.whoCanPostMessage = "ANYONE_CAN_POST";
  group.messageModerationLevel = "MODERATE_NONE";
  group.whoCanViewGroup = "ALL_IN_DOMAIN_CAN_VIEW";
  
  AdminGroupsSettings.Groups.patch(group, groupEmail);
  Logger.log(group)
}