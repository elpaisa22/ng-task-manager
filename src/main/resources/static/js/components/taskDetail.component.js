angular.module('taskManagerApp')
.component('taskDetail', {
  bindings: { task: '=' },
  controller : function($state, $http, TaskService) {

	  	var ctrl = this;

	  	this.task = this.task || {
	  		taskName: "",
            taskDescription: "",
            taskPriority: "",
            taskStatus: ""
	  	};

		this.statuses=['ACTIVE','COMPLETED'];
		this.priorities=['HIGH','LOW','MEDIUM'];
		
	
		//add a new task
		this.addTask = function addTask() {
			if(!ctrl.task || !ctrl.task.taskName || !ctrl.task.taskDescription || !ctrl.task.taskPriority || !ctrl.task.taskStatus){
				alert("Insufficient Data! Please provide values for task name, description, priortiy and status");
			}
			else{
			 $http.post('/tasks', ctrl.task).
			  then(function(result, status, headers) {
				 alert("Task saved");
	             var newTaskUri = result.data._links.self.href;
	             console.log("Might be good to GET " + newTaskUri + " and append the task.");
	             // Refetching EVERYTHING every time can get expensive over time
	             // Better solution would be to $http.get(headers()["location"]) and add it to the list
	             $state.go('tasklist');
			    });
			}
		};
		
  },
  template: `
    <div class="panel panel-default" style="margin-top: 20px">
		<div class="panel-heading">
			<i class="fa fa-plus"></i>
			<span class="panel-title">Add Task</span>
			<div class="pull-right" style="margin-top: -5px;">
				<button class="btn btn-default" ui-sref="tasklist">Show All Tasks</button>
			</div>
		</div>
		<div class="panel-body">
			<div class="form-horizontal">

				<div class="form-group">
					<label class="col-sm-2 control-label">Task Name:</label>
					<div class="col-sm-10">
						<input class="form-control" type="text" ng-model="$ctrl.task.taskName"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">Task Description:</label>
					<div class="col-sm-10">
						<input class="form-control" type="text" ng-model="$ctrl.task.taskDescription"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">Task Status:</label>
					<div class="col-sm-10">
						<select class="form-control" ng-model="$ctrl.task.taskStatus" ng-options="status as status for status in $ctrl.statuses">
							<option value="">-- Select --</option>						
					     	</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">Task Priority:</label>
					<div class="col-sm-10">
						<select class="form-control" ng-model="$ctrl.task.taskPriority" ng-options="priority as priority for priority in $ctrl.priorities">
							<option value="">-- Select --</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button class="btn btn-primary" ng-click="$ctrl.addTask()">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
							Save Task
						</button>
					</div>
				</div>
							
			</div>
		</div>
	</div>
`,
})