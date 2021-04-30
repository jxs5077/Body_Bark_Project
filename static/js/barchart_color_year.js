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
      text: bbcolor,
      marker: {
        line: {
          //color: 'rgb(8,48,107)',
          color: '#e2d6b5',
          width: 1.5
        },
        color: ["#000000","#739ABB", "#ED2227", "#FF00FF", "#F4F4E7", "#684A3B","#D2B48C", "#000080", "#708090","#FFFFFF"]
      }
    }];
//----------------------
    var layout = {
      title: "Body Bark Internet Color Sales - Totals",
      barmode: "group"
    };
 //-------------------             
    Plotly.newPlot('bar', trace, layout);
    // console.log(bbcolor);
    // console.log(yearsold);

    var select = document.getElementById("selDataset"); 
    for(var i = 0; i <yearsold.length; i++) {
    var opt = yearsold[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    //select.appendChild(el);
    }
   // buildgraph(yearsold[0]);

    });
 
 