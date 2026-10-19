// /about "Our story": a long-form story in six chapters. Copy is word for word from the brief
// (curly apostrophes and quotes; the ellipses are kept as written).
// image: null renders the chapter as text only. position is the image's object-position in its
// 16/9 frame, chosen so no faces are cropped.
export interface StoryChapter {
  number: string;
  label: string;
  headline: string;
  paragraphs: string[];
  image: { src: string; alt: string; position: string } | null;
}

export const aboutStory: StoryChapter[] = [
  {
    number: "01",
    label: "WHERE IT ALL BEGAN",
    headline: "It all started with a slightly crazy idea.",
    paragraphs: [
      "It was 2021. The world had gone a bit mad, everyone was stuck at home, and Joe Wicks was getting half the country doing star jumps in their living rooms. And somewhere in the middle of all that, we started thinking... if you can get people excited about PE through a screen, why couldn’t we do something similar for education?",
      "So we got a few people together in Surbiton, put together a couple of entrepreneurship programmes and thought, why not give it a go? We didn’t have a big team, a fancy office or all the answers. But we did have a lot of belief in what we were trying to do. And looking back, that’s probably all we really needed to get started.",
    ],
    image: {
      src: "/images/about/story/01-waldegrave.webp",
      alt: "Two members of the 8billionideas team presenting the Waldegrave MBA programme to a school",
      // A little right of centre so both presenters fit in the 4/3 desktop frame.
      position: "58% 25%",
    },
  },
  {
    number: "02",
    label: "THE FIRST REACTIONS",
    headline: "Then something happened that none of us will forget.",
    paragraphs: [
      "We started taking little entrepreneurship programmes into schools, and honestly, the reaction completely blew us away. Students were getting stuck in, coming up with ideas, asking questions and showing a side of themselves that even their teachers hadn’t always seen before.",
      "But it was the parents that really got us. At the end of those first experiences, we’d have parents coming up to us, genuinely emotional about what their children had achieved. And we’d keep hearing the same question: “Why hasn’t anyone done this before?”",
      "That was the moment we knew we weren’t just putting on a fun day at school. We were doing something that actually mattered. And once we’d seen that, there was no way we were stopping.",
    ],
    image: {
      src: "/images/about/story/02-school-hall.webp",
      alt: "Secondary students working in groups in a school hall during an 8billionideas workshop",
      position: "center 60%",
    },
  },
  {
    number: "03",
    label: "THE BIGGER PICTURE",
    headline: "We realised one day just wasn’t enough.",
    paragraphs: [
      "There was just one problem. We’d go into a school, have the most incredible day with the students, see them absolutely buzzing with excitement... and then we’d leave. And that was it. We’d got them thinking differently, trying new things and believing in themselves, but what happened the next day? Or the week after that?",
      "The more we spoke to our schools, the more we realised we were only scratching the surface. They were telling us they needed more, and that we needed to start younger too. Why wait until secondary school to build confidence, creativity and all these other skills? Why not start right at the beginning and keep building on them as students grow up?",
      "So that’s exactly what we started doing. We went from a handful of entrepreneurship experiences to building lessons across careers, wellbeing and beyond, all the way from Year 1 to Year 13. It was a pretty big undertaking for our team, but the schools believed in it, we believed in it, and suddenly we were building something much bigger than we’d ever delivered before.",
    ],
    image: {
      src: "/images/about/story/03-team-selfie.webp",
      alt: "A member of the 8billionideas team taking a selfie with school staff in a corridor",
      position: "center 30%",
    },
  },
  {
    number: "04",
    label: "THE BIG LEAP",
    headline: "We were spending more time at Heathrow than at home.",
    paragraphs: [
      "Things were really starting to take off. Schools outside the UK were getting in touch, particularly from the Middle East, and before we knew it, some of us were becoming a little too familiar with Heathrow Terminal 5. Early flights, late nights, living out of suitcases... at one point, we probably knew the airport better than our own neighbourhoods.",
      "But we didn’t want to be one of those businesses that flies in, delivers something and disappears again. If we were going to work with schools on the other side of the world, we wanted to do it properly. We wanted to be there, understand the culture, get to know the people and become part of their school communities. So we made a pretty big decision. We packed our bags (again), took a bit of a leap of faith and opened an office in Dubai.",
      "Was it a big risk? Absolutely. But looking back, it’s one of the best decisions we’ve made. What started with three people on the ground has grown into a proper team, some brilliant school partnerships and a whole new part of the world that now feels like home. And as it turns out, Dubai has been a pretty wonderful place from which to keep exploring the rest of the world too.",
    ],
    image: {
      src: "/images/about/story/04-dubai.webp",
      alt: "The entrance to Dubai International Airport Terminal 3",
      position: "center 50%",
    },
  },
  {
    number: "05",
    label: "A BIG MILESTONE",
    headline: "Five years of hard work. And a pretty special moment.",
    paragraphs: [
      "If you’d told us back in those early days in Surbiton that we’d one day be helping schools deliver an internationally recognised qualification in Global Skills, we’d have been absolutely over the moon. The funny thing is, deep down, this was always what we were working towards. We just knew there was an awful lot to do before we could get there.",
      "Years of creating lessons, trying things out, getting things wrong, making them better, listening to teachers, listening to students, and occasionally going back to the drawing board. None of it happened overnight. And none of it would have happened without the schools and people who believed in us, stuck with us and helped shape what we were building.",
      "So when we became an official delivery partner for the OxfordAQA International GCSE Global Skills Project, it was a pretty emotional moment. Not because we’d suddenly finished what we set out to do, but because something we’d believed in for so long had taken another huge step forward. And knowing that students could now work towards a recognised qualification through the kind of learning we’re so passionate about? Well, that made all those years of hard work feel pretty special.",
    ],
    image: {
      src: "/images/about/story/05-aqa.webp",
      alt: "A member of the 8billionideas team shaking hands with a colleague at the AQA office",
      position: "center 25%",
    },
  },
  {
    number: "06",
    label: "THE NEXT CHAPTER",
    headline: "And the crazy thing? We’re only getting started.",
    paragraphs: [
      "When we look back at where we started, it’s hard not to smile. A few people in Surbiton, a couple of entrepreneurship programmes and an idea that seemed a little bit mad at the time. Fast-forward to today and we’re working with schools around the world, helping students learn things we wish we’d had the chance to learn when we were younger. And somehow, it still feels like we’ve barely scratched the surface.",
      "There are new countries we’re excited to explore, more lessons we’re itching to create and some really exciting conversations happening about where future-focused learning could go next. But we’ve never wanted to change education by standing on the sidelines telling schools what they should be doing. We want to be right there with them, listening, learning, trying things out and figuring out how we can make things better together.",
      "Because at the end of the day, this was never really about building a big business. It was about giving young people more opportunities, more confidence and more belief in what they’re capable of. And if we can keep doing that, alongside schools who care just as much as we do, then who knows where this little idea might take us next?",
    ],
    image: null,
  },
];
