;(function(d3) {
  var svg = d3.select( 'svg' ),
      dots = svg.append( 'g' );
  
  circle();
  small();

  function circle() {
    dots.append('circle')
      .attr('r',0)
      .attr('cx',25)
      .attr('cy',25)
      .attr('filter', 'url(#blurMe)')
      .attr('fill', '#ffff66')
      .transition()
      .delay(300)
      .attr('r', 30);
  }

  function yellow() {
    d3.selectAll('circle')
      .transition()
      .delay(300)
      .attr('r', 30)
      .attr('fill', '#ffff66')
      .each("end", small);
  }

  function small() {
    d3.selectAll('circle')
      .transition()
      .delay(300)
      .attr('r', 10)
      .each("end", yellow);
  }

} )(d3);
