const objectUtils = require('node-object-utils');

const handleScheme = {
  name: 'name',
  username: 'username',
  avatar: function (handle) {
    return 'https://avatars.io/twitter/' + handle.username;
  }
};

module.exports = function ContentInput($timeout, ApiService, HandleService) {
  'ngInject';

  return {
    restrict: "A",
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      HandleService.list({ pageSize: 2147483647 }, true).then(function (handles) {
        initializeEditor(element, transformHandles(handles));
      });

    }
  };

  function transformHandles(handles) {
    return handles.map(function (handle) {
      return objectUtils.transform(handle, handleScheme);
    });
  }
};

function initializeEditor(element, handles) {
  $(element).atwho({
    at: '@', data: handles,

    // insertTpl: '<span class="tweet__handle">${atwho-at}${username}</span>',
    insertTpl: '${atwho-at}${username}',
    displayTpl: [
      '<li class="handle" data-username="${username}">',
        '<span class="handle__avatar">',
          '<img src="${avatar}" alt="${name}" />',
        '</span>',
        '<span class="handle__name">${name}</span> ',
        '<span class="handle__username">@${username}</span>',
      '</li>'
    ].join(''),
    limit: 2147483647,
    displayTimeout: 0,
    highlightFirst: true,
    searchKey: 'username'
  });
}

/**
 * Tribute handle autocomplete
 */

// function initializeEditor(element, handles) {
//   const tributeInstance = new Tribute({
//     trigger: '@',
//
//     selectTemplate: function (item) {
//       return `<span class="tweet__handle">@${item.original.username}</span>`;
//       // return '@' + item.original.username;
//     },
//
//     menuItemTemplate: function (item) {
//       return `<div class="handle" data-username="${item.original.username}">
//         <span class="handle__avatar">
//           <img src="${item.original.avatar}" alt="${item.original.name}" />
//         </span>
//         <span class="handle__name">${item.original.name}</span>
//         <span class="handle__username">@${item.original.username}</span>
//       </div>`
//     },
//
//     lookup: function (handle) {
//       return handle.name + handle.username;
//     },
//
//     values: handles
//   });
//
//   // Attach Tribute instance to element
//   tributeInstance.attach(element[0]);
//   return tributeInstance;
// }
