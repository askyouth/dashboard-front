'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class InfographicsWallController {
  constructor($element, $timeout) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this._$timeout = $timeout;
    this.title = config.title;
  }

  $onInit() {
    this.onModalCloseBind = this.onModalClose.bind(this);
    this.onShowLinkBind = this.onShowLink.bind(this);
    this.onZoomInBind = this.onZoomIn.bind(this);
    this.onZoomOutBind = this.onZoomOut.bind(this);
    this.onInfoToggleBind = this.onInfoToggle.bind(this);

    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).on('hide.bs.modal', this.onModalCloseBind)

    let $showLinkButton = this._$element.find(config.selectors.ACTION_LINK);
    let $zoomInButton = this._$element.find(config.selectors.ACTION_ZOOM_IN);
    let $zoomOutButton = this._$element.find(config.selectors.ACTION_ZOOM_OUT);
    let $toggleInfoButton = this._$element.find(config.selectors.ACTION_INFO);

    $showLinkButton.on('click', this.onShowLinkBind);
    $zoomInButton.on('click', this.onZoomInBind);
    $zoomOutButton.on('click', this.onZoomOutBind);
    $toggleInfoButton.on('click', this.onInfoToggleBind);
  }

  $onDestroy() {
    $(this._element).find(config.selectors.WALL).masonry('destroy');

    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).off('hide.bs.modal', this.onModalCloseBind)

    let $showLinkButton = this._$element.find(config.selectors.ACTION_LINK);
    let $zoomInButton = this._$element.find(config.selectors.ACTION_ZOOM_IN);
    let $zoomOutButton = this._$element.find(config.selectors.ACTION_ZOOM_OUT);
    let $toggleInfoButton = this._$element.find(config.selectors.ACTION_INFO);

    $showLinkButton.off('click', this.onShowLinkBind);
    $zoomInButton.off('click', this.onZoomInBind);
    $zoomOutButton.off('click', this.onZoomOutBind);
    $toggleInfoButton.off('click', this.onInfoToggleBind);
  }

  $postLink() {
    this._$timeout(() => {
      $(this._element).find(config.selectors.WALL).masonry({
        itemSelector: '.infographics__item',
        isAnimated: true,
        columnWidth: 290
      });
    });
  }

  selectInfographic(image) {
    this.selectedInfographic = image;
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).modal('show');
  }

  deleteInfographics() {
    if (!this.selectedInfographic) return;

    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).modal('hide');
    this.selectedInfographic = null;
  }

  onModalClose() {
    this.onZoomOut();
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).removeClass(config.cssClasses.IS_INFO);
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).removeClass(config.cssClasses.SHOW_LINK);
  }

  onShowLink() {
    this._$element.find(config.selectors.INFOGRAPHICS_MODAL).toggleClass(config.cssClasses.SHOW_LINK);

    if (this._$element.find(config.selectors.INFOGRAPHICS_MODAL).hasClass(config.cssClasses.SHOW_LINK)) {
      this._$element.find(config.selectors.LINK_INPUT).focus().select();
    }
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
    <div class="infographics__wall">
      <div class="infographics__item" ng-repeat="image in $ctrl.images" ng-click="$ctrl.selectInfographic(image)">
        <img class="infographics__image" ng-src="{{image}}">
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
                <button class="btn infographics-modal__action infographics-modal__action--share"><i class="glyphicon glyphicon-share"></i></button>
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
            <div class="infographics-modal__link">
              <input class="infographics-modal__link-input form-control" value="{{$ctrl.selectedInfographic}}" readonly>
            </div>
            <img class="infographics-modal__image" ng-src="{{::$ctrl.selectedInfographic}}">
          </div>

          <div class="infographics-modal__sidebar">
          </div>
        </div>
      </div>
    </div>
  `,
  controller: InfographicsWallController,
  bindings: {
    images: '='
  }
};
