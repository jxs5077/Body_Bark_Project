  d3.csv("resources/color_count_totals.csv", function(data) {
    var bbcolor = [];
    var yearsold = [];
    var total = [];

    for (var i = 0; i < data.length; i++) {
      bbcolor.push(data[i].color);
      yearsold.push(data[i].year);
      total.push(data[i].count_total);
      }  //end for loop
   
    var trace = [{
      type: 'bar',
      x: bbcolor,
      y: total,
     // orientation: 'h',
      text: bbcolor
    }];
              
    Plotly.newPlot('bar', trace);
    // console.log(bbcolor);
    // console.log(yearsold);

    var select = document.getElementById("selDataset"); 
    for(var i = 0; i <yearsold.length; i++) {
    var opt = yearsold[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    }
  buildgraph(yearsold[0]);

    });
 
 