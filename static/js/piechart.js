
var legendRectSize = 18; // defines the size of the colored squares in legend
var legendSpacing = 2; // defines spacing between squares

var margin = {
        top: 30,
        right: 120,
        bottom: 30,
        left: 50
    },
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    tooltip = {
        width: 100,
        height: 100,
        x: 10,
        y: -30
    };
//initialize margin end
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var pie = d3.pie()
    .sort(null)
    .value(d => d.value);

var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

var arcLabel = function() {
    const radius = Math.min(width, height) / 2 * 0.8;
    return d3.arc().innerRadius(radius).outerRadius(radius);
}

//loading csv
d3.csv("resources/barcharttesttake.csv", function(error, inputData) {
    if (error) throw error;
    var data = [];
    inputData.reduce(function(res, value) {
        if (!res[value.name]) {
            res[value.name] = {
                date: value.date,
                name: value.name,
                category: value.category,
                value: parseInt(value.value)
            };
            data.push(res[value.name])
        }
        toString(res[value.name].value += parseInt(value.value));
        return res;
    }, {});
    //console.log(data)
    data.filter(function(d) {
        //console.log(d);
    });
     
    var color = d3.scaleOrdinal()
           .domain(data.map(d => {
               return d.category
           }))
           .range(["#000000","#D2B48C","#000080","#FFFFFF","#684A3B","#ED2227","#F4F4E7","#FF00FF","#708090","#739ABB"])
    
        var arcs = pie(data);
	
	
    svg.append("g")
        .attr("stroke", "white")
        .selectAll("path")
        .data(arcs)
        .enter().append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        
        .attr("d", arc)
        .append("title")

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .enter().append("text")
        .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
        .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        //  .text(d => d.data.name)
         )


var legend = svg.selectAll('.legend') // selecting elements with class 'legend'
.data(data) // refers to an array of labels from our dataset
.enter() // creates placeholder
.append('g') // replace placeholders with g elements
.attr('class', 'legend') // each g is given a legend class
.attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing      
    var offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
    var horz = 18 * legendRectSize; // the legend is shifted to the left to make room for the text
    var vert = i * height - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
    return 'translate(' + horz + ',' + vert + ')'; //return translation       
});

// adding colored squares to legend
legend.append('rect') // append rectangle squares to legend                                   
.attr('width', legendRectSize) // width of rect size is defined above                        
.attr('height', legendRectSize) // height of rect size is defined above                      
.style('fill', (d,i)=>{
    return color(d.name)
}) // each fill is passed a color
.style('stroke', color) // each stroke is passed a color


// adding text to legend
legend.append('text')
.attr('x', legendRectSize + legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.text(function(d) {
    return d.name;
});


//----------------------------------

});



 //-------------------------------    want this to work for title   
        // svg.append("g")
        // //.attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
        // .attr("transform", "translate(" + (width / 2 - 73) + "," + 20 + ")")
        // .append("text")
        // .text("Body Bark Internet Color Sales - Totals")
        // .style("text-decoration", "underline") 
        // .attr("class", "title")

        //-----------------------------

        //--------------------------------------------------
// CP added this for the title
        // svg.append("text")
        // .attr("x", (width / 2))             
        // .attr("y", 0 - (margin.left / 1))
        // .attr("text-anchor", "middle")  
        // .style("font-size", "16px") 
        // .style("text-decoration", "underline")  
        // .text("Sales by Color");
//----------------------------------------	
//Legend