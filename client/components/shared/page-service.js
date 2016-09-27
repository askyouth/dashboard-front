module.exports = function PageService($document) {
  this.setTitle = (title) => {
    $document[0].title = title + ' • Ask Youth';
  }
};
