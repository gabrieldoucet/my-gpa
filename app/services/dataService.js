/**
 * Created by Gabriel on 30/04/2017.
 */

const _ = require('lodash');

angular.module('myGPA')
  .factory('dataService', ['$http', function ($http) {

    const get = function (collection) {
      return $http({method: 'GET', url: 'http://localhost:3000/data/' + collection})
        .then(function (res) {
          return res;
        });
    };

    const post = function (data) {
      return $http({method: 'POST', url: 'http://localhost:3000/data/modules', data: data})
        .then(function (res) {
          console.log(res);
        });
    };

    return {
      get: get,
      post: post
    };
  }]);