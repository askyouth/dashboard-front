module.exports = Pagination;

function Pagination($timeout, $state) {
  'ngInject';

  return {
    restrict: 'E',
    replace: false,

    template: `
      <div class="pagination-container" aria-label="Page navigation">
        <ul class="pagination" ng-if="totalItems >= pageSize">
          <li class="pagination__page" ng-click="previousPage($event)" ng-if="hasPrevious">
            <a href="#">Previous</a>
          </li>
          <li class="pagination__page" ng-repeat="page in pages" ng-click="changePage(page.page)" ng-class="{'active': page.active}">
            <a href="">{{page.page}}</a>
          </li>
          <li class="pagination__page" ng-click="nextPage($event)" ng-if="hasNext">
            <a href="#">Next</a>
          </li>
        </ul>
        <div class="pagination-controls">
          Show 
          <select ng-model="pageSize" ng-change="changePageSize(pageSize)"
            ng-options="item as item for item in countList track by item">
          </select> per page ({{totalItems}} / {{pageSize}})
        </div>
      </div>
    `,

    scope: {
      page: '=page',
      totalItems: '=total',
      pageSize: '=pageSize',
      onPageChange: '&onPageChange'
    },

    link: function (scope) {
      if (!scope.page) {
        scope.page = 1;
      }

      if (!scope.pageSize) {
        scope.pageSize = 10;
      }

      scope.page = parseInt(scope.page, 10);
      scope.pageSize = parseInt(scope.pageSize, 10);

      scope.countList = [10, 25, 50, 100];
      
      // scope.countList = [
      //   { count: 10 },
      //   { count: 25 },
      //   { count: 50 },
      //   { count: 100 }
      // ];

      scope.pages = calculatePages(scope);

      scope.previousPage = ($event) => {
        if ($event) {
          $event.preventDefault();
        }
        scope.page = scope.page - 1;
      };

      scope.changePage = (page, $event) => {
        if ($event) {
          $event.preventDefault();
        }
        page = parseInt(page, 10)
        if (scope.page === page) {
          return false;
        }
        scope.page = page;
      };

      scope.nextPage = ($event) => {
        if ($event) {
          $event.preventDefault();
        }
        scope.page = scope.page + 1;
      };

      scope.changePageSize = (pageSize) => {
        scope.pageSize = parseInt(pageSize, 10);

        // scope.page = 1;
        $state.go('.', { page: scope.page, pageSize: scope.pageSize }, {notify: false});
        scope.pages = calculatePages(scope);
      };

      var $pageWatcher = scope.$watch('page', () => {
        scope.pages = calculatePages(scope);
        scope.page = parseInt(scope.page, 10);
        scope.pageSize = parseInt(scope.pageSize, 10);
        $state.go('.', { page: scope.page, pageSize: scope.pageSize }, {notify: false});

        scope.onPageChange();
      });

      scope.$on('$destroy', () => {
        $pageWatcher();
      });
    }
  }
}

function calculatePages(scope) {
  var pageFrom = 1,
      pageTo = 5,
      maxPages = (scope.totalItems > scope.pageSize) ? Math.ceil(scope.totalItems / scope.pageSize) : 1;

  scope.hasPrevious = true;
  scope.hasNext = true;

  if (scope.page > maxPages) {
    scope.page = maxPages;
  } else if (scope.page < 1) {
    scope.page = 1;
  }

  if (scope.page >= pageTo) {
    if (maxPages - 2 <= scope.page) {
      pageFrom = maxPages - 4;
      pageTo = maxPages;
    } else {
      pageFrom = scope.page - 2;
      pageTo = scope.page + 2;
    }
  }

  if (pageFrom < 1) {
    pageFrom = 1;
  }

  if (pageTo > maxPages) {
    pageTo = maxPages;
  }

  if (scope.page === 1) {
    scope.hasPrevious = false;
  } 

  if (scope.page === maxPages) {
    scope.hasNext = false;
  }

  var pages = [];
  for (var i = pageFrom; i <= pageTo; i++) {
    var page = { page: i, active: false };
    if (i === scope.page) {
      page.active = true;
    }

    pages.push(page);
  }

  return pages;
}