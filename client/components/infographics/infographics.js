'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class InfographicsController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
    this.title = config.title;
  }

  $onInit() {
    this.months = require('./data.json');
    this.images = [
      "https://image.freepik.com/free-vector/business-steps-infographic_23-2147509150.jpg",
      "https://image.freepik.com/free-vector/infographic-elements-pack_23-2147507384.jpg",
      "http://cdn.mos.cms.futurecdn.net/dd2c52bcd9b3915a6a0c24962d1c15a4.jpg",
      "http://i.imgur.com/O5NQfah.png",
      "https://image.freepik.com/free-vector/successful-business-infographic_23-2147508556.jpg",
      "http://media02.hongkiat.com/infographic-design-kit/yearly-infographic-elements.jpg",
      "https://image.freepik.com/free-vector/health-care-infographic-template_23-2147514016.jpg",
      "http://www.cdc.gov/socialmedia/tools/infographic/invest-in-your-community_970px.jpg",
      "http://cdn.mos.cms.futurecdn.net/2579b9d3c9a768d9a13e2235c8c8064c.jpg",
      "http://www.cdc.gov/diabetes/pubs/images/diabetes-infographic.jpg",
      "https://s-media-cache-ak0.pinimg.com/originals/bc/20/ab/bc20ab8f2779b00a720f30240fff67f3.jpg"
    ];
  }

  $onDestroy() {

  }
};


module.exports = {
  templateUrl: 'views/infographics/infographics.html',
  controller: InfographicsController
};
