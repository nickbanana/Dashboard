//var svg = d3.select("div").append("svg").attr("height",400).attr("width",600);

var data = [[]];
var random = new Rickshaw.Fixtures.RandomData(150);
for (var i = 0; i < 150; i++) {
    random.addData(data);
}

var graph = new Rickshaw.Graph(
    {
        element: document.querySelector("#chart"),
        width: document.querySelector("#chart").clientWidth,
        height: document.querySelector("#chart").clientHeight,
        renderer: 'line',
        stroke: true,
        preserve: true,
        series:[
            {
                color: 'steelblue',
                data: data[0]
            }
        ]
    }
);

graph.render();

setInterval(
    function(){
        random.removeData(data);
        random.addData(data);
        graph.update();
    } , 1000
);
