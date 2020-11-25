var ChromeSamples = {
  log: function () {
    var line = Array.prototype.slice.call(arguments).map(function (argument) {
      return typeof argument === 'string' ? argument : JSON.stringify(argument);
    }).join(' ');

    document.querySelector('#log').textContent += line + '\n';
  },

  clearLog: function () {
    document.querySelector('#log').textContent = '';
  },

  setStatus: function (status) {
    document.querySelector('#status').textContent = status;
  },

  setContent: function (newContent) {
    var content = document.querySelector('#content');
    while (content.hasChildNodes()) {
      content.removeChild(content.lastChild);
    }
    content.appendChild(newContent);
  }
};


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
  waveColor: '#D2EDD4',
  progressColor: '#46B54D',
  minPxPerSec: 1
});


var playlist = getAwesomePlaylist();
console.log(playlist);
var index = 0;
console.log(index);
// LOAD FIRST TRACK
wavesurfer.load(playlist[index]);




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
});

navigator.mediaSession.setActionHandler('pause', function () {
  wavesurfer.playPause();
});
//set play
wavesurfer.on('play', function () {
  $('#playpause').html('<i class="fa fa-pause"></i> Pause');
});
//set pause
wavesurfer.on('pause', function () {
  $('#playpause').html('<i class="fa fa-play"></i> Play');
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
  });
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
});

$('body').on('click', '#loadnext', function () {
  loadnext();
  //Play after click next btn
  wavesurfer.on('ready', function () {
    wavesurfer.play();
  });
});

navigator.mediaSession.setActionHandler('nexttrack', function () {
  // play next track works if there is a playlist
  loadnext();
  console.log('loaded 2');
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

  const arr = ['./audio/After-Dark.mp3', './audio/Into-Nothing.mp3', './audio/London.mp3', './audio/The-Rose-of-Versailles.mp3'];

    const heroes = arr.reduce((accum, item, g, f) => {
      return f;
      }, []);
      console.log(heroes);
    return heroes;
//   return [
//   {
//     src: './audio/After-Dark.mp3',
//   }, {
//     src: './audio/Into-Nothing.mp3',
//   }, {
//     src: './audio/London.mp3',
//   }, {
//     src: './audio/The-Rose-of-Versailles.mp3',
//   }
// ];
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