let photo_list = [
  "https://cdn.pixabay.com/photo/2021/12/12/22/17/red-squirrel-6867105_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/11/16/08/01/animal-6800387_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/12/10/19/17/prague-6861273_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/12/12/20/26/flow-6866055_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/05/01/16/42/palacio-nacional-de-mafra-5118010_960_720.jpg",
  "https://cdn.pixabay.com/photo/2021/12/09/22/17/table-setting-6859274_960_720.jpg",
];

let new_img = [];

window.addEventListener("load", () => {
  let main_img = document.getElementById("main_img");
  main_img.src = photo_list[0];

  let img_list = document.getElementById("img_list");
  let img_num;

  if (photo_list.length <= 5) {
    img_num = photo_list.length;
  } else {
    img_num = 5;
  }

  for (let i = 0; i < img_num; i++) {
    new_img[i] = document.createElement("img");
    new_img[i].src = photo_list[i];
    new_img[i].onclick = () => {
      main_img.src = new_img[i].src;
    };
    img_list.appendChild(new_img[i]);
  }

  let button_left = document.getElementById("photo_left_button");
  let button_right = document.getElementById("photo_right_button");

  button_left.disabled = true;

  if (photo_list.length <= 5) {
    button_right.disabled = true;
  } else {
    button_right.disabled = false;
  }

  let left_index = 0;
  let right_index = img_num - 1;

  button_left.addEventListener("click", () => {
    left_index--;
    right_index--;

    for (let i = 0; i < img_num; i++) {
      new_img[i].src = photo_list[i + left_index];
    }

    if (left_index === 0) {
      button_left.disabled = true;
    }

    button_right.disabled = false;
  });

  button_right.addEventListener("click", () => {
    left_index++;
    right_index++;

    for (let i = 0; i < img_num; i++) {
      new_img[i].src = photo_list[i + left_index];
    }

    if (right_index === photo_list.length - 1) {
      button_right.disabled = true;
    }

    button_left.disabled = false;
  });
});
