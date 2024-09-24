import { isChrome, tg } from "../components/Helper/Helper";

export const sendPopupNotification = (text, callback) => {
  try {
    if (isChrome) {
      alert(text);
      if (callback) {
        callback();
      }
    } else {
      const popupParams = {
        message: text,
        buttons: [{ type: "ok" }],
      };
      tg.showPopup(popupParams, (pressedButtonId) => {
        if (callback) {
          callback(pressedButtonId);
        }
      });
    }
  } catch (error) {
    console.error("Ошибка отправки попапа:", error);
  }
};

export const showAlertDialog = async (message) => {
  return new Promise((resolve) => {
    if (isChrome) {
      alert(message);
      resolve();
    } else {
      tg.showAlert(message, () => {
        resolve();
      });
    }
  });
};

export const showConfirmDialog = async (message) => {
  return new Promise((resolve) => {
    if (isChrome) {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm(message);
      resolve(result);
    } else {
      tg.showConfirm(message, (buttonClicked) => {
        resolve(buttonClicked);
      });
    }
  });
};
export const showCustomPopup = async (params) => {
  return new Promise((resolve) => {
    if (isChrome) {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm(params);
      resolve(result);
    } else {
      tg.showPopup(params, (buttonClicked) => {
        resolve(buttonClicked);
      });
    }
  });
};

export async function showInputDialog(message) {
  return new Promise((resolve) => {
    // Create the main elements
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "z-index: 150; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: start; justify-content: center;";

    const dialog = document.createElement("div");
    dialog.style.cssText =
      "background: white; padding: 20px; margin-top:20px; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.5); width: 300px;";

    const p = document.createElement("p");
    p.textContent = message;
    dialog.appendChild(p);

    const input = document.createElement("input");
    input.type = "text";
    input.style.cssText = "width: 100%; margin-top: 10px;";
    dialog.appendChild(input);

    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = "text-align: right; margin-top: 20px;";
    dialog.appendChild(buttonContainer);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.cssText = "margin-right: 10px;";
    cancelButton.onclick = function () {
      document.body.removeChild(overlay);
      resolve(null);
    };
    buttonContainer.appendChild(cancelButton);

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.onclick = function () {
      document.body.removeChild(overlay);
      resolve(input.value);
    };
    buttonContainer.appendChild(confirmButton);

    // Append dialog to overlay, then overlay to body
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    input.focus();
  });
}
