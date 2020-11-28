var ChromeSamples = {
  log: function () {
    var line = Array.prototype.slice.call(arguments).map(function (argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');
    if (document.querySelector('#log')) {
    document.querySelector('#log').textContent += line + '\n';
    }
  },

  clearLog: function () {
    if (document.querySelector('#log')) {
    document.querySelector('#log').textContent = '';
    }
  },

  setStatus: function (status) {
    if (document.querySelector('#status')) {
    document.querySelector('#status').textContent = status;
    }
  },

  setContent: function (newContent) {
    if (document.querySelector('#content')) {
    var content = document.querySelector('#content');
    while (content.hasChildNodes()) {
      content.removeChild(content.lastChild);
    }
    content.appendChild(newContent);
    }
  }
};

//for use playlist
const wavethis = document.querySelectorAll('.wavethis'),
wavethisBlock = document.querySelector('.wavethis-block');

wavethis.forEach((elem, i) => {
  elem.addEventListener('click', (event) => {
    wavesurfer.load(playlist[i]);
    wavesurfer.on('ready', function () {
      wavesurfer.play();
  });
  });
});

console.log(wavethis);
console.log(wavethisBlock);


if (!navigator.mediaSession) {
  ChromeSamples.setStatus('The Media Session API is not yet available. Try Chrome for Android.');
} else {
  ChromeSamples.setStatus('yay it works');
}
// This prevents unnecessary errors when Media Session API is not available.
navigator.mediaSession = navigator.mediaSession || {};
navigator.mediaSession.setActionHandler = navigator.mediaSession.setActionHandler || function () {};
window.MediaMetadata = window.MediaMetadata || function () {};




$(window).resize(function () {
  //off track when window resize
  //wavesurfer.empty();
  wavesurfer.drawBuffer();
});




var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#E0DFE0',
  progressColor: '#27282A',
  minPxPerSec: 1,
  barWidth: 1,
  height: 25,
});


var playlist = getAwesomePlaylist();
console.log(playlist);
var index = 0;
//console.log(index);
// LOAD FIRST TRACK
wavesurfer.load(playlist[index]);


function getTime() {
  wavesurfer.on('audioprocess', function() {
    if(wavesurfer.isPlaying()) {
      if (document.getElementById('time-current')) {
        var totalTime = wavesurfer.getDuration(),
            currentTime = wavesurfer.getCurrentTime(),
            remainingTime = totalTime - currentTime;
        
        document.getElementById('time-current').innerText = currentTime.toFixed(0);
    }
    }
});
}

// PLAY PAUSE
function playAudio() {
  wavesurfer.playPause();
  //updateMetadata();
}

// PLAY
$('body').on('click', '#playpause', function () {
  playAudio();
});

navigator.mediaSession.setActionHandler('play', function () {
  wavesurfer.play();
  getTime();
});

navigator.mediaSession.setActionHandler('pause', function () {
  wavesurfer.playPause();
  getTime();
});
//set play
wavesurfer.on('play', function () {
  $('#playpause').html(`<svg width="15" height="15" style="transform: translateX(-1px)" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.36571 0H1.25929C0.563924 0 0 0.395675 0 0.883578V14.1164C0 14.6043 0.563924 15 1.25929 15H4.36571C5.06108 15 5.625 14.6043 5.625 14.1164V0.883578C5.62504 0.395675 5.06112 0 4.36571 0Z" fill="black"/>
<path d="M13.7407 0H10.6343C9.93896 0 9.375 0.395675 9.375 0.883578V14.1164C9.375 14.6043 9.93892 15 10.6343 15H13.7407C14.436 15 15 14.6043 15 14.1164V0.883578C15 0.395675 14.4361 0 13.7407 0Z" fill="black"/>
</svg>

`);
  getTime();
});
//set pause
wavesurfer.on('pause', function () {
  $('#playpause').html(`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M3.19042 0.330738C1.83809 -0.44498 0.741699 0.190498 0.741699 1.74898V13.2499C0.741699 14.81 1.83809 15.4446 3.19042 14.6696L13.2428 8.90465C14.5956 8.12866 14.5956 6.87143 13.2428 6.09562L3.19042 0.330738Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>`);
});

// PREVIOUS TRACK
function loadprev() {
  ChromeSamples.log('> User clicked "Previous Track" icon.');
  index = (index - 1 + playlist.length) % playlist.length;
  wavesurfer.load(playlist[index]);
  
}

$('body').on('click', '#loadprev', function () {
  loadprev();
    wavesurfer.on('ready', function () {
    wavesurfer.play();
    getTime();
  });
  //sm

});

navigator.mediaSession.setActionHandler('previoustrack', function () {
  // play previous track works if there is a playlist
  loadprev();
  
});





// NEXT TRACK
function loadnext() {
  ChromeSamples.log('> User clicked "Next Track" icon.');
  index = (index + 1) % playlist.length;
  wavesurfer.load(playlist[index]);
}

wavesurfer.on('finish', function () {
  loadnext();
  wavesurfer.on('ready', function () {
    wavesurfer.play();
  });
  getTime();
});

$('body').on('click', '#loadnext', function () {
  loadnext();
  //Play after click next btn
  wavesurfer.on('ready', function () {
    wavesurfer.play();
  });
  getTime();
});

navigator.mediaSession.setActionHandler('nexttrack', function () {
  // play next track works if there is a playlist
  loadnext();
});

// SEEK BACKWARD
$('body').on('click', '#backward', function () {
  wavesurfer.skipBackward();
});

navigator.mediaSession.setActionHandler('seekbackward', function () {
  wavesurfer.skipBackward();
});

// SEEK FORWARD
$('body').on('click', '#forward', function () {
  wavesurfer.skipForward();
});

navigator.mediaSession.setActionHandler('seekforward', function () {
  wavesurfer.skipForward();
});

// UPDATE METADATA
/*
function updateMetadata() {
  var track = playlist[index];

  if (wavesurfer.isPlaying()) {
    ChromeSamples.log('Playing "' + track.title + '" track...');
    console.log('update play');
  } else {
    ChromeSamples.log('Pausing "' + track.title + '" track...');
    console.log('update pause');
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.artist,
    album: track.album,
    artwork: track.artwork
  });

}*/




// PLAYLIST
function getAwesomePlaylist() {
//var BASE_URL = 'https://storage.googleapis.com/media-session/';

  const allTrack = document.querySelectorAll('.wavethis');  

  const arrOfTracks = Array.from(allTrack).reduce((accum, item, g, f) => {
      //pish data attr to reduce accum
      accum.push(item.dataset.wave);
      return accum;
      }, []);
      return arrOfTracks;
}

//for load track to on click wavesurfer.load(playlist[index])


/*
function getAwesomePlaylist() {
  var BASE_URL = 'https://storage.googleapis.com/media-session/';

  return [{
    src: BASE_URL + 'sintel/snow-fight.mp3',
    title: 'Snow Fight',
    artist: 'Jan Morgenstern',
    album: 'Sintel',
    artwork: [{
        src: BASE_URL + 'sintel/artwork-96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'sintel/artwork-128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'sintel/artwork-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'sintel/artwork-256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'sintel/artwork-384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'sintel/artwork-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
    ]
  }, {
    src: BASE_URL + 'big-buck-bunny/prelude.mp3',
    title: 'Prelude',
    artist: 'Jan Morgenstern',
    album: 'Big Buck Bunny',
    artwork: [{
        src: BASE_URL + 'big-buck-bunny/artwork-96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'big-buck-bunny/artwork-128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'big-buck-bunny/artwork-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'big-buck-bunny/artwork-256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'big-buck-bunny/artwork-384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'big-buck-bunny/artwork-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
    ]
  }, {
    src: BASE_URL + 'elephants-dream/the-wires.mp3',
    title: 'The Wires',
    artist: 'Jan Morgenstern',
    album: 'Elephants Dream',
    artwork: [{
        src: BASE_URL + 'elephants-dream/artwork-96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'elephants-dream/artwork-128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'elephants-dream/artwork-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'elephants-dream/artwork-256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'elephants-dream/artwork-384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'elephants-dream/artwork-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
    ]
  }, {
    src: BASE_URL + 'caminandes/original-score.mp3',
    title: 'Original Score',
    artist: 'Jan Morgenstern',
    album: 'Caminandes 2: Gran Dillama',
    artwork: [{
        src: BASE_URL + 'caminandes/artwork-96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'caminandes/artwork-128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'caminandes/artwork-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'caminandes/artwork-256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'caminandes/artwork-384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: BASE_URL + 'caminandes/artwork-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
    ]
  }];
}
*/