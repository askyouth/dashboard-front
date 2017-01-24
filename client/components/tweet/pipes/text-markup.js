module.exports = function (content) {
  if (!content || angular.equals(content, {})) {
    return false;
  }

  var textContent = content.text || '';

  // Hashtags
  textContent = textContent.replace(/\S*#\S+/gi,
    function (hashtag) {
      let query = encodeURIComponent(hashtag);
      return `<a href="https://twitter.com/search?q=${query}" class="tweet__hashtag" target="_blank">${hashtag}</a>`;
    });

  // User mentions
  textContent = textContent.replace(/(^|[^@\w])@(\w{1,15})\b/g,
    function (handle) {
      handle = handle.trim();
      let twitterHandle = handle.substr(1);
      return `<a href="https://twitter.com/${twitterHandle}" class="tweet__handle" target="_blank">${handle}</a>`;
    });

  if (content.entities && content.entities.urls) {
    // Links
    angular.forEach(content.entities.urls, function (url) {
      textContent = textContent.replace(url.url, function () {
        return `<a href="${url.url}" class="tweet__link" target="_blank">${url.url}</a>`;
      });
    });
  }

  if (content.entities && content.entities.media && content.entities.media.length > 0) {
    angular.forEach(content.entities.media, function (media) {
      textContent = textContent.replace(media.url, function () {
        return `<a href="${media.url}" class="tweet__link" target="_blank">${media.url}</a>`;
      });
    });
  }



  content.text_content = textContent;
}
