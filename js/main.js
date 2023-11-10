window.addEventListener("DOMContentLoaded", () => {
  const starRating = new StarRating(".rating")

  document.getElementById("defaultOpen").click()
})

class StarRating {
  constructor(qs) {
    this.ratings = [
      { id: 1, name: "Terrible" },
      { id: 2, name: "Bad" },
      { id: 3, name: "OK" },
      { id: 4, name: "Good" },
      { id: 5, name: "Excellent" },
    ]
    this.rating = null
    this.el = document.querySelector(qs)

    this.init()
  }
  init() {
    this.el?.addEventListener("change", this.updateRating.bind(this))

    try {
      this.el?.reset()
    } catch (err) {
      console.error("Element isn’t a form.")
    }
  }
  updateRating(e) {
    Array.from(this.el.querySelectorAll(`[for*="rating"]`)).forEach((el) => {
      el.className = "rating-label"
    })

    const ratingObject = this.ratings.find((r) => r.id === +e.target.value)
    const prevRatingID = this.rating?.id || 0

    let delay = 0
    this.rating = ratingObject
    
    console.log(this.rating)

    this.ratings.forEach((rating) => {
      const { id } = rating

      const ratingLabel = this.el.querySelector(`[for="rating-${id}"]`)

      if (id > prevRatingID + 1 && id <= this.rating.id) {
        ++delay
        ratingLabel.classList.add(`rating-label-delay${delay}`)
      }

      const ratingTextEl = this.el.querySelector(`[data-rating="${id}"]`)

      if (this.rating.id !== id) ratingTextEl.setAttribute("hidden", true)
      else ratingTextEl.removeAttribute("hidden")
    })
  }
}

function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}