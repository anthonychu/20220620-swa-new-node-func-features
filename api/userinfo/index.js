module.exports = async function (context, req) {
  const userInfo = req.user;

  if (!userInfo) {
    return;
  }

  // access basic information
  const { id, username, identityProvider } = userInfo;
  context.log('id:', id);
  context.log('username:', username);
  context.log('identityProvider:', identityProvider);

  // access Static Web Apps roles
  const roles = userInfo.claimsPrincipalData.userRoles;
  context.log('isAuthenticated:', roles.indexOf('authenticated') >= 0);

  // return user info
  context.res.body = userInfo;
};
