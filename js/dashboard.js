var flowchart_data = [[]];
var flowchart_random = new Rickshaw.Fixtures.RandomData(150);
var wordcloud_list;

d3.json("word_data.json", function (error, json) {
    if (error) throw error;
    wordcloud_list = json;
    var wordcloud_color = d3.scale.linear()
        .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
        .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
    var wordcloud_fontSize = d3.scale.pow().exponent(5).domain([0, 1]).range([10, 80]);
    var wordcloud_layout = d3.layout.cloud().size([600, 400]) // width,height
        .words(wordcloud_list)
        .padding(1)
        .rotate(0)
        .fontSize(function (d) { return wordcloud_fontSize(d.frequence); })
        .text(function (d) { return d.word; })
        .on("end", draw);

    wordcloud_layout.start();

    function draw(words) {
        d3.select("#wordcloud").append("svg")
            .attr("width", 650)
            .attr("height", 450)
            .attr("class", "wordcloud")
            .append("g")
            .attr("transform", "translate(300,200)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .attr("text-anchor","middle")
            .style("font-size", function (d) { return d.size + "px"; })
            .style("fill", function (d) { return wordcloud_color(0); })
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
        width: 600,
        height: 400,
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

flowchart_graph.render();

function update_flowchart() {
    flowchart_random.removeData(flowchart_data);
    flowchart_random.addData(flowchart_data);
    flowchart_graph.update();
}

setInterval(
    function () {
        update_flowchart();
    }, 1000
);