function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function navbarAnimation() {
  gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}

function videoconAnimation() {
  const videocon = document.querySelector("#video-container");
  const playbtn = document.querySelector("#play");
  
  videocon.addEventListener("mouseenter", () => {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  
  videocon.addEventListener("mouseleave", () => {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });
  
  document.addEventListener("mousemove", (dets) => {
    gsap.to(playbtn, {
      left: dets.x - 70,
      top: dets.y - 80,
    });
  });
}

function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5,
  });
}

function cursorAnimation() {
  const cursor = document.querySelector("#cursor");
  
  document.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      left: dets.x,
      top: dets.y,
    });
  });

  document.querySelectorAll(".child").forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    elem.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}

// Initialize all animations
function initializeAnimations() {
  locomotiveAnimation();
  navbarAnimation();
  videoconAnimation();
  loadinganimation();
  cursorAnimation();
}

// Run the initializer when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeAnimations);