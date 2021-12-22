import { stateObject } from "./stateObject.js";

export const onChangeUpload = async () => {
  const uploadBtn = document.querySelector(".upload-button-hidden");
  let filesLength = uploadBtn.files.length;
  if (filesLength > 3) {
    alert("사진은 최대 3개까지만 가능합니다");
    filesLength = 3;
  }

  const targetElement = document.querySelector(".image-preview");
  const newPromise = async (file) => {
    return new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
      } catch (err) {
        reject(err);
      }
    });
  };

  for (let i = 0; i < filesLength; i++) {
    stateObject.thumbnails.push(await newPromise(uploadBtn.files[i]));
    stateObject.postThumbnailsData.push(uploadBtn.files[i]);
  }
  targetElement.innerHTML = "";
  stateObject.thumbnails.forEach((v, i) => {
    targetElement.innerHTML += /* html */ `
      <div>
        <img src=${v} alt="${v}" class="thumbnail-image" />
        <input type="button" class="thumbnail-delete" value="삭제하기" />
      </div>
      `;
  });
  targetElement.style.border = "1px var(--border) solid";

  document.querySelectorAll(".thumbnail-delete").forEach((v) => {
    v.addEventListener("click", (e) => {
      const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
        e.target.parentNode
      );
      stateObject.thumbnails.splice(index, 1);
      stateObject.postThumbnailsData.splice(index, 1);
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);

      if (index === 0) {
        targetElement.style.border = "none";
      }
    });
  });
  uploadBtn.value = "";
};
