jQuery( document ).ready( function( $ ) {
	$.sponsorsCarousel = { list: {} };
	$( '.sponsors_carousel' ).each( function( i, e ) {
		var id = parseInt( $( e ).data( 'id' ) );
		var speed = parseInt( $( e ).data( 'speed' ) );
		var autoscroll = parseInt( $( e ).data( 'autoscroll' ) );
		$.sponsorsCarousel.list[ id ] = $( e );
		var scrollamount = parseInt( $( e ).data( 'scrollamount' ) );
		$( e ).jcarousel( {
			wrap: 'circular',
			animation: {
				duration: speed
			},
			transitions: {
				easing: autoscroll == 1 ? 'linear': 'easy'
			}
		} );
		if ( autoscroll > 0 ) {
			$( e ).jcarouselAutoscroll( {
				interval: autoscroll == 1 ? 0 : autoscroll * 500,
				target: ( '+=' + scrollamount )
			} );
			$( e ).mouseenter(function( e ) { $( this ).jcarouselAutoscroll( 'stop' ); } );
			$( e ).mouseleave(function( e ) { $( this ).jcarouselAutoscroll( 'start' ); } );
		}
		$(e).find( 'img' ).bind( "contextmenu", function( e ) { e.preventDefault(); } );
		$(e).find( 'img' ).attr( 'draggable', false );

	} );

	$.sponsorsCarousel.move = function( id, move ) {
		$.sponsorsCarousel.list[ id ].jcarousel( 'scroll', move );
		return false;
	}
});
