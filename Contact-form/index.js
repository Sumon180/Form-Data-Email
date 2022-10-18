// let's get all requred elements

const form = document.querySelector("form"),
  statusText = form.querySelector(".button-area span");

form.onsubmit = (e) => {
  e.preventDefault(); //preventing form from submitting
  statusText.style.color = "#0d6efd";
  statusText.style.display = "block";

  let xhr = new XMLHttpRequest(); //Creating new xml object
  xhr.open("POST", "message.php", true); //sending post request to message.php file

  xhr.onload = () => {
    //once ajax loaded
    if (xhr.readyState == 4 && xhr.status == 200) {
      // if ajax responce status is 200 & ready status is 4 means there is no any error
      let response = xhr.response; // storing ajax response in a response variable
      //if response is en error like enter valid email address then we'll change status clor to red else reset the form
      if (
        response.indexOf("Email and password field is required!") != -1 ||
        response.indexOf("Enter a valid email address!!") ||
        response.indexOf("Sorry, failed to send your message!")
      ) {
        statusText.style.color = "red";
      } else {
        form.reset();
        setTimeout(() => {
          statusText.style.display = "none";
        }, 3000);
      }
      statusText.innerText = response;
    }
  };
  let formData = new FormData(form); //creating new formData obj. this obj is used to send form data

  xhr.send(formData); // sending form data
};
