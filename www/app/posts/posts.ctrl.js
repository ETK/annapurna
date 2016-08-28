(function() {
  angular.module('starter').controller('PostsCtrl', PostsCtrl);

  PostsCtrl.$inject = ['starterConfig', 'utilService', '$state',
    '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope',
    '$ionicModal', 'cameraService', '$stateParams',
    '$ionicHistory', 'hwBackBtnService', '$ionicActionSheet',
    '$ionicSideMenuDelegate', '$ionicTabsDelegate'
  ];

  function PostsCtrl(sConfig, utilService, $state, $ionicPopup, lsService,
    $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams,
    $ionicHistory, hwBackBtnService, $ionicActionSheet,
    $ionicSideMenuDelegate, $ionicTabsDelegate) {
    var logger = utilService.getLogger();
    logger.debug("PostsCtrl start");

    // Variables section
    var pc = this;
    pc.posts = [{
      name: "Test post 1",
      img: "img/ionic.png",
      postedAt: new Date(),
      desc: "Lorem Ipsum is simply dummy.",
      desc1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: 2,
      dislikes: 0,
      comments: 1
    }, {
      name: "Test post 2",
      img: "img/ionic.png",
      postedAt: new Date(),
      desc: "Lorem Ipsum is simply dummy.",
      desc1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: 22,
      dislikes: 2,
      comments: 10
    }, {
      name: "Test post 3",
      img: "img/ionic.png",
      postedAt: new Date(),
      desc: "Lorem Ipsum is simply dummy.",
      desc1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: 12,
      dislikes: 10,
      comments: 11
    }, {
      name: "Test post 4",
      img: "img/ionic.png",
      postedAt: new Date(),
      desc: "Lorem Ipsum is simply dummy.",
      desc1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: 2,
      dislikes: 0,
      comments: 1
    }, {
      name: "Test post 5",
      img: "img/ionic.png",
      postedAt: new Date(),
      desc: "Lorem Ipsum is simply dummy.",
      desc1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: 4,
      dislikes: 0,
      comments: 1
    }, {
      name: "Test post",
      img: "img/ionic.png",
      postedAt: new Date(),
      desc: "Lorem Ipsum is simply dummy.",
      desc1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      likes: 2,
      dislikes: 0,
      comments: 1
    }];
    // Function section
    var bootstrap = bootstrap;

    pc.showPostsFModal = showPostsFModal;
    pc.hidePostsFModal = hidePostsFModal;

    pc.showPostModal = showPostModal;
    pc.hidePostModal = hidePostModal;

    pc.viewPost = viewPost;
    pc.postsActionSheet = postsActionSheet;

    // Functions definations
    function postsActionSheet() {
      logger.debug("postsActionSheet function");

      var hidePostsActionSheet = $ionicActionSheet.show({
        titleText: "Posts",
        buttons: [{
          text: "<i class='txt-color icon ion-plus-circled'></i> New post"
        }, {
          text: "<i class='txt-color icon ion-search'></i> Search a post"
        }, {
          text: "<i class='txt-color icon ion-close-circled'></i> Cancel"
        }],
        /*cancelText: 'Cancel',*/
        cancel: function() {
          logger.debug("Cancelled");
        },
        buttonClicked: function(index) {
          logger.debug("Button clicked", index);

          switch (index) {
            case 0:
              $state.go("menu.newpost");
              break;
            case 1:
              pc.showPostsFModal();
              break;
            case 2:
              hidePostsActionSheet();
              break;
          }
          return true;
        }
      });
    }

    function viewPost(index) {
      pc.post = pc.posts[index];
      showPostModal();
    }

    $ionicModal.fromTemplateUrl('app/posts/posts-filter-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation
    }).then(function(modal) {
      pc.postsFModal = modal;
    });

    function showPostsFModal() {
      logger.debug("showPostsFModal function");
      pc.postsFModal.show();
    }

    function hidePostsFModal() {
      logger.debug("hidePostsFModal function");
      pc.postsFModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/posts/post-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation
    }).then(function(modal) {
      pc.postModal = modal;
    });

    function showPostModal() {
      logger.debug("showPostModal function");
      pc.postModal.show();
    }

    function hidePostModal() {
      logger.debug("hidePostModal function");
      pc.postModal.hide();
    }

    function bootstrap() {
      try {
        logger.debug("bootstrap function")

        switch ($stateParams.functionNm) {}
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("PostsCtrl end");
  }
})();
