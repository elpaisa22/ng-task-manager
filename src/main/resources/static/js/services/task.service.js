angular.module('taskManagerApp').service('TaskService', function($http) { 
  return {
    list: function() {
      return $http.get('/tasks/search/findByTaskArchived?archivedfalse=0')
                  .then(resp => resp.data._embedded.tasks)
    },

    findById: function(id) {
    	if (id) {
    		return $http.get('/tasks/' + id)
            .then(resp => resp.data);
    	} else {
    		return null;
    	}
        
      }
  };
});