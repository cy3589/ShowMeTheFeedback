const { Project, Content, User } = require("../../../models");

exports.getProjectList = async (req, res) => {
  const projects = await Project.find({}).populate("author");

  const result = projects.map((project) => {
    return {
      title: project.title,
      author: project.author.nickname,
      images: project.images,
      averageRating: project.averageRating,
      createdAt: project.createdAt,
      projectId: project.projectId,
    };
  });

  res.status(200).json(result);
};

exports.getProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findOne({ projectId })
    .populate("author")
    .populate("contents")
    .populate({
      path: "comments.comment",
    });

  const result = {
    projectId,
    author: project.author.nickname,
    title: project.title,
    members: project.contents.members,
    description: project.contents.description,
    stack: project.contents.stack,
    averageRating: project.averageRating,
    images: project.image,
    createdAt: project.createdAt,
    comments: project.comments,
  };

  res.status(200).json(result);
};

exports.createProject = async (req, res) => {
  const { email, title, description, stack, members } = req.body;

  const membersParsed = JSON.parse(members).member;

  // '[{"name":"432","job":"432","task":"432"}]'

  const imgs = req.files.map(
    (v) =>
      `https://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/back/uploads/${v.filename}`
  );
  const author = await User.findOne({ email }); // 사용자 확인

  const project = await Project.create({
    author,
    title,
    images: imgs,
  });

  const content = await Content.create({
    projectId: project.projectId,
    description,
    stack,
    members: membersParsed,
  });
  //elice.....:5000/back/uploads/xxxx.jpg
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
  const { title, description, stack, members, image, email } = req.body;

  const checkUser = await User.findOne({ email });
  if (!checkUser.projects.includes(projectId)) {
    res.status(404);
    throw new Error("수정 권한이 없습니다.");
  }

  const content = await Content.findOneAndUpdate(
    { projectId },
    {
      $set: {
        members,
        description,
        stack,
      },
    }
  );

  await Project.updateOne(
    { projectId },
    {
      $set: {
        title,
        // image: image ?? ' ',
        // TODO: 이미지 저장 및 수정 처리 서버 발급시 확인
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
  const { email } = req.body;
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
