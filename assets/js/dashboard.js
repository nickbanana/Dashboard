var flowchart_data = [[]];
var flowchart_random = new Rickshaw.Fixtures.RandomData(150);
var wordcloud_list;
var time = new Rickshaw.Fixtures.Time();

d3.json("word_data.json", function (error, json) {
    if (error) throw error;
    wordcloud_list = json;
    var wordcloud_color = d3.scale.linear()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .range(["#9fc", "#6fc", "#0f9", "#6f9", "#6f6", "#9f6", "#cf3", "#ff0", "#f90", "#f60", "#c00"]);
    var wordcloud_fontSize = d3.scale.pow().exponent(5).domain([0, 1]).range([10, 80]);
    var wordcloud_layout = d3.layout.cloud().size([$("#wordcloud").width(), 400]) // width,height
        .words(wordcloud_list)
        .padding(1)
        .rotate(0)
        .fontSize(function (d) { return wordcloud_fontSize(d.frequence); })
        .text(function (d) { return d.word; })
        .on("end", draw);

    wordcloud_layout.start();

    function draw(words) {
        d3.select("#wordcloud").append("svg")
            .attr("width", $("#wordcloud").width()+50)
            .attr("height", 450)
            .attr("class", "wordcloud")
            .append("g")
            .attr("transform", "translate("+ $("#wordcloud").width()/2 + ",200)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .attr("text-anchor","middle")
            .style("font-size", function (d) { return d.size + "px"; })
            .style("fill", function (d) { return wordcloud_color(Math.floor((d.size-10)/7)); })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
    }


});



for (var i = 0; i < 150; i++) {
    flowchart_random.addData(flowchart_data);
}

var flowchart_graph = new Rickshaw.Graph(
    {
        element: document.querySelector(".flowchart"),
        width: $(".flowchart").width(),
        height: 350,
        renderer: 'line',
        stroke: true,
        preserve: true,
        series: [
            {
                color: 'steelblue',
                data: flowchart_data[0]
            }
        ]

    }
);

var xAxis = new Rickshaw.Graph.Axis.Time(
    {
        graph: flowchart_graph
    }
);
xAxis.render();

var yAxis = new Rickshaw.Graph.Axis.Y(
{
    graph: flowchart_graph
}
);
yAxis.render();


flowchart_graph.render();

function update_flowchart() {
    flowchart_random.removeData(flowchart_data);
    flowchart_random.addData(flowchart_data);
    flowchart_graph.update();
}

$(document).ready(
    function(){
        $('#domaintable').dataTable(
            {
                "ajax":{
                    url: 'table.json',
                    dataSrc: ''
                },
                "columns":
                [
                    {"data": "id"},
                    {"data": "times"}
                ]
            }
        )
    }
)





//setInterval(
//    function () {
//        update_flowchart();
//    }, 1000
//);