Rooms = new Meteor.Collection('rooms');
 
//console.log("Start insert");

if (Meteor.isServer && Rooms.find().count() == 0) {
  var rooms = [
    {name: 'Meteor Talk', members: 3, last_activity: '1 minute ago',
      messages: [
        {author: 'Tom', text: 'Hi there Sacha!'},
        {author: 'Sacha', text: 'Hey Tom, how are you?'},
        {author: 'Tom', text: 'Good thanks!'},
      ]},
    {name: 'Meteor Development', members: 2, last_activity: '5 minutes ago'},
    {name: 'Meteor Core', members: 0, last_activity: '3 days ago'}
  ];
     for(var i=0;i<rooms.length;i++){
     Rooms.insert(rooms[i]);
    }
   
}  
