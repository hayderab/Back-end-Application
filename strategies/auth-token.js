


passport.use('authtoken', new AuthTokenStrategy(
    function(token, done) {
      AccessToken.findOne({
        id: token
      }, function(error, accessToken) {
        if (error) {
          return done(error);
        }
  
        if (accessToken) {
          if (!token.isValid(accessToken)) {
            return done(null, false);
          }
  
          User.findOne({
            id: accessToken.userId
          }, function(error, user) {
            if (error) {
              return done(error);
            }
  
            if (!user) {
              return done(null, false);
            }
  
            return done(null, user);
          });
        } else {
          return done(null);
        }
      });
    }
  ));