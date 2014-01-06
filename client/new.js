Meteor.Router.add({
  '/': 'home',
  '/rooms/:id': function(id) {
    Session.set('currentRoomId', id);
    return 'room'
  }
});

Template.rooms.helpers({
  rooms: function() { return Rooms.find(); }
});
 
Template.room.helpers({
  room: function(){ return Rooms.findOne(Session.get('currentRoomId'));}
});

Template.room.hint=function(){return Meteor.user()?"Place Ur Message":"Please Login to Keep";};

Meteor.startup(function(){
  //按下create按鈕的動作
  $('#submitbtn').click(function(){
    console.log("PressBtn");
    rmname=$('#inputname').val();
    if(rmname){
      Rooms.insert({name: rmname, count: 0, last_activity: 'Less than 1 minute'});
      $('#inputname').val("");
    }
  });
  
  //按下送出message按鈕的動作
  Template.room.rendered=function(){
        $('#msgbtn').click(function(){
      msgbdy=$('#msgbdy').val();
      if(msgbdy && Meteor.userId()){
        username=Meteor.user().emails[0].address.split('@')[0];
        Rooms.update(Session.get('currentRoomId'),{$push:{messages:{
          author: username,
          text: msgbdy        
        }}});
        Rooms.update(Session.get('currentRoomId'),{$inc:{count:1}});
        $('#msgbdy').val("");
      };
    });
  };
});


