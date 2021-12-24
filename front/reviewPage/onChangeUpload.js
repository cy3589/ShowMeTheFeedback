import { newStateObject as stateObject } from "./editProject.js";

export const onChangeUpload = async () => {
  const uploadBtn = document.querySelector(".upload-button-hidden");
  let filesLength = uploadBtn.files.length;
  if (filesLength + stateObject.previewThumbnails > 3) {
    alert("사진은 최대 3개까지만 가능합니다");
    filesLength = 3 - stateObject.previewThumbnails;
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
    stateObject.previewThumbnails.push(await newPromise(uploadBtn.files[i]));
    stateObject.additionalThumbnails.push(uploadBtn.files[i]);
  }
  targetElement.innerHTML = "";
  stateObject.previewThumbnails.forEach((v, i) => {
    console.log(i);
    console.log(
      "stateObject.currentThumbnails.length: ",
      stateObject.currentThumbnails.length
    );
    console.log(
      "stateObject.additionalThumbnails.length: ",
      stateObject.additionalThumbnails.length
    );
    // 2,1,3
    if (i < stateObject.currentThumbnails.length) {
      targetElement.innerHTML += /* html */ `
      <div>
        <img src=${v} alt="${v}" class="thumbnail-image current-image" />
        <input type="button" class="thumbnail-delete" value="삭제하기" />
      </div>
      `;
    } else {
      targetElement.innerHTML += /* html */ `
      <div>
        <img src=${v} alt="${v}" class="thumbnail-image additional-image" />
        <input type="button" class="thumbnail-delete" value="삭제하기" />
      </div>
      `;
    }
  });
  document.querySelectorAll(".thumbnail-delete").forEach((v) =>
    v.addEventListener("click", (e) => {
      const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
        e.target.parentNode
      );
      console.log("@@@@@@");
      // console.log(Array.from(document.querySelectorAll(".additional-image")));
      console.log(
        Array.from(document.querySelectorAll(".current-image")).indexOf(
          e.target.parentNode.children[0]
        )
      );
      console.log("@@@@@@");
      const additionalImageIndex = Array.from(
        document.querySelectorAll(".additional-image")
      ).indexOf(e.target.parentNode.children[0]);
      const currentImageIndex = Array.from(
        document.querySelectorAll(".current-image")
      ).indexOf(e.target.parentNode.children[0]);
      // console.log(e.target.parentNode.parentNode);
      console.log(e.target.parentNode.children[0]);
      console.log("additionalImageIndex: ", additionalImageIndex);
      console.log("currentImageIndex: ", currentImageIndex);
      if (additionalImageIndex !== -1) {
        stateObject.additionalThumbnails.splice(additionalImageIndex, 1);
      }
      if (currentImageIndex !== -1) {
        stateObject.currentThumbnails.splice(currentImageIndex, 1);
      }
      stateObject.previewThumbnails.splice(index, 1);
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    })
  );
  uploadBtn.value = "";
};
