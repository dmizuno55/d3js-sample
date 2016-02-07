(function() {
  var DUNGEON_POSITIONS = {
    forest_01: {x: 128, y: 292},
    forest_02: {x: 129, y: 264},
    forest_03: {x: 163, y: 261},
    gradole_01: {x: 470, y: 144},
    gradole_02: {x: 506, y: 144},
    sky_01: {x: 475, y: 31},
  };

  var dataset = [
    {dungeon: 'forest_01', win: 5, lose: 15, knight: 5, monk: 5, wizard: 5, cleric: 5, total: 20},
    {dungeon: 'forest_02', win: 3, lose: 0, knight: 4, monk: 1, wizard: 0, cleric: 0, total: 5},
    {dungeon: 'forest_03', win: 3, lose: 15, knight: 5, monk: 7, wizard: 6, cleric: 12, total: 30},
  ];

  var width = 560;
  var height = 400;

  function updateChart(sandbox, time) {
    var pie = d3.layout.pie();

    var color = d3.scale.ordinal()
      .range(['#00FF00', '#FF0000']);

    d3.json('./assets/data/data_0' + time + '.json', function(err, dataset) {
      if (err) throw err;

      var ts = Date.now();
      var charts = sandbox.selectAll('g.war-complexion.proc' + ts).data(dataset);
      charts.enter().append('g').attr('class', 'war-complexion proc' + ts);
      charts.attr('transform', function(d) {
        var dungeon = DUNGEON_POSITIONS[d.dungeon];
        return 'translate(' + dungeon.x + ', ' + dungeon.y + ')';
      });

      charts.each(function(d, i) {
        var _color = color.copy();

        var arc = d3.svg.arc()
          .innerRadius(0)
          .outerRadius(d.total);

        d3.select(this)
          .selectAll('path')
          .data(pie([d.win, d.lose]))
          .enter()
          .append('path')
          .attr('d', function(d) {return arc(d);})
          .attr('fill', function(d) {console.log(d);return _color(d.startAngle);});
      });

      charts.exit().remove();

      charts.transition()
        .duration(4500)
        .style('opacity', 0)
        .remove();
    });
  }

  function refresh(sandbox, time) {
    time = (time > 2 ? 1 : time);
    updateChart(sandbox, time);

    setTimeout(function() {
      refresh(sandbox, time++);
    }, 6000);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var sandbox = d3.select('body').append('svg')
      .attr({
        id: 'sandbox',
        width: width,
        height: height 
      });

    refresh(sandbox, 1);
  });
})();
