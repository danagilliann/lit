# lit :fire:

## installing
```
cd node
npm install
mongod
npm start
```

# stuffies that didn't make it on devpost

## Inspiration
We wanted to created something bold, revolutionary, and relevant to today's time. Thus, we created Lit. Lit visualizes check-ins from Swarm using Twitter. Tldr, we get a public tweet that has checked-in on Swarm and used it to visualize their location. Using Lit, you get to see which country, which city, or which place, is truly lit. 

## What it does
It visualizes how lit a place is. The more lights a place is, the more lit it is. 

## How We built it
Our backend was built is using Node, Express, and Socket.io. We used Jade to render the templates. We also used the Twit Stream API to get public check-ins on Swarm, the Foursquare API to resolve the Swarm IDs we got from the Tweets, and the Google Maps API to visualize the check-ins. It's lit.

## Challenges I ran into
This was not lit. Our main issue was discovering that we could only view check-ins of our friends. However, we hacked around that by using check-ins which were publicly posted on Twitter. Another issue was using the Twit Stream API. It was not lit and difficult to use. This was also our first time using socket.io since we needed it to "stream" the (live) data to the front-end. It was challenging, and we asked the awesome [Abhi](https://abhi.co/) for help. He's a genius (duh). Another issue was Jade. We learned that it was extremely difficult and unintuitive to use, but we made it. Another challenge we ran into was the quota for Foursquare requests, but we made it work! #conquering #our #fear #so #lit

## Accomplishments that I'm proud of
Incorporating the technologies that were necessary. We had to use a lot of APIs (THREE!!), and trying to understand each of them was quite a challenge. Also rendering all of the live data to the front-end was quite difficult, but we did it after ~4 hours. (Again s/o to [Abhi](https://abhi.co/) )

## What I learned
Socket.io, Jade, more Node, more Express, APIs, Twitter API documentation is 😕, and the Foursquare peeps are 🔥

## What's next for Lit
Navigating to the most lit location! Also, we want to be able to access more data for increased possibility of finding the most lit space 🔥 

:fire:
