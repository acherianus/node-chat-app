const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach( () => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: 2,
      name: 'Jen',
      room: 'Angular Course'
    },
    {
      id: 3,
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new users', () => {
    var users = new Users();
    var user = {
      id:123,
      name:'Alex',
      room:'Chat Room'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = 2;
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    //expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = 99;
    var user = users.removeUser(userId);

    //expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should get a user', () => {
    var userId = 2;
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not get a user', () => {
    var userId = 99;
    var user = users.getUser(userId);

    //expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    var usersList = users.getUserList('Node Course');
    expect(usersList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for Angular course', () => {
    var usersList = users.getUserList('Angular Course');
    expect(usersList).toEqual(['Jen']);
  });
});
