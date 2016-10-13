const user = {
  handle: {
    camp: {id: 2, name: "Youth"},
    camp_id: 2,
    created_at: "2016-10-12T12:31:51.338Z",
    id: 38,
    klout_id: "228276222572400983",
    klout_score: null,
    name: "Jane Doe",
    profile: {
      description: "I think therefore I am",
      image: "https://pbs.twimg.com/profile_images/378800000712065659/2ae7e12957dfdb54f3ff75d117bfe602_normal.jpeg"
    },
    topics: [],
    uid: "1746146112",
    updated_at: "2016-10-12T12:31:51.338Z",
    username: "JaneDoeUXP"
  }
};

class AuthService {
  constructor() {
    'ngInject';
  }

  getUser() {
    return user;
  }

}

module.exports = AuthService;