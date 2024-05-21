function configureSockets(io, connection) {
    const participants = []; // initialize the array outside of the connection event
// Tableau de chapitres
const chapters = [];
const users= [];
const rooms = []
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');
  io.emit('user joined', 'Un utilisateur a rejoint le salon');

  let currentChapterIndex = 0;
       socket.on('setRoom', (room) => {
            if (!rooms.includes(room)) {
                rooms.push(room);
                chapters[room] = []; // Initialiser le tableau de chapitres pour cette room
            }
            console.log(rooms);
        });

        rooms.map((item) => {
            socket.on('chapitres' + item, (chapitres) => {
                console.log(chapitres);
                if (chapitres !== null) {
                    chapitres.forEach((chapitre) => {
                        chapters[item].push(chapitre); // Ajouter les chapitres à la room spécifique
                    });
                }
            });

            socket.on('nextChapter' + item, () => {
                if (currentChapterIndex < chapters[item].length - 1) {
                    currentChapterIndex++;
                    io.emit('updateChapter' + item, chapters[item][currentChapterIndex]);
                    console.log(chapters[item][currentChapterIndex]);
                }
            });

            socket.on('prevChapter' + item, () => {
                if (currentChapterIndex > 0) {
                    currentChapterIndex--;
                    io.emit('updateChapter' + item, chapters[item][currentChapterIndex]);
                }
            });
        });



 socket.on('setUser', (user) => {
    if (typeof user === 'object') {
        const userString = JSON.stringify(user);
        if (!users.some(u => JSON.stringify(u) === userString)) {
            users.push(user);
        }
        io.emit('updateUserList', users);
    } else {
        // Gérer le cas où 'user' n'est pas un objet
        console.log('L\'utilisateur doit être un objet');
    }
});

   socket.on('setLyric', (lyric) => {
    io.emit('getLyric', lyric);
  });
  

 /* socket.on('chapitres', (chapitres) => {
    if (chapitres!==null) {
         chapitres.map((chapitre)=>{
        chapters.push(chapitre)
    })
    }
  });
  socket.on('nextChapter', () => {
    if (currentChapterIndex < chapters.length - 1) {
      currentChapterIndex++;
      io.emit('updateChapter', chapters[currentChapterIndex]);
      console.log(chapters[currentChapterIndex])
    }
  });

  socket.on('prevChapter', () => {
    if (currentChapterIndex > 0) {
      currentChapterIndex--;
      io.emit('updateChapter', chapters[currentChapterIndex]);
    }
  });*/

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

}



module.exports = { configureSockets };
