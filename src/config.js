/**
 * ✨ CENTRAL CONFIGURATION — everything editable lives here.
 *
 * Edit the text, captions, photos, colors and audio in this one file
 * and the whole website updates. No need to touch any other file.
 */

const config = {
  /* ---------------------------------------------------------------
     FRIEND
     ---------------------------------------------------------------- */
  friend: {
    name: 'Yukti',
    doodleNickname: 'dost', // used in messages, e.g. "happy birthday, dost!"
  },

  /* ---------------------------------------------------------------
     2) OPENING SCREEN — "A Little Surprise"
     ---------------------------------------------------------------- */
  opening: {
    heading: 'HEY, YUKTI! 🎂',
    subheading: 'Someone made a little birthday surprise for you...',
    buttonLabel: 'Open Your Surprise ✨',
    cheekyCaption: 'Yep, someone actually put effort into this. 😂',
  },

  /* ---------------------------------------------------------------
     3) BIRTHDAY GREETING — "The Main Character Today"
     ---------------------------------------------------------------- */
  greeting: {
    heading: 'HAPPY BIRTHDAY, YUKTI! 🥳',
    subheading:
      "Today is officially your day. So enjoy the attention, eat something delicious, take a million selfies, and pretend you're not getting older. 😂🎂",
    // The first line is revealed with a gentle typewriter effect,
    // the rest appears when "Read the full message" is clicked.
    cardTeaser: 'Happy Birthday, Yukti! 💗',
    fullMessage: `I hope your day is filled with happiness, good food, unexpected surprises, and people who make you laugh until your stomach hurts.

May this new year of your life bring you amazing opportunities, new adventures, unforgettable memories, and lots of reasons to smile.

Keep being your awesome self, keep chasing your dreams, and never lose that little bit of craziness that makes life more interesting.

Wishing you the happiest birthday ever, dost! 🥳✨`,
    expandButtonLabel: 'Read the full message 💌',
  },

  /* ---------------------------------------------------------------
     4) PHOTO SCRAPBOOK — "A Few Captured Moments"
     FAQ: I don't have photos yet — what do I do?
     → Drop your photos into the `public/images/` folder and list them
       below. `src` is just the file name, e.g. "yukti-1.jpg".
     → If a photo is missing, a cute hand-drawn placeholder shows
       instead (stays broken-proof). You can have 1, 2 or up to 6.
     ---------------------------------------------------------------- */
  // Captions are playful and don't invent shared memories — edit freely!
  photos: [
    { src: '/images/yukti-1.jpg', alt: 'Yukti', caption: 'Main character energy ✨', rotation: -4, tapeColor: 'sky' },
    { src: '/images/yukti-2.jpg', alt: 'Yukti', caption: 'Proof that you exist outside your phone 😂', rotation: 3, tapeColor: 'butter' },
    { src: '/images/yukti-3.jpg', alt: 'Yukti', caption: 'Certified aesthetic 🌸', rotation: -2.5, tapeColor: 'pink' },
    { src: '/images/yukti-4.jpg', alt: 'Yukti', caption: 'Smile level: maximum ✨', rotation: 4.5, tapeColor: 'lavender' },
    { src: '/images/yukti-5.jpg', alt: 'Yukti', caption: 'Billboard worthy pose 😂', rotation: -3.5, tapeColor: 'butter' },
    { src: '/images/yukti-6.jpg', alt: 'Yukti', caption: 'Oops, photogenic again 😎', rotation: 2, tapeColor: 'sky' },
    { src: '/images/yukti-7.jpg', alt: 'Yukti', caption: 'Golden hour, golden girl 🌟', rotation: -4.5, tapeColor: 'pink' },
    { src: '/images/yukti-8.jpg', alt: 'Yukti', caption: 'Peak candid-ness ✨', rotation: 3.5, tapeColor: 'lavender' },
    { src: '/images/yukti-9.jpg', alt: 'Yukti', caption: 'One for the scrapbook 📷', rotation: -2, tapeColor: 'butter' },
  ],

  scrapbook: {
    heading: 'A Few Frames, A Few Memories 📷',
    subheading: 'Click any photo to see it up close. 📸',
  },

  /* ---------------------------------------------------------------
     5) THREE LITTLE NOTES — titles + messages, all editable
     ---------------------------------------------------------------- */
  notes: {
    heading: 'Three Little Notes for the Birthday Girl 📝',
    subheading: 'Tap each note to unfold it. All three are for you. 💌',
    items: [
      {
        id: 'reminder',
        sticker: '🌷', // emoji shown on the envelope
        preview: 'Open when you need a reminder...',
        title: 'A Little Birthday Reminder',
        message: `Just a small reminder that you're doing better than you think. Keep believing in yourself, enjoy the little things, and don't forget to celebrate your own progress. You deserve a really good year ahead!`,
      },
      {
        id: 'rules',
        sticker: '😂',
        preview: 'Very important information...',
        title: 'Official Birthday Rules',
        message: `Today's rules:

1. Cake is compulsory. No arguments.
2. Accept compliments without saying "it's nothing".
3. Take at least one good picture.
4. Ignore unnecessary stress for the day.
5. Enjoy yourself like the main character you are.

Failure to follow these rules may result in another birthday lecture from your friend. 😂`,
      },
      {
        id: 'last-wish',
        sticker: '🎂',
        preview: 'Okay, one last thing...',
        title: 'One Last Birthday Wish',
        message: `Jokes aside, I genuinely hope this year turns out to be a great one for you. May you achieve the things you're working towards, meet good people, explore new places, and make memories you'll laugh about for years.

Keep smiling, take care of yourself, and have an absolutely amazing birthday, Yukti! 🥳`,
      },
    ],
  },

  /* ---------------------------------------------------------------
     6) THE FINAL SURPRISE
     ---------------------------------------------------------------- */
  finalSurprise: {
    heading: "Wait... There's One More Thing 👀",
    subheading: 'Okay, last click. Promise. Probably.',
    buttonLabel: 'Click for Your Final Birthday Message 🎉',
    replayLabel: 'Replay the surprise 🔁',
    message: `YUKTI, YOUR NEXT CHAPTER STARTS NOW! ✨

More happiness. More adventures. More achievements. More laughter. And hopefully fewer reasons to stress.

Go make this year amazing, dost. Happy Birthday once again! 🥳🤝`,
  },

  /* ---------------------------------------------------------------
     8) RANDOM COMPLIMENT BUTTON — edit / add freely
     ---------------------------------------------------------------- */
  compliments: {
    buttonLabel: 'Give Me a Random Compliment 😂',
    heading: 'Since you deserve nice things...',
    list: [
      'Certified good-vibes provider ✨',
      'Main character, zero debate. 😎',
      'Officially one year more experienced at life. 😂',
      'A genuinely awesome friend. 🤝',
      'Spreading smiles like confetti. 🎊',
      'Level: expert at making people laugh. 😂',
      'Someone this year is very lucky to know you. 🌟',
      'Officially too cool for ordinary birthdays. 🕶️',
    ],
  },

  /* ---------------------------------------------------------------
     7) BACKGROUND MUSIC — OFF by default, plays only on click.
     → Drop a song file at `public/audio/birthday-song.mp3`
       (any name you like — just update `src` below).
     → If the file does not exist, the music button quietly hides.
     ---------------------------------------------------------------- */
  music: {
    enabled: true,                 // set to false to remove the music button entirely
    src: '/audio/birthday-song.mp3', // file inside public/
    title: 'birthday song',
  },

  /* ---------------------------------------------------------------
     PALETTE — soft pastel colors used across the site
     (these get injected as CSS variables, so you can re-theme
      everything by editing these hex values)
     ---------------------------------------------------------------- */
  palette: {
    lavender: '#c9b6ff',
    pink: '#ffd3e0',
    butter: '#ffefad',
    cream: '#fdf8f0',
    sky: '#bfe3ff',
    ink: '#4a3b5c',
  },
}

export default config
