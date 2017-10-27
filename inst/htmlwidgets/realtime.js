HTMLWidgets.widget({
  name: "realtime",
  type: "output",
  factory: function(el, width, height) {
    /* initialize web socket */
    var raw;
    var ws = new WebSocket("ws://0.0.0.0:9454");
    ws.onmessage = function(msg ) {
       raw = msg;
       ws.send("ping");
     };
    window.setTimeout(function() {
      ws.send('ping');
    }, 500);
    // set up timings
    var d1 = Date.now();
    var difftime = 1;

    // create return htmlwidget factory
    return {
      renderValue: function(x) {
        // set global constants
        var y_data = [];
        var x_labels = []
        var padding = 50;
        var start_x = 0;
        // define function to create plot
        var fun = function(p) {
          p.setup = function() {
            p.createCanvas(width, height);
            p.noFill();
          };
          p.draw = function() {
            /* initialize variables */
            var w = p.canvas.width, h = p.canvas.height;
            var gridwidth = 100;
            if (!raw) {
              return;
            }
            /* get new data from R */
            var new_data = raw.data;
            /* get current time */
            var raw_ds = new Date(Date.now());
            var ds = raw_ds.toLocaleDateString() + "\n" +
                     raw_ds.toLocaleTimeString();

            /* append new data to array */
            y_data.push(new_data);
            x_labels.push(ds);
            if (y_data.length > ((width - padding) + 5)) {
              y_data.shift();
              x_labels.shift();
              start_x = start_x + 1;
            }
            if (!x.ylim) {
              var curr_min = Math.min(...y_data);
              var curr_max = Math.max(...y_data);
              var curr_pad = (curr_max - curr_min) * 0.1;
              if (curr_pad < 1e-10) {
                curr_pad = 0.01;
              }
              var axis_min = curr_min - curr_pad;
              var axis_max = curr_max + curr_pad;
            } else {
              var axis_min = x.ylim[0];
              var axis_max = x.ylim[1];
            }

            // set background
            p.background("#ebebeb");

            /* set up plot */
            // create axes
            p.stroke(255); // white
            for(var i = 0; i < w || i < h; i += gridwidth) {
                // draw horizontal lines
                p.line(i + padding, 0, i + padding, h);
                // draw vertical lines
                p.line(0, h - i + padding, w, h - i + padding);
            }

            // white out axes space
            p.noStroke();
            p.fill(255, 255, 255);
            p.rect(0, height - padding, width, height);
            p.rect(0, 0, padding, height);
            p.noFill();

            // draw tick marks
            p.stroke(0); // black
              for (var i = gridwidth; i < (w - padding) || i < (h - padding);
                   i += gridwidth) {
                // draw horizontal lines
                p.line(padding + i, height - padding, padding + i,
                     height - padding + 5);
                // draw vertical lines
                p.line(padding, i - padding, padding - 5, i - padding);
              }

            // draw tick labels
            p.textSize(12);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Helvetica');
            for (var i = gridwidth; i < (w - padding) || i < (h - padding);
                 i += gridwidth) {
              // draw y labels
              var lab = p.map(i, 0, height - padding, axis_min, axis_max);
              lab = Math.round(lab * 100) / 100;
              p.text(lab, padding - 20, height - padding - i);
              // draw x labels
              if (i > (x_labels.length - 1)) {
                // estimate date/times for future data
                raw_ds = new Date(d1 + (difftime * i));
                ds = raw_ds.toLocaleDateString() + "\n" +
                     raw_ds.toLocaleTimeString();
                p.text(ds, i + padding, height - padding + 20);
              } else {
                // return actual date/times for data
                p.text(x_labels[i], i + padding, height - padding + 20);
              }
            }

            // draw the axis label
            p.textSize(20)
            p.textFont("Arial");
            p.text(x.title, padding + ((width - padding) / 2), 20);

            /* add data */
            p.beginShape();
            for (i = 0; i < y_data.length; i++) {
              p.stroke(0);
              p.vertex(i + padding, height - padding - p.map(y_data[i],
                                                             axis_min,
                                                             axis_max,
                                                             0,
                                                             height - padding));
            }
            p.endShape();
          };
        };
        // create p5 sketch
        var p = new p5(fun, el.id);
      },
      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }
    };
  }
});