// Sticky Header
$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $(".main_h").addClass("sticky");
  } else {
    $(".main_h").removeClass("sticky");
  }
});

// Mobile Navigation
$(".mobile-toggle").click(function () {
  if ($(".main_h").hasClass("open-nav")) {
    $(".main_h").removeClass("open-nav");
  } else {
    $(".main_h").addClass("open-nav");
  }
});

$(".main_h li a").click(function () {
  if ($(".main_h").hasClass("open-nav")) {
    $(".navigation").removeClass("open-nav");
    $(".main_h").removeClass("open-nav");
  }
});

// navigation scroll lijepo radi materem
$("nav a").click(function (event) {
  var id = $(this).attr("href");
  var offset = 70;
  var target = $(id).offset().top - offset;
  $("html, body").animate(
    {
      scrollTop: target,
    },
    500
  );
  event.preventDefault();
});


  // tabs
   const tabList = document.querySelector("[role='tablist']");
    const tabs = tabList.querySelectorAll("[role='tab']");
        

      tabList.addEventListener(`keydown`, tabSystem);

   tabs.forEach((t) => {
       t.addEventListener("click", changeContent)
   });

    let tabMe = 0;
        function tabSystem(s) {
             const left = 37;
              const right = 39; 
        
              // if the key is pushed change the tabindex from 0 to -1
              if (s.keyCode === left || s.keyCode === right) {
                  tabs[tabMe].setAttribute("tabindex", -1)
            }
            //  if the right key is pushed move to the next tab
              if (s.keyCode === right) {
                  tabMe++
                    if (tabMe >= tabs.length) {
                        tabMe = 0;
                    }
              }else
            //  if the left key is pushed move to the previous tab
            if (s.keyCode === left) {
               tabMe--;
               if (tabMe < 0) {
                tabMe = tabs.length - 1;
            }
              
            }
           tabs[tabMe].setAttribute("tabindex", 0)
              tabs[tabMe].focus();
          }


        function changeContent(s) {
          const targetTab = s.target;
            const target4 = targetTab.getAttribute(`aria-controls`);
              const target7 = targetTab.getAttribute("data-image")

              const targetParent = targetTab.parentNode;
                const targetContainer = targetParent.parentNode;
                
                targetParent.querySelector("[aria-selected = 'true']")
                    .setAttribute("aria-selected", false)

                    targetTab.setAttribute("aria-selected", true);

                    // console.log(targetContainer);
                      hideContent(targetContainer, '[role="tabpanel"]' )
                    showContent(targetContainer, [`#${target4}`])
                 
                     hideContent(targetContainer, "picture");
                     showContent(targetContainer, [`#${target7}`]);
          }

           function hideContent(s, e) {
              s.querySelectorAll(e).forEach((item) => {
              item.setAttribute("hidden", true)
          })
           }
             function showContent(s, e) {
             s.querySelector(e).removeAttribute('hidden');
             }

            //  
            const slideControllers = [
              ...document.getElementsByClassName("circle-controller"),
            ];
            const paragraphElement = document.getElementById("paragraph");

            const cardHeader = document.getElementById("card-header");
            const cardBody = document.getElementById("card-body");

            const persons = [
              {
                name: "Carl Bitting",
                job: "Engineer",
                paragraph:
                  "A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea.",
                image:
                  "https://images.unsplash.com/photo-1572561300743-2dd367ed0c9a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=50&w=300",
              },
              {
                name: "Charles Donahue",
                job: "Content Management",
                paragraph:
                  "Throughout the long history of horror movies, there have been memorable moments and iconic scenes that have made viewers' skin crawl and hearts pound. Many of these moments contain lines of dialogue that remain entrenched in the lore of horror movie history.",
                image:
                  "https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
              },
              {
                name: "Kristen Roles",
                job: "Graphic Designer",
                paragraph:
                  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
                image:
                  'https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"',
              },
            ];

            let activeSlide = 0; // Default

            loadApp();

            function loadApp() {
              persons.map(({ name, job, paragraph, image }, index) => {
                console.log(index);

                let cardImage = `
        <img src="${image}"
        class="card__image ${
          activeSlide !== index ? "disabled" : ""
        }" alt="Card image">
        `;

                let cardInfo = `<div class="card-info ${
                  activeSlide !== index ? "disabled" : ""
                }">
            <span class="card__title">${name}</span>
            <span class="card__subtitle">${job}</span>
        </div>
        `;

                cardHeader.innerHTML += cardImage + cardInfo;
              });

              paragraphElement.innerHTML = persons[activeSlide].paragraph;
            }

            slideControllers.map((control) => {
              control.addEventListener("click", openSlider);
            });

            function openSlider(e) {
              let tmp = e.target.getAttribute("data-id");
              if (activeSlide == tmp) {
                console.log("It's opened");
              } else {
                activeSlide = tmp;
                let nextSlide = tmp;

                [
                  ...document.getElementsByClassName("circle-controller"),
                ].forEach((a) => a.classList.remove("active"));
                e.target.classList.add("active");

                changeSlider(nextSlide);
              }
            }

            function changeSlider(next) {
              let id = next;
              let cardInfo = document.getElementsByClassName("card-info")[id];
              let cardImage =
                document.getElementsByClassName("card__image")[id];
              let others = [...document.getElementsByClassName("card-info")];
              let others2 = [...document.getElementsByClassName("card__image")];

              others = others.filter((e, i) => i != next);

              others.map((e) => {
                if (!e.classList.contains("disabled")) {
                  e.classList.add("closing");
                  setTimeout(() => {
                    e.classList.remove("closing");
                    e.classList.add("disabled");
                  }, 600);
                }
              });

              others2 = others2.filter((e, i) => i != next);

              others2.map((e) => {
                if (!e.classList.contains("disabled")) {
                  e.classList.add("closing");
                  setTimeout(() => {
                    e.classList.remove("closing");
                    e.classList.add("disabled");
                  }, 600);
                }
              });

              cardInfo.classList.remove("disabled");
              cardInfo.classList.add("opening");

              cardImage.classList.remove("disabled");
              cardImage.classList.add("opening");

              paragraphElement.textContent = persons[id].paragraph;

              setTimeout(() => {
                cardInfo.classList.remove("opening");
                cardImage.classList.remove("opening");
              }, 600);
            }