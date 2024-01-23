var delay = 500 ;


var video_mdown = false ;
var video_mdown_state ;
var mholding = false;

var revision_interval_id ;
var video_elem ;
var cur_speed;



window.addEventListener(
	"mouseup"
	,
	()=> {
		if(
			( video_mdown )
			&&
			(video_elem !== undefined)
			&&
			( cur_speed !== undefined )
		)
		{
			video_elem.playbackRate = cur_speed;
		}
		video_mdown = false ; mholding = false;
	}
);



function cancel_speedup
(
	player_obj
	,
	cur_state
)
{
	
	video_elem.playbackRate = cur_speed;
	if( cur_state === 2 )
	{
		
		player_obj.pauseVideo();
		
	}
	
	
};



function player_mup
(
	player_obj
)
{
		if( video_mdown )
		{
			
			var is_pause = false ;
			
			
			
			
			if( video_mdown_state === 1 )
			{
				
				is_pause = mholding ;
			}
			
			else if( video_mdown_state === 2 )
			{
				
				is_pause = ! mholding;
			}
			
			
			
			
			if( is_pause )
			{
				
				setTimeout(()=>player_obj.pauseVideo()) ;
			
			}
			
			else
			{
				
				setTimeout(()=>player_obj.playVideo()) ;
				
			}
			
			
		}
};




function player_mdown
(
	e
	,
	player_obj
)
{
	if(
		( e.button === 0 )
		&&
		( e.target === video_elem )
	)
	{
		clearInterval(revision_interval_id);
		
		
		
		video_mdown = true ;
		
		cur_speed = ( video_elem.playbackRate );
		var cur_state = player_obj.getPlayerState() ;
		video_mdown_state = cur_state;
		
		
		setTimeout(
			()=> {
				
				
				if( ! video_mdown ){
					
					return ;
					
				}
				
				mholding = true ;
				
				cancel_speedup(
					player_obj
					,
					cur_state
				);
				
				
				
				var revision_tot = 10 ;
				var revision_cur = 0 ;
				
				
				revision_interval_id = (
				
					setInterval(
						()=> {
							
							if( ! video_mdown )
							{
								
								return;
								
							}
							
							
							if( revision_cur === revision_tot )
							{
								clearInterval(
									revision_interval_id
								) ;
							}
							
							else
							{
								cancel_speedup(
									player_obj
									,
									cur_state
								);
								
								
								revision_cur += 1 ;
							}
							
						}
					)
				);
				
				
			}
			,
			delay
		);
	}
	
};




function proxify_player()
{
	
	var player_container = (
		document.getElementById( "player-container" )
	) ;
	
	if( player_container !== null )
	{
		
		var player_elem = null ;
		var interval_id ;
		
		interval_id = (
			setInterval(
				()=> {
					
					player_elem = (
						( document.getElementById( "ytd-player" ) )
					);
					
					
					if( player_elem !== null )
					{
						
						clearInterval( interval_id ) ;
						
						player_elem = ( player_elem.firstElementChild );
						
						
						var player_obj = document.getElementById( "movie_player" ) ;
						
						video_elem = (
							document.getElementsByClassName(
								"html5-main-video"
							)[ 0 ]
						);
						
						
						
						
						player_elem.addEventListener(
							"mousedown"
							,
							( e )=> {
								player_mdown(
									e
									,
									player_obj
								)
							}
							,
							false
						);
						
						
						player_elem.addEventListener(
							"mouseup"
							,
							()=> { player_mup( player_obj ) }
							,
							true
						);
						
					}
					
				}
				,
				50
			)
		);
		
	}
	
} ;




window.addEventListener(
	"load"
	,
	proxify_player
);

