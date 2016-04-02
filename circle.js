;( function( d3 ) {
  var svg = d3.select( 'svg' ),
      // svg         = d3container.append( 'svg' ),
      dots        = svg.append( 'g' );
  
  circle();
  white();

  function circle() {
    dots.append( 'circle' )
        .attr( 'r', 0 )
        .attr( 'cx',  150 )
        .attr( 'cy', 25 )
        .attr( 'fill', '#ffff66')
        .transition()
        .delay( 200)
        .attr( 'r', 30 );
  }

  function yellow() {
    d3.selectAll('circle')
    .transition()
    .delay( 1000)
    .attr('fill', '#ffff66')
    .each("end", white);
  }

  function white() {
    d3.selectAll('circle')
      .transition()
      .delay(1000)
      .attr('fill', '#ffffff')
      .each("end", yellow);
  }

} )( d3 );
