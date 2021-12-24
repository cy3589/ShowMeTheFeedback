const { Project, Content, User } = require("../../../models");

exports.getProjectList = async (req, res) => {
  const projects = await Project.find({}).populate("author");

  const result = projects.map((project) => {
    return {
      projectName: project.projectName,
      author: project.author.nickname,
      thumbnails: project.thumbnails,
      averageRating: project.averageRating,
      createdAt: project.createdAt,
      projectId: project.projectId,
    };
  });

  res.status(200).json(result);
};

exports.getProject = async (req, res) => {
  const { email } = req;
  const { projectId } = req.params;

  const project = await Project.findOne({ projectId })
    .populate("author")
    .populate("contents")
    .populate({
      path: "comments.comment",
    });

  let isAuthorized = email == project.author.email ? true : false;

  const result = {
    projectId,
    author: project.author.nickname,
    teamName: project.contents.teamName,
    projectName: project.projectName,
    members: project.contents.members,
    mainFunc: project.contents.mainFunc,
    skills: project.contents.skills,
    averageRating: project.averageRating,
    thumbnails: project.thumbnails,
    createdAt: project.createdAt,
    isAuthorized,
  };

  res.status(200).json(result);
};

exports.createProject = async (req, res) => {
  const { email } = req;
  const { teamName, projectName, skills, mainFunc, member } = req.body;

  const membersParsed = JSON.parse(member);

  const thumbnails = req.files.map(
    (v) =>
      `http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/uploads/${v.filename}`
  );
  const author = await User.findOne({ email }); // 사용자 확인
  const project = await Project.create({
    author,
    projectName,
    thumbnails: thumbnails,
  });

  const content = await Content.create({
    teamName,
    projectId: project.projectId,
    mainFunc,
    skills,
    members: membersParsed,
  });

  await Project.findOneAndUpdate(
    { projectId: project.projectId },
    {
      $set: {
        contents: content,
      },
    }
  );

  await User.updateOne(
    { email },
    {
      $push: {
        projects: project.projectId,
      },
    }
  );

  // TODO: 이미지 저장 imgbb 사용 여부

  res.status(201).json({
    message: "프로젝트를 생성했습니다.",
    projectId: project.projectId,
  });
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { email } = req;

  const { teamName, projectName, skills, mainFunc, member, currentThumbnails } =
    req.body;

  const checkUser = await User.findOne({ email });
  if (!checkUser.projects.includes(projectId)) {
    res.status(404);
    throw new Error("수정 권한이 없습니다.");
  }

  const membersParsed = JSON.parse(member);

  const thumbnails = req.files.map(
    (v) =>
      `http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/uploads/${v.filename}`
  );

  const updatedThumbnails = thumbnails
    .concat(currentThumbnails)
    .filter((v) => v != "");

  const content = await Content.findOneAndUpdate(
    { projectId },
    {
      $set: {
        teamName,
        members: membersParsed,
        mainFunc,
        skills,
      },
    }
  );

  await Project.updateOne(
    { projectId },
    {
      $set: {
        projectName,
        thumbnails: updatedThumbnails,
        contents: content,
      },
    }
  );
  const project = await Project.findOne({ projectId }).populate("contents");
  const result = {
    author: project.author.nickname,
    title: project.title,
    members: project.contents.members,
    description: project.contents.description,
    stack: project.contents.stack,
    averageRating: project.averageRating,
    images: project.image,
    createdAt: project.createdAt,
  };
  res.status(201).json(result);
};

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  const { email } = req;
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    res.status(404);
    throw new Error("삭제 권한이 없습니다.");
  }

  if (!checkUser.projects.includes(projectId)) {
    res.status(404);
    throw new Error("삭제 권한이 없습니다.");
  }

  await Project.deleteOne({ projectId });

  checkUser.projects = checkUser.projects.filter((v) => v != projectId);
  checkUser.save();

  res.status(200).json({
    message: "프로젝트를 삭제했습니다.",
  });
};
