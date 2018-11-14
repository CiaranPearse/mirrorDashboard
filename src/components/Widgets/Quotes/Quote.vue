<template>
  <div v-if="loading">
    <v-progress-circular
    indeterminate
    color="white"
    ></v-progress-circular><br />
    Loading Quotes
    </div>
  </div>
  <div v-else>
    <div v-if="edit">
      <h4>Configure Quotes</h4>
        <form @submit.prevent="onChangeQuotes">
        <v-radio-group v-model="quoteType">
          <v-radio label="Inspirational" value="inspire"></v-radio>
          <v-radio label="Drinking" value="beer"></v-radio>
        </v-radio-group>
        <v-radio-group v-model="timer">
          <v-radio label="10 Seconds" value="10000"></v-radio>
          <v-radio label="20 Seconds" value="20000"></v-radio>
        </v-radio-group>
          <v-btn color="red" @click="onCloseEdit" type="submit">Close</v-btn>
          <v-btn color="green" type="submit">Update Quotes</v-btn>
        </form>
    </div>
    <div v-else @click="onClickEdit" class="quotes">
      <div v-if="quoteType == 'inspire'">
        <p class="quote">{{ this.quotes.inspire[this.randomNumber].quote }}</p>
        <p class="author">{{ this.quotes.inspire[this.randomNumber].author }}</p> 
      </div>
      <div v-if="quoteType == 'beer'">
        <p class="quote">{{ this.quotes.beer[this.randomNumber].quote }}</p>
        <p class="author">{{ this.quotes.beer[this.randomNumber].author }}</p> 
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['quoted'],
  data () {
    return {
      loading: false,
      edit: false,
      randomNumber: 3,
      timer: 10000,
      quoteType: this.quoted.quoteSubject,
      quotes: {
        inspire: [
          {
            quote: 'Life isn\'t about getting and having, it\'s about giving and being.',
            author: 'Kevin Kruse'
          },
          {
            quote: 'Whatever the mind of man can conceive and believe, it can achieve.',
            author: 'Napoleon Hill'
          },
          {
            quote: 'Strive not to be a success, but rather to be of value.',
            author: 'Albert Einstein'
          },
          {
            quote: 'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
            author: 'Robert Frost'
          },
          {
            quote: 'I attribute my success to this: I never gave or took any excuse.',
            author: 'Florence Nightingale'
          },
          {
            quote: 'You miss 100% of the shots you don\'t take.',
            author: 'Wayne Gretzky'
          },
          {
            quote: 'The most difficult thing is the decision to act, the rest is merely tenacity.',
            author: 'Amelia Earhart'
          },
          {
            quote: 'Every strike brings me closer to the next home run.',
            author: 'Babe Ruth'
          },
          {
            quote: 'Definiteness of purpose is the starting point of all achievement.',
            author: 'W. Clement Stone'
          },
          {
            quote: 'We must balance conspicuous consumption with conscious capitalism.',
            author: 'Kevin Kruse'
          },
          {
            quote: 'Life is what happens to you while you\'re busy making other plans.',
            author: 'John Lennon'
          },
          {
            quote: 'We become what we think about.',
            author: 'Earl Nightingale'
          },
          {
            quote: '14.Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do, sohrow off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.',
            author: 'Mark Twain'
          },
          {
            quote: '15.Life is 10% what happens to me and 90% of how I react to it.',
            author: 'Charles Swindoll'
          },
          {
            quote: 'The most common way people give up their power is by thinking they don\'t have any.',
            author: 'Alice Walker'
          },
          {
            quote: 'The mind is everything. What you think you become.',
            author: 'Buddha'
          },
          {
            quote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
            author: 'Chinese Proverb'
          },
          {
            quote: 'An unexamined life is not worth living.',
            author: 'Socrates'
          },
          {
            quote: 'Eighty percent of success is showing up.',
            author: 'Woody Allen'
          },
          {
            quote: 'Your time is limited, so don\'t waste it living someone else\'s life.',
            author: 'Steve Jobs'
          },
          {
            quote: 'Winning isn\'t everything, but wanting to win is.',
            author: 'Vince Lombardi'
          },
          {
            quote: 'I am not a product of my circumstances. I am a product of my decisions.',
            author: 'Stephen Covey'
          },
          {
            quote: 'Every child is an artist.  The problem is how to remain an artist once he grows up.',
            author: 'Pablo Picasso'
          },
          {
            quote: 'You can never cross the ocean until you have the courage to lose sight of the shore.',
            author: 'Christopher Columbus'
          },
          {
            quote: 'Either you run the day, or the day runs you.',
            author: 'Jim Rohn'
          },
          {
            quote: 'Whether you think you can or you think you can\'t, you\'re right.',
            author: 'Henry Ford'
          },
          {
            quote: 'The two most important days in your life are the day you are born and the day you find out why.',
            author: 'Mark Twain'
          },
          {
            quote: 'Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it.',
            author: 'Johann Wolfgang von Goethe'
          },
          {
            quote: 'The best revenge is massive success.',
            author: 'Frank Sinatra'
          },
          {
            quote: 'People often say that motivation doesn\'t last. Well, neither does bathing.  That\'s why we recommend it daily.',
            author: 'Zig Ziglar'
          },
          {
            quote: 'Life shrinks or expands in proportion to one\'s courage.',
            author: 'Anais Nin'
          },
          {
            quote: 'If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.',
            author: 'Vincent Van Gogh'
          },
          {
            quote: 'There is only one way to avoid criticism: do nothing, say nothing, and be nothing.',
            author: 'Aristotle'
          },
          {
            quote: 'Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.',
            author: 'Jesus'
          },
          {
            quote: 'The only person you are destined to become is the person you decide to be.',
            author: 'Ralph Waldo Emerson'
          },
          {
            quote: 'Go confidently in the direction of your dreams.  Live the life you have imagined.',
            author: 'Henry David Thoreau'
          },
          {
            quote: 'Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.',
            author: 'Booker T. Washington'
          },
          {
            quote: 'Certain things catch your eye, but pursue only those that capture the heart.',
            author: ' Ancient Indian Proverb'
          },
          {
            quote: 'Believe you can and you\'re halfway there.',
            author: 'Theodore Roosevelt'
          },
          {
            quote: 'Everything you\'ve ever wanted is on the other side of fear.',
            author: 'George Addair'
          },
          {
            quote: 'We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.',
            author: 'Plato'
          },
          {
            quote: 'Teach thy tongue to say, “I do not know,” and thous shalt progress.',
            author: 'Maimonides'
          },
          {
            quote: 'Start where you are. Use what you have.  Do what you can.',
            author: 'Arthur Ashe'
          },
          {
            quote: 'How wonderful it is that nobody need wait a single moment before starting to improve the world.',
            author: 'Anne Frank'
          },
          {
            quote: 'When I let go of what I am, I become what I might be.',
            author: 'Lao Tzu'
          },
          {
            quote: 'Life is not measured by the number of breaths we take, but by the moments that take our breath away.',
            author: 'Maya Angelou'
          },
          {
            quote: 'Happiness is not something readymade.  It comes from your own actions.',
            author: 'Dalai Lama'
          },
          {
            quote: 'If you\'re offered a seat on a rocket ship, don\'t ask what seat! Just get on.',
            author: 'Sheryl Sandberg'
          },
          {
            quote: 'If the wind will not serve, take to the oars.',
            author: 'Latin Proverb'
          },
          {
            quote: 'You can\'t fall if you don\'t climb.  But there\'s no joy in living your whole life on the ground.',
            author: 'Unknown'
          },
          {
            quote: 'We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.',
            author: 'Marie Curie'
          },
          {
            quote: 'Too many of us are not living our dreams because we are living our fears.',
            author: 'Les Brown'
          },
          {
            quote: 'Challenges are what make life interesting and overcoming them is what makes life meaningful.',
            author: 'Joshua J. Marine'
          },
          {
            quote: 'If you want to lift yourself up, lift up someone else.',
            author: 'Booker T. Washington'
          },
          {
            quote: 'I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we musto.',
            author: 'Leonardo da Vinci'
          },
          {
            quote: 'Limitations live only in our minds.  But if we use our imaginations, our possibilities become limitless.',
            author: 'Jamie Paolinetti'
          },
          {
            quote: 'You take your life in your own hands, and what happens? A terrible thing, no one to blame.',
            author: 'Erica Jong'
          },
          {
            quote: 'What\'s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants too.',
            author: 'Bob Dylan'
          },
          {
            quote: 'I didn\'t fail the test. I just found 100 ways to do it wrong.',
            author: 'Benjamin Franklin'
          },
          {
            quote: 'In order to succeed, your desire for success should be greater than your fear of failure.',
            author: 'Bill Cosby'
          },
          {
            quote: 'A person who never made a mistake never tried anything new.',
            author: ' Albert Einstein'
          },
          {
            quote: 'The person who says it cannot be done should not interrupt the person who is doing it.',
            author: 'Chinese Proverb'
          },
          {
            quote: 'There are no traffic jams along the extra mile.',
            author: 'Roger Staubach'
          },
          {
            quote: 'It is never too late to be what you might have been.',
            author: 'George Eliot'
          },
          {
            quote: 'You become what you believe.',
            author: 'Oprah Winfrey'
          },
          {
            quote: 'I would rather die of passion than of boredom.',
            author: 'Vincent van Gogh'
          },
          {
            quote: 'A truly rich man is one whose children run into his arms when his hands are empty.',
            author: 'Unknown'
          },
          {
            quote: 'Build your own dreams, or someone else will hire you to build theirs.',
            author: 'Farrah Gray'
          },
          {
            quote: 'I have learned over the years that when one\'s mind is made up, this diminishes fear.',
            author: 'Rosa Parks'
          },
          {
            quote: 'It does not matter how slowly you go as long as you do not stop.',
            author: 'Confucius'
          },
          {
            quote: 'If you look at what you have in life, you\'ll always have more. If you look at what you don\'t have in life, you\'ll neverave enough.',
            author: 'Oprah Winfrey'
          },
          {
            quote: 'Remember that not getting what you want is sometimes a wonderful stroke of luck.',
            author: 'Dalai Lama'
          },
          {
            quote: 'You can\'t use up creativity.  The more you use, the more you have.',
            author: 'Maya Angelou'
          },
          {
            quote: 'Dream big and dare to fail.',
            author: 'Norman Vaughan'
          },
          {
            quote: 'Our lives begin to end the day we become silent about things that matter.',
            author: 'Martin Luther King Jr.'
          },
          {
            quote: 'Do what you can, where you are, with what you have.',
            author: 'Teddy Roosevelt'
          },
          {
            quote: 'If you do what you\'ve always done, you\'ll get what you\'ve always gotten.',
            author: 'Tony Robbins'
          },
          {
            quote: 'Dreaming, after all, is a form of planning.',
            author: 'Gloria Steinem'
          },
          {
            quote: 'It\'s your place in the world; it\'s your life. Go on and do all you can with it, and make it the life you want to live.',
            author: 'Mae Jemison'
          },
          {
            quote: 'You may be disappointed if you fail, but you are doomed if you don\'t try.',
            author: 'Beverly Sills'
          },
          {
            quote: 'Remember no one can make you feel inferior without your consent.',
            author: 'Eleanor Roosevelt'
          },
          {
            quote: 'Life is what we make it, always has been, always will be.',
            author: 'Grandma Moses'
          },
          {
            quote: 'The question isn\'t who is going to let me; it\'s who is going to stop me.',
            author: 'Ayn Rand'
          },
          {
            quote: 'When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.',
            author: 'Henry Ford'
          },
          {
            quote: 'It\'s not the years in your life that count. It\'s the life in your years.',
            author: 'Abraham Lincoln'
          },
          {
            quote: 'Change your thoughts and you change your world.',
            author: 'Norman Vincent Peale'
          },
          {
            quote: 'Either write something worth reading or do something worth writing.',
            author: 'Benjamin Franklin'
          },
          {
            quote: 'Nothing is impossible, the word itself says, “I\'m possible!”',
            author: '–Audrey Hepburn'
          },
          {
            quote: 'The only way to do great work is to love what you do.',
            author: 'Steve Jobs'
          },
          {
            quote: 'If you can dream it, you can achieve it.',
            author: 'Zig Ziglar'
          }
        ],
        beer: [
          {
            quote: 'The problem with some people is that when they aren\'t drunk they\'re sober.',
            author: 'William Butler Yeats'
          },
          {
            quote: 'Reality is an illusion that occurs due to lack of alcohol.',
            author: 'Anonymous'
          },
          {
            quote: 'When I read about the evils of drinking I gave up reading.',
            author: 'Henny Youngman'
          },
          {
            quote: '24 hours in a day. 24 beers in a case. Coincidence? I think not.',
            author: 'H.L. Mencken'
          },
          {
            quote: 'Alcohol is the anesthesia by which we endure the operation of life.',
            author: 'George Bernard Shaw'
          },
          {
            quote: 'Alcohol removes inhibitions - like that scared little mouse who got drunk and shook his whiskers and shouted: "Now bring onhat damn cat!"',
            author: 'Eleanor Early'
          },
          {
            quote: 'Alcohol is necessary for a man so that he can have a good opinion of himself, undisturbed be the facts.',
            author: 'Finley Peter Dunne'
          },
          {
            quote: 'What contemptible scoundrel has stolen the cork to my lunch?',
            author: 'W.C. Fields'
          },
          {
            quote: 'To some it\'s a six-pack. To me it\'s a Support Group.',
            author: 'Leo Durocher'
          },
          {
            quote: 'Always remember that I have taken more out of alcohol than alcohol has taken out of me.',
            author: 'Winston Churchill'
          },
          {
            quote: 'Without question the greatest invention in the history of mankind is beer. Oh, I grant you that the wheel was also a finenvention but the wheel does not go nearly as well with pizza.',
            author: 'Dave Barry'
          },
          {
            quote: 'I never drink water because of the disgusting things that fish do in it.',
            author: 'W.C. Fields'
          },
          {
            quote: 'The problem with the world is that everyone is a few drinks behind.',
            author: 'Humphrey Bogart'
          },
          {
            quote: 'Not all chemicals are bad. Without chemicals such as hydrogen and oxygen, for example, there would be no way to make water, aital ingredient in beer.',
            author: 'Dave Barry'
          },
          {
            quote: 'Work is the curse of the drinking classes.',
            author: 'Oscar Wilde'
          },
          {
            quote: 'He was a wise man who invented beer.',
            author: 'Plato'
          },
          {
            quote: 'Remember \'I\' before \'E\', except in Budweiser.',
            author: 'Professor Irwin Corey'
          },
          {
            quote: 'When I read about the evils of drinking, I gave up reading.',
            author: 'Henny Youngman'
          },
          {
            quote: 'You\'re not drunk if you can lie on the floor without holding on.',
            author: 'Dean Martin'
          },
          {
            quote: 'And God said, "Let there be vodka!" And He saw that it was good. Then God said, "Let there be light!" And then He said, Whoa - too much light".',
            author: 'Anonymous'
          },
          {
            quote: 'I am a firm believer in the people. If given the truth, they can be depended upon to meet any national crisis. The great points to bring them the real facts, and beer.',
            author: 'Abraham Lincoln'
          },
          {
            quote: 'A woman drove me to drink and I didn\'t even have the decency to thank her.',
            author: 'W.C. Fields'
          },
          {
            quote: 'There\'s too much blood in my alcohol system.',
            author: 'Anonymous'
          },
          {
            quote: 'I drink to make other people more interesting.',
            author: 'Ernest Hemingway'
          },
          {
            quote: 'It takes only one drink to get me drunk.....the trouble is, I can\'t remember if it\'s the thirteenth or the fourteenth.',
            author: 'George Burns'
          },
          {
            quote: 'A lady came up to me one day and said \'Sir! You are drunk\', to which I replied \'I am drunk today madam, and tomorrow Ihall be sober but you will still be ugly\'.',
            author: 'Winston S. Churchill'
          },
          {
            quote: 'I cook with wine, sometimes I even add it to the food.',
            author: 'W.C. Fields'
          },
          {
            quote: 'I like to have a martini, Two at the very most. After three I\'m under the table, after four I\'m under my host.',
            author: 'Dorothy Parker'
          },
          {
            quote: 'Always do sober what you said you\'d do drunk. That will teach you to keep your mouth shut.',
            author: 'Ernest Hemingway'
          },
          {
            quote: 'Abstainer: a weak person who yields to the temptation of denying himself a pleasure.',
            author: 'Amrose Bierce'
          },
          {
            quote: 'Electricity is actually made up of extremely tiny particles called electrons, that you cannot see with the naked eye unlessou have been drinking.',
            author: 'Dave Barry'
          },
          {
            quote: 'The hard part about being a bartender is figuring out who is drunk and who is just stupid.',
            author: 'Richard Braunstein'
          },
          {
            quote: 'Beer is proof that God loves us and wants us to be happy.',
            author: 'Benjamin Franklin'
          },
          {
            quote: 'In wine there is wisdom, in beer there is Freedom, in water there is bacteria.',
            author: 'Benjamin Franklin'
          },
          {
            quote: 'Scotch: Because one doesn\'t solve the world\'s problems over white wine.',
            author: 'Anonymous'
          },
          {
            quote: 'Here\'s to alcohol, the rose colored glasses of life.',
            author: 'F. Scott Fitzgerald'
          },
          {
            quote: 'Pretty women make us BUY beer. Ugly women make us DRINK beer.',
            author: 'Al Bundy'
          },
          {
            quote: 'Oh, you hate your job? Why didn\'t you say so? There\'s a support group for that. It\'s called EVERYBODY, and they meet at thear.',
            author: 'Drew Carey'
          },
          {
            quote: 'I went out with a guy who once told me I didn\'t need to drink to make myself more fun to be around. I told him, I\'m drinkingo that you\'re more fun to be around.',
            author: 'Chelsea Handler'
          },
          {
            quote: 'My friends speak of my drinking.... but they know not of my thirst',
            author: 'Anonymous'
          },
          {
            quote: 'Alcohol may be man\'s worst enemy, but the bible says love your enemy.',
            author: 'Frank Sinatra'
          },
          {
            quote: 'An intelligent man is sometimes forced to be drunk to spend time with his fools.',
            author: 'Ernest Hemingway'
          },
          {
            quote: 'Everybody\'s got to believe in something. I believe I\'ll have another beer.',
            author: 'W.C. Fields'
          },
          {
            quote: 'Only Irish coffee provides in a single glass all four essential food groups: alcohol, caffeine, sugar and fat.',
            author: 'Alex Levin'
          },
          {
            quote: 'Here\'s to alcohol, the cause of — and solution to — all life\'s problems.',
            author: 'Homer Simpson'
          },
          {
            quote: 'I\'d rather have a bottle in front of me than a frontal lobotomy.',
            author: 'Dorothy Parker'
          },
          {
            quote: 'I would rather have a free bottle in front of me than a pre-frontal lobotomy',
            author: 'Dean Martin'
          },
          {
            quote: 'The problem with the designated driver program, it\'s not a desirable job, but if you ever get sucked into doing it, have funith it. At the end of the night, drop them off at the wrong house.',
            author: 'Jeff Foxworthy'
          },
          {
            quote: 'Fell in love with a beautiful blonde once. Drove me to drink. And I never had the decency to thank her.',
            author: 'W.C. Fields'
          },
          {
            quote: 'I always take Scotch whiskey at night as a preventive of toothache. I have never had the toothache; and what is more, I neverntend to have it.',
            author: 'Mark Twain'
          },
          {
            quote: 'If I had to live my life over, I\'d live over a saloon.',
            author: 'W.C. Fields'
          },
          {
            quote: 'The only way that I could figure they could improve upon Coca-Cola, one of life\'s most delightful elixirs, which studiesrove will heal the sick and occasionally raise the dead, is to put bourbon in it.',
            author: 'Lewis Grizzard'
          },
          {
            quote: 'All right, brain. You don\'t like me and I don\'t like you, but let\'s just do this and I can get back to killing you witheer.',
            author: 'Homer Simpson'
          }
        ]
      }
    }
  },
  mounted () {
    this.$options.interval = setInterval(this.changedNumber, this.timer)
    this.quoteType = this.quoted.quoteSubject
    this.timer = this.quoted.quoteTimer
    this.loading = false
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  },
  methods: {
    changedNumber () {
      var ticker = Math.floor(Math.random() * 10) + 1
      this.randomNumber = ticker
    },
    onClickEdit () {
      this.edit = true
    },
    onCloseEdit () {
      this.edit = false
    },
    onChangeQuotes (payload) {
      this.$emit('updateQuotes', this.consolidated)
      this.edit = false
    }
  },
  computed: {
    consolidated () {
      return {
        quoteSubject: this.quoteType,
        quoteTimer: this.timer
      }
    }
  }
}
</script>

<style>
.quotes{
  margin-top: -10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  color: #ffffff;
  text-align: center;
}

.quote{
  font-size: 20px;
  margin: 0px;
}
.author{
  font-size: 14px;
  margin: 0px;
}
</style>
