class MultiStepForm {
  constructor(_formId) {
    this.form = document.getElementById(_formId);
    this.final = document.querySelector(".submit");
    this.goBack = document.querySelector(".go-back");
    this.pages = this.form.querySelectorAll(".form-page");
    this.maxPageCount = this.form.dataset.maxPageCount;
    this.prevButtons = this.form.querySelectorAll(".btn-prev");
    this.nextButtons = this.form.querySelectorAll(".btn-next");

    this.initializeButtons(this.prevButtons, this.nextButtons);
  }
  initializeButtons(prevButtons, nextButtons) {
    nextButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const currentpage = this.getCurrentPage();
        this.goToPage(currentpage + 1);
      });
    });

    prevButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const currentpage = this.getCurrentPage();
        this.goToPage(currentpage - 1);
      });
    });
  }

  getCurrentPage() {
    const currentPage = this.form.dataset.currentPage;
    return parseInt(currentPage);
  }

  goToPage(pageCount) {
    if (pageCount > this.maxPageCount || pageCount < 1) {
      this.showFinalPage();
      return;
    }
    this.pages.forEach((page) => {
      this.hidePage(page);
      const currentPage = parseInt(page.dataset.pageCount);
      currentPage === pageCount && this.showPage(page);
    });
    this.updateProgressbar(pageCount);
    this.form.dataset.currentPage = pageCount;
  }

  hidePage(page) {
    page.classList.contains("active") && page.classList.remove("active");
  }

  showPage(page) {
    !page.classList.contains("active") && page.classList.add("active");
  }
  updateProgressbar(pageCount) {
    const allSteps = this.form.querySelectorAll(".page-step");
    console.log(allSteps);
    allSteps.forEach((step) => {
      step.classList.contains("active") && step.classList.remove("active");
      const stepNumber = parseInt(step.dataset.stepNumber);
      if (stepNumber <= pageCount) {
        step.classList.add("active");
      }
    });
  }
  showFinalPage() {
    this.form.style.display = "none";
    this.final.style.display = "block";
    this.goBack.addEventListener("click", () => {
      this.form.dataset.currentPage = 1;
      this.form.style.display = "block";
      this.final.style.display = "none";
      this.goToPage(1);
    });
  }
}
new MultiStepForm("form-total");
