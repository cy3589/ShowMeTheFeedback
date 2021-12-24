export const editProjectForm = /* html */ `
    <button class="edit-cancel-button">취소</button>
    <div class="container">
    <form
      class="create-project-form"
      style="display: flex; flex-direction: column"
    >
      <div class="team-name" style="display: flex">
        <div class="check-icon"></div>
        <input
          type="text"
          name="team-name"
          class="team-name"
          placeholder="팀명"
        />
      </div>
      <div class="project-name" style="display: flex">
        <div class="check-icon"></div>
        <input
          type="text"
          name="project-name"
          class="project-name"
          placeholder="프로젝트 명"
        />
      </div>

      <div class="thumbnail">
        <input
          type="file"
          class="upload-button-hidden"
          name="image"
          hidden
          multiple
          accept="image/*"
        />
        <input type="button" class="upload-button" value="이미지 업로드 하기" />
        <br />
        <div class="image-preview" style="display: flex"></div>
      </div>
      <div class="main-func" style="display: flex">
        <div class="check-icon"></div>
        <label for="main-func">주요기능</label>
        <input
          type="text"
          name="main-func"
          class="main-func"
          placeholder="여러분의 작품을 설명해주세요!"
        />
      </div>

      <div class="skills" style="display: flex">
        <div class="check-icon"></div>
        <label for="skills">사용한 기술 스택</label>
        <input
          type="text"
          name="skills"
          class="skills"
          placeholder="#을 기준으로 작성해주세요! (ex-#JAVA #REACT #EXPRESS)"
          style="width: 100%"
        />
      </div>

      <div class="team-discribe" style="display: flex">
        <div class="check-icon"></div>
        <label for="team-discribe">팀 소개</label>
        <a href="#" class="add-member">+</a>
        <div class="members">
      </div>

      <input type="submit" value="수정하기" />
    </form>
    </div>
`;

export const getMemberElement = (member) => /* html */ `
         <div class="member" style="display: flex">
            <input
              type="text"
              class="member-name"
              name="member-name"
              placeholder="이름"
              value = ${member.name}
            />
            <input
              type="text"
              class="member-job"
              name="member-job"
              placeholder="담당업무"
              value = ${member.job}
            />
            <input
              type="text"
              class="member-task"
              name="member-task"
              value = ${member.task}
              placeholder="업무내용"
            />
          </div>
`;
