// function getCharts(studentInfo, elementName) {
//     document.getElementById("chartbox").style.display = "flex";
//     var dataPoints = [];
//     studentInfo.forEach(q => dataPoints.push({ y: parseInt(q.points_earned), label: "day " + q.question_id }));
//     chart = new CanvasJS.Chart(elementName, {
//         animationEnabled: true,

//         title: {
//             text: studentInfo[0].student_id
//         },
//         axisX: {
//             interval: 1
//         },
//         axisY2: {
//             interlacedColor: "rgba(22,22,2,.2)",
//             gridColor: "rgba(22,22,22,.5)",
//             title: " "
//         },
//         data: [{
//             type: "bar",
//             name: "Student",
//             axisYType: "secondary",
//             color: "#02ad02",
//             dataPoints
//         }]
//     });
//     chart.render();
// }
function getCharts(info, questionCount) {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    var value = [];
    var width = 50;
    var currx = 30;
    ctx.fillStyle = "green";
    for (var i = 1; i < questionCount + 1; i++) {
        var e = info.filter(element => element.question_id == i);
        if (e.length > 0) {
            var h = e[0].points_earned;
            ctx.fillRect(currx, canvas.height - h * 26, width, h * 26);
        } else {
            var h = 0;
            ctx.fillRect(currx, canvas.height - h * 26, width, h * 26);
        }
        currx += width + 10;
    };
    assignYValues(info);
    assignXValues(info, questionCount);
};
function assignXValues(info, questionCount) {
    document.getElementById("xaxis").innerHTML = "";
    for (var i = 1; i < questionCount + 1; i++) {
        var span = document.createElement("span");
        if (i == 1) {
            span.id = "firstx"
        } else {
            span.classList = "xvalues";
        }
        span.innerHTML = "day " + i;
        document.getElementById("xaxis").appendChild(span);
    }

}
function assignYValues(info) {
    var points = [];
    info.forEach(element => points.push(element.points_earned));
    points = points.sort();
    document.getElementById('yaxis').innerHTML = ""
    for (var i = 10; i > 0; i--) {
        var yValue = document.createElement("div");
        yValue.classList.add('point-earned');
        yValue.innerHTML = i + " point";
        yValue.style.marginBottom = "10px";
        document.getElementById('yaxis').appendChild(yValue);
    }
}

function searchByStudent() {
    document.getElementById("show-chart").style.display = "block";
    var student = document.getElementById("student");
    var request = new XMLHttpRequest()
    var studentName = document.getElementById("student").value;
    if (!studentName) {
        return;
    }
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.responseText)
            var totalQuestion = response.pop();
            console.log(totalQuestion);
            getCharts(response, totalQuestion);
            // getCharts(JSON.parse(request.responseText), elementName);
        }
    }
    request.open("GET", "./get-scores.php");
    request.setRequestHeader("search-by-student", studentName)
    request.send();
}
function showAllStudents() {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status === 200) {
            var response = JSON.parse(request.responseText);
            var totalQuestions = response.pop();
            console.log(response);
            var students = groupBy(response, "student_id");
            console.log(students);
            var i = 1;
            for (var student in students) {
                showMultipleCharts(students[student], totalQuestions, i,student);
                i++;
            }
        }
    }
    request.open("GET", "./get-scores.php");
    request.setRequestHeader("search-by-student", "false");
    request.send();
}
function assignAllXValues(student, questionCount, xaxis) {
    xaxis.innerHTML = "";
    for (var i = 1; i < questionCount + 1; i++) {
        var span = document.createElement("span");
        if (i == 1) {
            span.id = "firstx"
        } else {
            span.classList = "xvalues";
        }
        span.innerHTML = "day " + i;
        xaxis.appendChild(span);
    }

}
function assignAllYValues(student, yaxis) {
    var points = [];
    console.log(student);
    student.forEach(element => points.push(element.points_earned));
    points = points.sort();
    yaxis.innerHTML = "";
    for (var i = 10; i > 0; i--) {
        var yValue = document.createElement("div");
        yValue.classList.add('point-earned');
        yValue.innerHTML = i + " point";
        yValue.style.marginBottom = "10px";
        yaxis.appendChild(yValue);
    }
}

function showMultipleCharts(student, totalQuestions, index, studentName) {
    var container = document.createElement("div");
    var cont = document.getElementById('chartbox1');
    container.classList ="show-student-name";
    cont.appendChild(container);
    container.innerHTML = studentName;
    var smallerContainer = document.createElement("div");
    smallerContainer.id = "small-container" + index;
    smallerContainer.classList = "all-charts";
    container.appendChild(smallerContainer)
    var yaxisContainer = document.createElement("div");
    yaxisContainer.classList = "yaxisContainer";
    var canvas = document.createElement("canvas");
    var yaxis = document.createElement("div");
    var xaxis = document.createElement("div");
    assignAllXValues(student, totalQuestions, xaxis);
    xaxis.classList = "xaxis";
    yaxis.classList = "yaxis";
    assignAllYValues(student, yaxis);
    canvas.id = "graph" + index;
    canvas.style.width = "400px";
    yaxisContainer.appendChild(yaxis);
    smallerContainer.appendChild(yaxisContainer);
    smallerContainer.appendChild(canvas);
    container.appendChild(xaxis);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    var value = [];
    var width = 50;
    var currx = 30;
    ctx.fillStyle = "green";
    for (var i = 1; i < totalQuestions + 1; i++) {
        console.log(student);
        var e = student.filter(element => element.question_id == i);
        if (e.length > 0) {
            var h = e[0].points_earned;
            ctx.fillRect(currx, canvas.height - h * 10, width, h * 10);
        } else {
            var h = 0;
            ctx.fillRect(currx, canvas.height - h * 8, width, h * 15);
        }
        currx += width + 10;
    };
}
// function showAllStudents() {
//     var request = new XMLHttpRequest()
//     request.onreadystatechange = function () {
//         if (request.readyState == 4 && request.status === 200) {
//             clearChartElements();
//             var response = JSON.parse(request.responseText);
//             console.log(response);
//             var students = groupBy(response, "student_id");
//             students = toArray(students)
//             students.forEach(student => {
//                 var elementName = createNewChartElement();
//                 getCharts(student, elementName);
//             })

//         }
//     }
//     request.open("GET", "./get-scores.php");
//     request.setRequestHeader("search-by-student", "false");
//     request.send();
// }
// function clearChartElements() {
//     var chartbox = document.getElementById("chartbox");
//     while (chartbox.firstChild) {
//         chartbox.removeChild(chartbox.firstChild);
//     }
// }

function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}
function toArray(obj) {
    var arr = [];
    for (student in obj) {
        arr.push(obj[student]);
    }
    return arr;

}
