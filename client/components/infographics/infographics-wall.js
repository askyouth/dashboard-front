'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class InfographicsWallController {
  constructor($scope, $element, $timeout, InfographicsService, Notifications) {
    'ngInject';
    this._$scope = $scope;
    this._element = $element[0];
    this._$element = $element;
    this._$timeout = $timeout;
    this._InfographicsService = InfographicsService;
    this._Notifications = Notifications;
    this.title = config.title;
  }

  $onInit() {
    this.onModalCloseBind = this.onModalClose.bind(this);
    this.onShowLinkBind = this.onShowLink.bind(this);
    this.onTweetInfographicsBind = this.onTweetInfographics.bind(this);
    this.onZoomInBind = this.onZoomIn.bind(this);
    this.onZoomOutBind = this.onZoomOut.bind(this);
    this.onInfoToggleBind = this.onInfoToggle.bind(this);

    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).on('hide.bs.modal', this.onModalCloseBind)

    let $showLinkButton = this._$element.find(config.selectors.ACTION_LINK);
    let $tweetButton = this._$element.find(config.selectors.ACTION_TWEET);
    let $zoomInButton = this._$element.find(config.selectors.ACTION_ZOOM_IN);
    let $zoomOutButton = this._$element.find(config.selectors.ACTION_ZOOM_OUT);
    let $toggleInfoButton = this._$element.find(config.selectors.ACTION_INFO);

    $showLinkButton.on('click', this.onShowLinkBind);
    $tweetButton.on('click', this.onTweetInfographicsBind);
    $zoomInButton.on('click', this.onZoomInBind);
    $zoomOutButton.on('click', this.onZoomOutBind);
    $toggleInfoButton.on('click', this.onInfoToggleBind);

    this.$selectedInfographicsWatch = this._$scope.$watch('$ctrl.selectedInfographic', (newVal, oldVal) => {
      if (newVal && !this.onTweetModalCloseBind) {
        this._$timeout(() => {
          this.onTweetModalCloseBind = this.onTweetModalClose.bind(this);
          let $tweetModalCloseButton = this._$element.find(config.selectors.TWEET_MODAL_CLOSE);
          $tweetModalCloseButton.on('click', this.onTweetModalCloseBind);
        });
      }
    });
  }

  $onDestroy() {
    $(this._element).find(config.selectors.WALL).masonry('destroy');

    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).off('hide.bs.modal', this.onModalCloseBind)

    let $showLinkButton = this._$element.find(config.selectors.ACTION_LINK);
    let $tweetButton = this._$element.find(config.selectors.ACTION_TWEET);
    let $zoomInButton = this._$element.find(config.selectors.ACTION_ZOOM_IN);
    let $zoomOutButton = this._$element.find(config.selectors.ACTION_ZOOM_OUT);
    let $toggleInfoButton = this._$element.find(config.selectors.ACTION_INFO);

    $showLinkButton.off('click', this.onShowLinkBind);
    $tweetButton.off('click', this.onTweetInfographicsBind);
    $zoomInButton.off('click', this.onZoomInBind);
    $zoomOutButton.off('click', this.onZoomOutBind);
    $toggleInfoButton.off('click', this.onInfoToggleBind);

    if (this.onTweetModalCloseBind) {
      let $tweetModalCloseButton = this._$element.find(config.selectors.TWEET_MODAL_CLOSE);
      $tweetModalCloseButton.off('click', this.onTweetModalCloseBind);
    }

    this.$selectedInfographicsWatch();
  }

  selectInfographic(image) {
    this.selectedInfographic = image;
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).modal('show');
  }

  deleteInfographics() {
    if (!this.selectedInfographic) return;

    return this._InfographicsService.remove(this.selectedInfographic).then(() => {
      this._$element.find(config.selectors.INFOGRAPHICS_MODAL).modal('hide');
      this.selectedInfographic = null;

      this._Notifications.success('Infographic deleted');
    }).catch(() => {
      this._Notifications.error('Infographics delete failed');
    });
  }

  onModalClose() {
    this.onZoomOut();
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).removeClass(config.cssClasses.IS_INFO);
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).removeClass(config.cssClasses.SHOW_LINK);
  }

  onTweetModalClose() {
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).removeClass(config.cssClasses.TWEET_INFOGRAPHICS);

    this._$timeout(() => {
      this._$element.find(config.selectors.TWEET_MODAL).hide();
    }, 300);
  }

  onShowLink() {
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).toggleClass(config.cssClasses.SHOW_LINK);

    if (this._$element.find(config.selectors.INFOGRAPHICS_MODAL).hasClass(config.cssClasses.SHOW_LINK)) {
      this._$element.find(config.selectors.LINK_INPUT).focus().select();
    }
  }

  onTweetInfographics() {
    this._$element.find(config.selectors.TWEET_MODAL).show();
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).toggleClass(config.cssClasses.TWEET_INFOGRAPHICS);
  }

  onZoomIn() {
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).addClass(config.cssClasses.IS_ZOOMED);
  }

  onZoomOut() {
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).removeClass(config.cssClasses.IS_ZOOMED);
  }

  onInfoToggle() {
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).toggleClass(config.cssClasses.IS_INFO);
  }
};


module.exports = {
  template: `
    <div class="infographics__wall" masonry column-width="290">
      <div class="infographics__item masonry-brick" ng-repeat="image in $ctrl.infographics" ng-click="$ctrl.selectInfographic(image)">
        <img class="infographics__image" ng-src="{{image.url}}">
      </div>
    </div>

    <div class="modal infographics-modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header infographics-modal__share-controls">
            <div class="modal-header__inner">
              <!-- <button type="button" class="close infographics-modal__close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="glyphicon glyphicon-menu-left"></span></button>-->

              <div class="infographics-modal__actions">
                <button class="btn infographics-modal__action infographics-modal__action--link"><i class="glyphicon glyphicon-link"></i></button>
                <button class="btn infographics-modal__action infographics-modal__action--tweet"><i class="icon icon--twitter-white"></i></button>
                <button class="btn infographics-modal__action infographics-modal__action--zoom-in"><i class="glyphicon glyphicon-zoom-in"></i></button>
                <button class="btn infographics-modal__action infographics-modal__action--zoom-out"><i class="glyphicon glyphicon-zoom-out"></i></button>
                <button class="btn infographics-modal__action infographics-modal__action--download"><i class="glyphicon glyphicon-download-alt"></i></button>
                <button class="btn infographics-modal__action infographics-modal__action--info"><i class="glyphicon glyphicon-info-sign"></i></button>
                <button class="btn infographics-modal__action infographics-modal__action--delete" ng-click="$ctrl.deleteInfographics()"><i class="glyphicon glyphicon-trash"></i></button>
              </div>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>

          <div class="modal-body">
            <img class="infographics-modal__image" ng-src="{{$ctrl.selectedInfographic.url}}">

            <div class="infographics-modal__link">
              <input class="infographics-modal__link-input form-control" value="{{$ctrl.selectedInfographic.url}}" readonly>
            </div>

            <div class="infographics-modal__tweet-modal" ng-if="$ctrl.selectedInfographic">
              <div class="infographics-modal__tweet-modal-header">
                <div class="infographics-modal__tweet-modal-title">Compose new Tweet with infographic</div>
                <button class="infographics-modal__tweet-modal-close"><span>×</span></button>
              </div>
              <compose-content infographics="$ctrl.selectedInfographic" on-create="$ctrl.onTweetModalClose()"></compose-content>
            </div>
          </div>

          <div class="infographics-modal__sidebar modal-sidebar infographics-details">
            <div class="infographics-details__header">Details</div>

            <table class="infographics-details__table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{{$ctrl.selectedInfographic.name}}</td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>3.14 MB</td>
                </tr>
                <tr>
                  <th>Resolution</th>
                  <td>1920 × 1080</td>
                </tr>
                <tr>
                  <th>Uploaded</th>
                  <td>12/01/2016</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  controller: InfographicsWallController,
  bindings: {
    infographics: '='
  }
};
