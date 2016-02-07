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
    {dungeon: 'forest_01', win: 20, lose: 0, knight: 5, monk: 5, wizard: 5, cleric: 5, total: 20},
    {dungeon: 'forest_02', win: 3, lose: 2, knight: 4, monk: 1, wizard: 0, cleric: 0, total: 5},
    {dungeon: 'forest_03', win: 10, lose: 20, knight: 5, monk: 7, wizard: 6, cleric: 12, total: 30},
    {dungeon: 'gradole_01', win: 10, lose: 20, knight: 5, monk: 7, wizard: 6, cleric: 12, total: 30},
    {dungeon: 'gradole_02', win: 10, lose: 20, knight: 5, monk: 7, wizard: 6, cleric: 12, total: 20},
    {dungeon: 'sky_01', win: 30, lose: 10, knight: 5, monk: 7, wizard: 6, cleric: 12, total: 50},
  ];

  var w = 500;
  var h = 300;

  var rScale = d3.scale.linear()
  //.domain([1, 10]).range([1, 5]);

  function inspectMapCoord(evt) {
      var e = evt.target;
      var dim = e.getBoundingClientRect();
      var x = evt.clientX - dim.left;
      var y = evt.clientY - dim.top;
      console.log('x:', x, 'y:', y);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var map = d3.select('body').select('#map-foreground').append('svg');

    var tiles = map.selectAll('circle.hot-spot').data(dataset);
    tiles.enter().append('circle').attr('class', 'hot-spot');

    tiles
      .attr('cx', function(d) {
        return DUNGEON_POSITIONS[d.dungeon].x;
      })
      .attr('cy', function(d) {
        return DUNGEON_POSITIONS[d.dungeon].y;
      })
      .classed('win', function(d) {
        return d.win;
      })
      .classed('lose', function(d) {
        return !d.win;
      })
      .attr('r', function(d) {
        return rScale(d.total);
      });

    tiles.transition()
      .duration(2000)
      .style('opacity', 0)
      .ease('exp')
      .remove();

    document.querySelector('#map-foreground svg').addEventListener('click', inspectMapCoord);

  });
})();
