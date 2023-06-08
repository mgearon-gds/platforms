//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  function hideNotificationBanner() {
    var notificationBanner= document.querySelector('.govuk-insight');
    notificationBanner.style.display = 'none';

    var expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (60 * 60 * 1000));
    document.cookie = 'hideNotificationBanner=true; expires=' + expiryDate.toUTCString() + '; path=/';
  }

  function checkNotificationCookie() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i< cookies.length; i++){
      var cookie = cookies[i].trim();
      if (cookie.indexOf('hideNotificationBanner=true') === 0){
        hideNotificationBanner();
        break;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    checkNotificationCookie();
  });

  var linkElement = document.querySelector('#hide-insight');
  linkElement.addEventListener('click', function(event){
    event.preventDefault();
    hideNotificationBanner();
  });
})
