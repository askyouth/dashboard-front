module.exports = function PageService($document) {
  'ngInject';
  this.title = null;
  
  this.setTitle = (title) => {
    this.title = title;
    $document[0].title = `${title} • Ask Youth`;
  }

  this.updateTweetCount = (count) => {
    if (count > 0) {
      $document[0].title = `(${count}) ${this.title} • Ask Youth`;
    } else {
      $document[0].title = `${this.title} • Ask Youth`;
    }
  };
};
