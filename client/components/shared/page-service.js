module.exports = function PageService($document) {
  'ngInject';
  
  this.setTitle = (title) => {
    $document[0].title = title + ' • Ask Youth';
  }
};
