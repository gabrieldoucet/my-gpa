/**
 * Created by Gabriel on 05/04/2017.
 */

const _ = require('lodash');

angular.module('myGPA')
  .controller('mainController', ['$scope', 'calc', 'dataService', function ($scope, calc, dataService) {

    $scope.selects = {};
    $scope.inputs  = {
      component: {}
    };
    $scope.calc    = {
      gpa: 0
    };

    dataService.get('modules').then(function (res) {
      console.log(res);
      $scope.modules                     = res.data;
      $scope.calc.creditE                = _.filter($scope.modules, function (module) {
        return _.get(module, 'gpa') <= 8;
      });
      $scope.selects.showAddComponent    = false;
      $scope.selects.showModifyComponent = false;
    });

    $scope.selectModule = function (module) {
      $scope.selects.module              = module;
      $scope.selects.showAddComponent    = false;
      $scope.selects.showModifyComponent = false;
    };

    // Watches changes for the GPA inside a component of a module
    $scope.$watch('inputs.component.gpa', function (newVal) {
      let gpa                      = _.round(newVal, 0);
      $scope.inputs.component.band = calc.getBand(gpa);
    }, true);

    // Watches changes for the GPA inside a component of a module
    $scope.$watch('inputs.modifyComponent.gpa', function (newGpa) {
      if (!_.isNil(newGpa)) {
        newGpa                             = _.round(newGpa, 0);
        $scope.inputs.modifyComponent.band = calc.getBand(newGpa);
      }
    }, true);

    // Watches changes for the components inside the selected module
    $scope.$watch('selects.module.components', function (newComponents) {
      if (!_.isNil(newComponents)) {

        // Computes the GPA for the newly updated module;
        let gpa = 0;
        _.forEach(newComponents, function (component) {
          gpa += _.get(component, 'gpa') * _.get(component, 'weight');
        });
        gpa                        = _.round(gpa, 0);
        $scope.selects.module.gpa  = gpa; // Updates the module gpa
        $scope.selects.module.band = calc.getBand(gpa); // Updates the module band
      }
    }, true);

    // Watches changes for the components inside the selected module
    $scope.$watch('selects.module.components.marks', function (newComponents) {
      if (!_.isNil(newComponents)) {
        // Computes the GPA for the newly updated module;
        let gpa = 0;
        _.forEach(newComponents, function (component) {
          gpa += _.get(component, 'gpa') * _.get(component, 'weight');
        });
        gpa                        = _.round(gpa, 0);
        $scope.selects.module.gpa  = gpa; // Updates the module gpa
        $scope.selects.module.band = calc.getBand(gpa); // Updates the module band
      }
    }, true);

    // Computes the overall GPA
    $scope.$watch('modules', function (newModules) {
      if (!_.isNil(newModules)) {
        let gpa = 0;
        _.forEach(newModules, function (module) {
          gpa += _.get(module, 'gpa') * _.get(module, 'weight');
        });
        gpa              = _.round(gpa / 12, 1);
        $scope.calc.gpa  = gpa; // Updates the overall GPA
        $scope.calc.band = calc.getBand(gpa); // Update the overall band
      }
    }, true);

    // Callback to add a component inside a module
    $scope.doneAdd = function () {
      let component = _.cloneDeep($scope.inputs.component);
      $scope.selects.module.components.push(component);
      $scope.inputs.component         = {};
      $scope.selects.showAddComponent = false;
    };

    // Callback called after a modifying a component
    $scope.doneModify = function () {
      $scope.inputs.component            = {};
      $scope.selects.showModifyComponent = false;
    };

    // Show the add form to add a component in a module
    $scope.showAddComponentForm = function () {
      $scope.selects.showAddComponent = true;
    };

    // Callback to modify a component
    $scope.showModifyComponentForm = function (component) {
      $scope.inputs.modifyComponent      = component;
      $scope.selects.showModifyComponent = true;
    };

    // Callback to save the data
    $scope.saveChanges = function () {
      console.log('saving data');
      dataService.post($scope.modules).then(function (res) {
        console.log(res);
      });
    };
  }]);