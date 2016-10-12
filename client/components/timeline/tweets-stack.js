class TweetsStack {
  constructor() {
    this._lastIndex = 0;
    this._stack = [];
  }


  exists(tweet) {
    let tweetExists = false;
    angular.forEach(this._stack, (existingTweet, index) => {
      if (existingTweet.id === tweet.id) {
        tweetExists = true;
      }
    });

    return tweetExists;
  }

  first() {
    if (this._stack.length > 0) {
      return this._stack[0];
    }
  }

  last() {
    if (this._stack.length > 0) {
      return this._stack[this._stack.length - 1];
    }
  }

  push(tweet) {
    if (!this.exists(tweet)) {
      this._stack.push(tweet);
    }
  }

  remove(tweet) {
    angular.forEach(this._stack, (existingTweet, index) => {
      if (existingTweet.id === tweet.id) {
        this._stack.splice(index, 1);
      }
    });

    if (angular.isEmptyObject(this._stack)) {
      this._lastIndex = 0;
    }
  }
}

module.exports = TweetsStack;