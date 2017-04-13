var taskManagerModule = angular.module('taskManagerApp', ['ui.router', 'ngAnimate']);

taskManagerModule.config(function($stateProvider,  $urlRouterProvider) {

	$urlRouterProvider.otherwise("/tasks");

 	$stateProvider.state('tasklist', {
 	    url: '/tasks',
 	    component: 'tasks',
 	    resolve: {
 	      tasks: function(TaskService) {
 	        return TaskService.list();
 	      }
 	    }
 	  });
 	    
 	$stateProvider.state('taskdetail', {
 	    url: '/tasks/detail/:taskId',
 	    component: 'taskDetail',
 	    resolve: {
 	      task: function($transition$, TaskService) {
 	        return TaskService.findById($transition$.params().taskId);
 	      }
 	    }
 	  });	

});
