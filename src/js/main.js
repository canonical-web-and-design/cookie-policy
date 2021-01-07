import { Notification } from './notification.js';
import { Manager } from './manager.js';
import { preferenceNotSelected, hideSpecified } from './utils.js';

export const cookiePolicy = (callback = null) => {
  let cookiePolicyContainer = null;
  let language = document.documentElement.lang;

  const renderNotification = function (e) {
    if (e) {
      e.preventDefault();
    }

    if (cookiePolicyContainer === null) {
      cookiePolicyContainer = document.createElement('div');
      cookiePolicyContainer.classList.add('cookie-policy');
      document.body.classList.add('u-scroll-lock');
      document.body.appendChild(cookiePolicyContainer);
      const notifiation = new Notification(
        cookiePolicyContainer,
        renderManager,
        close
      );
      notifiation.render(language);
    }
  };

  const renderManager = function () {
    const manager = new Manager(cookiePolicyContainer, close);
    manager.render(language);
  };

  const close = function () {
    if (typeof callback === 'function') {
      callback();
    }
    document.body.removeChild(cookiePolicyContainer);
    document.body.classList.remove('u-scroll-lock');
    cookiePolicyContainer = null;
  };

  const init = function () {
    const revokeButton = document.querySelector('.js-revoke-cookie-manager');
    if (revokeButton) {
      revokeButton.addEventListener('click', renderNotification);
    }

    if (preferenceNotSelected() && !hideSpecified()) {
      renderNotification();
    }
  };

  document.addEventListener('DOMContentLoaded', init, false);
};
