async function fetchTimeByIP() {
  try {
    const response = await fetch("http://worldtimeapi.org/api/ip");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const currentTime = document.getElementById("current-time");
    const currentMomentOfDay = document.getElementById("current-moment");
    const timeIcon = document.getElementById("time-icon");
    const backgroundImage = document.getElementById("background-image");

    const timeData = await response.json();
    const timeString = timeData.datetime.substring(11, 16); // Extraction de l'heure au format HH:MM
    const hour = timeData.datetime.substring(11, 13);

    currentTime.textContent = timeString;

    const timezone = document.getElementById("timezone");
    const dayYear = document.getElementById("day-year");
    const dayWeek = document.getElementById("day-week");
    const weekNumber = document.getElementById("week-number");

    timezone.textContent = timeData.timezone;
    dayYear.textContent = timeData.day_of_year;
    dayWeek.textContent = timeData.day_of_week;
    weekNumber.textContent = timeData.week_number;

    giveAccurateGreeting(hour, currentMomentOfDay);
    setFittingIcon(hour, timeIcon);
    setFittingBackground(hour, backgroundImage);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Appel de la fonction
fetchTimeByIP();

function fetchLocationByIP() {
  fetch("https://ipinfo.io/json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((locationData) => {
      const location = document.getElementById("location");

      location.textContent = `${locationData.city}, ${locationData.country}`;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Appel de la fonction
fetchLocationByIP();

function fetchRandomProgrammingQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((quoteData) => {
      const quote = document.getElementById("quote");
      const author = document.getElementById("author");
      displayQuote(quoteData.content, quote);
      displayAuthor(quoteData.authorSlug, author);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Appel de la fonction pour générer une citation aléatoire lors du chargement initial
fetchRandomProgrammingQuote();

giveAccurateGreeting = (time, momentOfDay) => {
  if (time >= 5 && time < 12) {
    momentOfDay.textContent = "Good morning";
  } else if (time >= 12 && time < 18) {
    momentOfDay.textContent = "Good afternoon";
  } else {
    momentOfDay.textContent = "Good evening";
  }
};

setFittingIcon = (time, fittingIcon) => {
  if (time >= 5 && time < 18) {
    fittingIcon.src = "./assets/desktop/icon-sun.svg";
  } else {
    fittingIcon.src = "./assets/desktop/icon-moon.svg";
  }
};

setFittingBackground = (time, fittingBackground) => {
  if (time >= 5 && time < 18) {
    fittingBackground.classList.remove("nighttime");
    fittingBackground.classList.add("daytime");
  } else {
    fittingBackground.classList.remove("daytime");
    fittingBackground.classList.add("nighttime");
  }
};

displayQuote = (quote, quoteContent) => {
  quoteContent.textContent = `"${quote}"`;
};

formatAuthorName = (name) => {
  const words = name.split("-");
  const formattedName = words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return formattedName;
};

displayAuthor = (author, authorContent) => {
  authorContent.textContent = formatAuthorName(author);
};

const refreshButton = document.getElementById("refresh-button");

refreshButton.addEventListener("click", function () {
  fetchRandomProgrammingQuote();
});

const expandButton = document.getElementById("expand-button");

expandButton.addEventListener("click", function () {
  const buttonValue = document.getElementById("button-value");
  const expandedContent = document.getElementById("expanded-content");
  const quoteContent = document.getElementById("quote-content");
  // Basculer la classe visible pour afficher ou masquer le contenu étendu
  expandedContent.classList.toggle("visible");
  quoteContent.classList.toggle("invisible");

  // Basculer la flèche du bouton
  toggleArrow(expandButton);

  // Basculer la valeur du bouton
  toggleButtonValue(buttonValue);
});

toggleArrow = (arrow) => {
  return arrow.src.includes("icon-arrow-down.svg")
    ? (arrow.src = "./assets/desktop/icon-arrow-up.svg")
    : (arrow.src = "./assets/desktop/icon-arrow-down.svg");
};

toggleButtonValue = (buttonText) => {
  return buttonText.textContent === "more"
    ? (buttonText.textContent = "less")
    : (buttonText.textContent = "more");
};

// toggleVisible = (moreContent, Content) => {
//   moreContent.classList.toggle("invisible");
//   Content.classList.toggle("invisible");
// };
