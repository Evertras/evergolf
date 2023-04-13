import React from 'react';

const About = () => {
  return (
    <React.Fragment>
      <article>
        <h1>About Evergolf</h1>
        <h2 className="subtitle">A golf simulator for the rest of us</h2>
        <p>
          Games like Mario Golf and PGA Tour 2kwhateveritsupto are fun. But
          hitting those impossibly straight shots won't tell you a lot about
          course management in real golf.
        </p>

        <p>
          Evergolf aims to be a simple golf 'simulator' for actual average
          golfers. In Evergolf, you can play a round with your own shots with
          the aim of improving your course management skills. When should you
          lay up? When should you go for it? Is it really better to aim for the
          middle of the green, or go pin hunting?
        </p>

        <p>
          Additionally, you can tweak your shots to answer some interesting
          "what if" questions. What if you drove it 20 yards further? What if
          you bought a 7 wood? What if you could improve your short game to the
          level of a scratch golfer? Play with your own skills to understand
          what to target for real improvement to your actual game.
        </p>

        <p>
          Evergolf aims to use real statistics as much as possible. If you have
          any suggestions or discover anything that isn't working as you'd
          expect, take a look at{' '}
          <a href="https://github.com/Evertras/evergolf">
            the GitHub repository
          </a>{' '}
          and feel free to open an issue!
        </p>
      </article>
    </React.Fragment>
  );
};

export default About;
