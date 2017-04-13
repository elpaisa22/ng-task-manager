angular.module('taskManagerApp')
.component('tasks', {
  bindings: { tasks: '=' },
  controller: function($http, TaskService) {
	  
	var ctrl = this;
	this.selection = [];

	// Archive Completed Tasks
	this.archiveTasks = function() {
		if (confirm("Would you like to archive completed tasks?")) {
			ctrl.selection.forEach(function(taskUri) {
		        if (taskUri != undefined) {
		            $http.patch(taskUri, { taskArchived: 1})
						 .then(function(data) {
			         		 TaskService.list()
			         		            .then( res => ctrl.tasks = res);
						  });
		        };
		    });

			ctrl.selection = [];
			console.log("Successfully Archived");
    		console.log("It's risky to run this without confirming all the patches are done. when.js is great for that");
		}
	    
	};
	
	// toggle selection for a given task by task id
	this.toggleSelection = function(taskUri) {
	    var idx = ctrl.selection.indexOf(taskUri);

	    // is currently selected
      // HTTP PATCH to ACTIVE state
	    if (idx > -1) {
	      $http.patch(taskUri, { taskStatus: 'ACTIVE' }).
		  then(function(data) {
		      console.log("Task unmarked");
		      TaskService.list()
		                 .then( res => ctrl.tasks = res);
		    });
	      ctrl.selection.splice(idx, 1);
	    }

	    // is newly selected
	    // HTTP PATCH to COMPLETED state
	    else {
	      $http.patch(taskUri, { taskStatus: 'COMPLETED' }).
		  then(function(data) {
			  console.log("Task marked completed");
			  TaskService.list()
			             .then( res => ctrl.tasks = res);
		    });
	      ctrl.selection.push(taskUri);
	    }
	  };

  },
  template: `
    <div class="panel panel-default" style="margin-top: 20px">	
		<div class="panel-heading">
			<i class="panel-title-icon fa fa-tasks"></i>
			<span class="panel-title">Recent Tasks</span>
			<div class="pull-right" style="margin-top: -5px;">
				<button class="btn btn-default" ui-sref="taskdetail({ taskId: null })">Add New Task</button>
				<button class="btn btn-default" ng-click="$ctrl.archiveTasks()">Clear completed tasks</button>
			</div>
		</div>
		<div class="panel-body">
		
			<table class="table table-condensed">
				<thead>
					<tr>
						<th style="width: 50px">Sel.</th>
						<th>Task</th>
						<th>Priority</th>
					</tr>
				</thead>
				<tbody>
		  			<tr ng-class="task.taskStatus=='COMPLETED' ? 'active' : ''" ng-repeat="task in $ctrl.tasks">
						<td>
		                    <input id="{{task._links.self.href}}" type="checkbox" value="{{task._links.self.href}}"
		                           ng-checked="$ctrl.selection.indexOf(task._links.self.href) > -1" 
		                           ng-click="$ctrl.toggleSelection(task._links.self.href)"
		                           style="margin-top:.8em"/>
		                </td>
						<td ng-if="task.taskStatus=='COMPLETED'">
							<del>
								<h5>
									<a ui-sref="taskdetail({ taskId: task.taskId })">
										{{task.taskName}}
										<span>{{task.taskStatus}}</span>
									</a>
								</h5>
							</del>
						</td>
						<td ng-if="task.taskStatus=='ACTIVE'">
	  						<h5>
								<a  ui-sref="taskdetail({ taskId: task.taskId })">
									{{task.taskName}}
									<span>{{task.taskStatus}}</span>
								</a>
							</h5>
						</td>
						<td>
							<h5>
								<span ng-if="task.taskPriority=='HIGH'" class="label label-danger">
									{{task.taskPriority}}
								</span>
								<span ng-if="task.taskPriority=='MEDIUM'" class="label label-warning">
									{{task.taskPriority}}
								</span>
								<span ng-if="task.taskPriority=='LOW'" class="label label-success">
									{{task.taskPriority}}
								</span>
							</h5>
						</td>
		  			</tr>
		  		</tbody>
	  		</table>

		</div>
	</div>
`,
})