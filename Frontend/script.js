const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', ()=>{
   //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});

// Safety & Prevention
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));





// Form Validation Sign In

function validateSignin(){

    var email=document.signin.email.value;  
    var atposition=email.indexOf("@");  
    var dotposition=email.lastIndexOf(".");  
    var password=document.signin.password.value;
    
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
      alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
    }
    else if(password.length<6){  
      alert("Password must be at least 6 characters long.");  
      return false;  
      }  
    } 