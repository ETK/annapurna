(function() {
    angular.module('starter').controller('SigninCtrl', SigninCtrl);

    SigninCtrl.$inject = ['starterConfig', 'utilService', '$state', '$scope',
      'signinService', 'lsService', '$stateParams', 'hwBackBtnService',
      '$rootScope', '$auth', '$ionicHistory'
    ];

    function SigninCtrl(sConfig, utilService, $state, $scope, signinService,
      lsService, $stateParams, hwBackBtnService, $rootScope, $auth,
      $ionicHistory) {
      // Variables section
      var logger = utilService.getLogger();
      logger.debug("SigninCtrl start");

      var signinCtrl = this;
      var functionNm = $stateParams.functionNm;

      // Functions section
      signinCtrl.signin = signin;
      //var deploy = new Ionic.Deploy();
      var setView = setView;
      var bootstrap = bootstrap;

      function signin() {
        try {
          logger.debug("signin function");

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go("menu.posts");
    } catch (exception) {
      logger.error("exception: " + exception);
    }
  }

  /**/
  function setView() {
    try {
      logger.debug("setView() function");

      if (!utilService.isAppOnlineService()) {
        utilService.toastMessage(sConfig.msgs.noConnMsg);
        return;
      }

      $rootScope.$broadcast("setBanner");

      if (!lsService.get("satellizer_token"))
        return;

      var promise = signinService.getFlags();
      promise.then(function(sucResp) {
        try {
          var resp = sucResp.data;

          if (resp.status !== sConfig.httpStatus.SUCCESS) {
            utilService.toastMessage(resp.messages);
            return;
          }

          if (resp.data.isDP !== true) {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });

            $state.go(sConfig.appStates.dp);
            return;
          }

          $state.go(sConfig.appStates.menu_profiles);
        } catch (exception) {
          logger.error("exception: " + exception);
        }
      }, function(errResp) {});
    } catch (exception) {
      logger.error("exception: " + exception);
    }
  }

  /* Executes function according function name */
  function bootstrap() {
    logger.debug("bootstrap() start");

    switch (functionNm) {
      case "setView":
        setView();
        break;
      default:
        setView();
    }
  }

  bootstrap(); logger.debug("SigninCtrl end");
}
})();
