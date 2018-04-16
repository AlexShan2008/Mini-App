/**
 * 微信登录，获取code和encryptData
 * 将获取到信息传给后台，进行兑换userInfo Data
 */
var getWxLoginResult = function (callback) {
  wx.login({
    success: function (loginResult) {
      wx.getUserInfo({
        success: function (userResult) {
          callback(null, {
            code: loginResult.code,
            encryptedData: userResult.encryptedData,
            iv: userResult.iv,
            userInfo: userResult.userInfo
          })
        },

        fail: function (userError) {
          var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '获取微信用户信息失败');
          error.detail = userError;
          callback(error, null);
        }
      })

    },

    fail: function (loginEror) {
      var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态')
    }
  })
}