const {
  User,
  Favorite,
  Neighborhood,
  Vcs,
} = require('./index.js');


// finds a user - if you want to do that sort of thing
const findUser = (userInfo) => {
  console.log('------------------ inside dbHelpers findUser');
  console.log('findUser, user sought: ', userInfo);
  // searches by email since that is the unique identifier
  return User.findOne({
    where: {
      email: userInfo.email,
    },
  })
    .then((user) => {
      console.log('userFound', user);
      if (user.password === userInfo.password) {
        return 'User Found';
      }
      return 'Password Incorrect';
    })
    .catch((error) => {
      console.warn(error);
    });
};

// TODO:function to create a new user
// needs to be built out and tested
const createUser = (user) => {
  // bcrypt hashing password here
  console.log('create user fired userInfo:', user);
  User.findOrCreate({
    where: {
      username: user.username,
      email: user.email,
      password: user.password,
      favorites: user.favorites,
    },
  })
    .spread((user, created) => {
      console.log(user.get({
        plain: true,
      }));
      console.log(created);
      if (created === false) {
        return 'User already exists';
      }
      return 'User created';
      /*
    findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:

    [ {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      },
      true ]

  In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
    */
    });
};

// TODO: build out- adds an association to a particular place to a user
const addToUserFavorites = ((user, favorite) => {
  // not tested yet
  console.log(`add to favorites, username: ${user.username} ${user}`);
  // again untested and probably broken
  // way 2
  return Favorite.create({
    // name: favorite.name,
    lat: favorite.latitude,
    long: favorite.longitude,
    wide: favorite.wide,
    narrow: favorite.narrow,
    user: user.email,
  }).then(() => { console.log('favorite created'); });
});

const findUserFavorites = ((user) => {
  console.log(`finding user favorite for: ${user}`);
  return Favorite.findAll({
    where: {
      user: user.email,
    },
  });
});

// Creates a database entry for a given neighborhood
const createNeighborhood = ((neighborHoodInfo) => {
  console.log('createNeighborHood fired');
  return Neighborhood.findOrCreate({
    name: neighborHoodInfo.name,
    lat: neighborHoodInfo.lat,
    long: neighborHoodInfo.long,
    wide: neighborHoodInfo.fullPage,
    narrow: neighborHoodInfo.narrow,
  });
});

// creates a database entry for the  vieux carre
// TODO: build out the function
const createVcs = ((vcsInfo) => {
  console.log('createVcs fired');
  return Vcs.findOrCreate({
    where: {
      lotNumber: vcsInfo.lotNumber,
      name: vcsInfo.name,
      lat: vcsInfo.name,
      long: vcsInfo.long,
      address: vcsInfo.address,
      infoText: vcsInfo.text,
      ownership: vcsInfo.ownership,
    },
    // load up vcs model here
  });
});


// TODO: build out this query after building the addToFavorites function
// queries the database to find a given users favorites list
// findUserFavorites

module.exports = {
  createUser,
  findUser,
  addToUserFavorites,
  createNeighborhood,
  createVcs,
  findUserFavorites,
};
