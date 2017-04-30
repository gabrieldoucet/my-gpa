const _ = require('lodash');

angular.module('myGPA')
  .factory('calc', [function () {

    const data = [
      {'band': 'H', gradePoints: 0},
      {'band': 'G2', gradePoints: 1},
      {'band': 'G1', gradePoints: 2},
      {'band': 'F3', gradePoints: 3},
      {'band': 'F2', gradePoints: 4},
      {'band': 'F1', gradePoints: 5},
      {'band': 'E3', gradePoints: 6},
      {'band': 'E2', gradePoints: 7},
      {'band': 'E1', gradePoints: 8},
      {'band': 'D3', gradePoints: 9},
      {'band': 'D2', gradePoints: 10},
      {'band': 'D1', gradePoints: 11},
      {'band': 'C3', gradePoints: 12},
      {'band': 'C2', gradePoints: 13},
      {'band': 'C1', gradePoints: 14},
      {'band': 'B3', gradePoints: 15},
      {'band': 'B2', gradePoints: 16},
      {'band': 'B1', gradePoints: 17},
      {'band': 'A5', gradePoints: 18},
      {'band': 'A4', gradePoints: 19},
      {'band': 'A3', gradePoints: 20},
      {'band': 'A2', gradePoints: 21},
      {'band': 'A1', gradePoints: 22}
    ];

    const getBand = function (gradePoints) {
      let band    = 'N/A';
      gradePoints = _.round(gradePoints, 0);
      _.forEach(data, function (bandObj) {
        if (_.isEqual(_.get(bandObj, 'gradePoints'), gradePoints)) {
          band = _.get(bandObj, 'band');
        }
      });
      return band;
    };

    const getGradePoints = function (band) {
      let points = 0;
      _.forEach(data, function (bandObj) {
        if (_.isEqual(_.get(bandObj, 'band'), band)) {
          points = _.get(bandObj, 'gradePoints');
        }
      });
      return points;
    };

    return {
      getBand: getBand,
      getGradePoints: getGradePoints
    };
  }]);