const API_URL = "http://localhost:8080/api";
const gotDashBoardData = async () => {
  const gotData = await fetch(`${API_URL}/dashBoard`).then((result) =>
    result.json()
  );
  return gotData;
};
const insertDashBoardData = (dashBoardData) => {
  counters = [
    document.getElementById("per-project"),
    document.getElementById("total-projects"),
    document.getElementById("total-feedback"),
  ];
  const targets = [
    Number(dashBoardData.perProject),
    Number(dashBoardData.totalProjects),
    Number(dashBoardData.totalFeedback),
  ];
  counters.forEach((counter, i) => {
    counter.innerText = "0";
    const target = targets[i];
    const increment = target / 200;
    const updateCounter = () => {
      const c = +counter.innerText;

      if (c < target) {
        console.log(`c: ${c}, increment: ${increment}`);
        counter.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
  // document.getElementById("per-project").innerText = dashBoardData.perProject;
  // document.getElementById("total-projects").innerText =
  //   dashBoardData.totalProjects;
  // document.getElementById("total-feedback").innerText =
  //   dashBoardData.totalFeedback;
};
const firstRender = () => {
  document.getElementById("root").innerHTML = /* html */ `
    <div id = "wrapper">
      <div class="describe">
        등록된 프로젝트
        <div id = "total-projects"></div>
      </div>
      <div class="describe">
        피드백 갯수
        <div id = "total-feedback"></div>
      </div>    
      <div class="describe">
        Text
        <div id = "per-project"></div>
      </div>
    </div>
    `;
};
document.addEventListener("DOMContentLoaded", async () => {
  firstRender();
  const dashBoardData = await gotDashBoardData();
  insertDashBoardData(dashBoardData);
});
