export const inputAnimation = props => {
  document.querySelectorAll(".input-animated").forEach(input =>
    input.addEventListener("focus", () => {
      const label = input.previousSibling;
      label.style.transform = "translate(4%, 50%) scale(0.8)";
      label.style.color = "#80bdff";
    })
  );
  document.querySelectorAll(".input-animated").forEach(input =>
    input.addEventListener("blur", () => {
      const label = input.previousSibling;
      label.style.color = "#cdd6e2";
      if (input.value === "") {
        label.style.fontSize = "1.2rem";
        label.style.transform = "translate(4%, 150%) scale(1)";
      }
    })
  );
  document.querySelectorAll(".textarea-animated").forEach(textarea =>
    textarea.addEventListener("focus", () => {
      const label = textarea.previousSibling;
      label.style.transform = "translate(4%, 50%) scale(0.8)";
      label.style.color = "#80bdff";
    })
  );
  document.querySelectorAll(".textarea-animated").forEach(textarea =>
    textarea.addEventListener("blur", () => {
      const label = textarea.previousSibling;
      label.style.color = "#cdd6e2";
      if (textarea.value === "") {
        label.style.fontSize = "1.2rem";
        label.style.transform = "translate(4%, 150%) scale(1)";
      }
    })
  );
};

const elements = [];

window.addEventListener("resize scroll", () => {
  elements.forEach(element => {
    if (isInViewport(element)) {
      Animation(elements);
    }
  });
});

const optionsVal = {
  distance: "20",
  origin: "bottom",
  time: 1,
  delay: 1000
};

export class ScrollReveal {
  reveal = (element, options = optionsVal) => {
    this.element = document.querySelector(`${element}`);
    this.options = options;

    elements.push(element);

    this.element.style.transition = `all 0s`;
    this.element.style.visibility = "hidden";
    this.element.style.opacity = "0";

    switch (this.options.origin) {
      case "bottom":
        this.element.style.transform = `translateY(${this.options.distance}px)`;
        break;
      case "top":
        this.element.style.transform = `translateY(${this.options.distance}px)`;
        break;
      case "left":
        this.element.style.transform = `translateX(-${this.options.distance}px)`;
        break;
      case "right":
        this.element.style.transform = `translateX(${this.options.distance}px)`;
        break;
      default:
        break;
    }

    this.element.style.transition = `all ${this.options.time}s ease-in-out`;

    if (isInViewport(this.element)) {
      setTimeout(() => {
        switch (this.options.origin) {
          case "bottom":
            this.element.style.transform = `translateY(0)`;
            this.element.style.visibility = "visible";
            this.element.style.opacity = "1";
            break;
          case "top":
            this.element.style.transform = `translateY(0)`;
            this.element.style.visibility = "visible";
            this.element.style.opacity = "1";
            break;
          case "left":
            this.element.style.transform = `translateX(0)`;
            this.element.style.visibility = "visible";
            this.element.style.opacity = "1";
            break;
          case "right":
            this.element.style.transform = `translateX(0)`;
            this.element.style.visibility = "visible";
            this.element.style.opacity = "1";
            break;
          default:
            break;
        }
      }, this.options.delay);
    }
  };
}

const isInViewport = function(elem) {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
