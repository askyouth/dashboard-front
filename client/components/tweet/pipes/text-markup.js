module.exports = function (content) {
  var textContent = content.text;

  // Hashtags
  textContent = textContent.replace(/(\B#[^ ]+)/g,
    '<a class="tweet__hashtag">$1</a>');

  // User mentions
  textContent = textContent.replace(/\B(@[^ ]+)/g,
    '<a href="#" class="tweet__handle">$1</a>');

  // Links
  angular.forEach(content.entities.urls, function (url) {
    textContent = textContent.replace(url.url, function () {
      return `<a href="${url.url}" class="tweet__link" target="_blank">${url.url}</a>`;
    });
  });

  if (content.entities.media.length > 0) {
    angular.forEach(content.entities.media, function (media) {
      textContent = textContent.replace(media.url, function () {
        return `<a href="${media.url}" class="tweet__link" target="_blank">${media.url}</a>`;
      });
    });
  }

  content.text_content = textContent;
}
