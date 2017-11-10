angular.module('portalApp')
.controller('nextLectureCtrl', ['$scope', function ($scope) {
	
	// mock data
	$scope.items = [
		{
			title:'Item 1',
			tags: ['tag A', 'tag B', 'tag C'],
			details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		},
		{
			title:'Item 2',
			tags: ['tag D', 'tag E', 'tag F'],
			details: 'Mauris cursus, sapien et malesuada ultrices, purus sapien iaculis tellus, quis semper magna est at leo.'
		},
		{
			title:'Item 3',
			tags: ['tag A', 'tag H'],
			details: 'Donec id quam eu odio feugiat sagittis. Duis a tempus neque. Praesent elementum quis ante quis commodo. Sed tincidunt aliquet dolor sit amet laoreet. '
		},
		{
			title:'Item 4',
			tags: ['tag I'],
			details: 'Proin sem quam, rutrum id ante id, scelerisque tempor quam. Curabitur pharetra turpis at sem placerat, non vehicula ligula tincidunt.'
		},
		{
			title:'Item 5',
			tags: ['tag C', 'tag K', 'tag B'],
			details: 'Mauris nec ultricies metus. Cras et dictum justo. Nam a ullamcorper dolor. Cras fringilla metus vel facilisis vehicula.'
		},
		{
			title:'Item 6',
			tags: ['tag A', 'tag B', 'tag C'],
			details: 'Curabitur scelerisque lorem risus, in luctus orci hendrerit non. Praesent quis tellus dapibus dolor consectetur volutpat.'
		}
	];
	
	// Show main view in the first column as soon as controller loads
	$scope.portalHelpers.showView('nextLectureMain.html', 1);
	
	// This function gets called when user clicks an item in the list
	$scope.showDetails = function(item){
		// Make the item that user clicked available to the template
		$scope.detailsItem = item;		
		$scope.portalHelpers.showView('nextLectureDetails.html', 2);
	}
    
    var temp; 
    
    $scope.portalHelpers.getApiData('student/Courses2').then(function (courses) {
    	console.log("COURSES2 result", courses.data.courseEnrollmentData);
        $scope.portalHelpers.getApiData('student/CurrentTermCode').then(function (termCode) {
            console.log("CURRENT TERM CODE result", termCode.data);
            temp = courses.data.courseEnrollmentData.filter(function (course) {
                return course.termCode === termCode.data && course.courseComponent === "LEC";
            }).map(function (course) {
            	return {
                    	"sub": course.courseSubject,
                        "code": course.courseCatalogNumber
                		};
            });
            console.log("TEMP", temp);
            var apiKey = "fd2948fdde9149cf94c403b3c64d325d"; 
            var classInfo = [];
            temp.forEach(function (course) {
    			var courseUrl = `/Develop/GetProxy?url=https://api.uwaterloo.ca/v2/courses/${course.sub}/${course.code}/schedule.json?key=`;
             	$scope.portalHelpers.getHttpData(courseUrl + apiKey).then(function(info){
                	// Code to run on success
                	console.log("GET PROXY DATA", data);
                 	if (info.data.section.contains("LEC ")) classInfo.add(data);
            	});
    		});
            
            console.log("CLASS INFO", classInfo);
        });
	});
    
    
    
    
}]);