var fileName = "resources/color_count_totals2.csv";
var bbfields = ["Black", "Natural", "Navy", "White", "Java", "ChiliPepperRed", "Ivory", "FuchsiaPurple", "SlateGray", "Bluestone"];
var barcolor = ["#000000","#D2B48C","#000080","#FFFFFF","#684A3B","#ED2227","#F4F4E7","#FF00FF","#708090","#739ABB"]

d3.csv(fileName, function(error, data) {
    var yearMap = {};
    data.forEach(function(d) {
        var year = d.year;
        yearMap[year] = [];

        // { yearName: [ bar1Val, bar2Val, ... ] }
        bbfields.forEach(function(field) {
            yearMap[year].push( +d[field] );
        });
    });
    makeVis(yearMap);
    console.log(yearMap);
});

   var makeVis = function(yearMap) {
    // Define dimensions of vis
    var margin = { top: 30, right: 50, bottom: 30, left: 50 },
        width  = 700 - margin.left - margin.right,
        height = 250 - margin.top  - margin.bottom;

    // Make x scale
    var xScale = d3.scaleBand().domain(bbfields)
        .range([0, width], 0.1);

    // Make y scale, the domain will be defined on bar update
    var yScale = d3.scaleLinear()   //replaced scale.linear
        .range([height, 0]);

    // Create canvas
    var canvas = d3.select("#vis-container")
      .append("svg")
        .attr("width",  width  + margin.left + margin.right)
        .attr("height", height + margin.top  + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Make x-axis and add to canvas
   // var xAxis = d3.svg.axis().scale(xScale).orient("bottom");  //changed below
    var xAxis = d3.axisBottom(xScale);

    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Make y-axis and add to canvas
    // var yAxis = d3.svg.axis().scale(yScale).orient("left"); //redid for version
    var yAxis = d3.axisLeft(yScale);

    var yAxisHandleForUpdate = canvas.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    yAxisHandleForUpdate.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");

        // var color = d3.scaleOrdinal()
        // .domain(data.map(d => {
        //     return d.category
        // }))
        // .range(["#000000","#D2B48C","#000080","#FFFFFF","#684A3B","#ED2227","#F4F4E7","#FF00FF","#708090","#739ABB"])
 
    var updateBars = function(data) {
        // First update the y-axis domain to match data
        yScale.domain( d3.extent(data) );
        yAxisHandleForUpdate.call(yAxis);

        var bars = canvas.selectAll(".bar").data(data);
        

        // Add bars for new data
        bars.enter()
          .append("rect")
            .attr("class", "bar")
            .attr("x", function(d,i) { return xScale(bbfields[i] ); })
            .attr("width", xScale.bandwidth())
            .attr("y", function(d,i) { return yScale(d); })
            .attr("height", function(d,i) { return height - yScale(d); })
            .attr("fill", function(d,i) { return barcolor[i]; })

        // Update old ones, already have x / width from before
        bars
            .transition().duration(250)
            .attr("y", function(d,i) { return yScale(d); })
            .attr("height", function(d,i) { return height - yScale(d); });

        // Remove old ones
        bars.exit().remove();
    };

    // Handler for dropdown value change
    var dropdownChange = function() {
        var newYr = d3.select(this).property('value'),
            newData   = yearMap[newYr];

        updateBars(newData);
    };

    // Get years, for dropdown
    var year = Object.keys(yearMap).sort();

    var dropdown = d3.select("#vis-container")
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(year)
      .enter().append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });

    var initialData = yearMap[ year[0] ];
    updateBars(initialData);
};