//@ts-nocheck

module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "blog_user",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        require: true,
      },
      loginType: {
        type: Sequelize.STRING,
        require: true,
      },
      email: {
        type: Sequelize.STRING,
        require: true,
      },
      pw: {
        type: Sequelize.STRING,
        require: true,
      },
      role: {
        //role:  user, admin
        type: Sequelize.STRING,
        require: true,
        default: "user",
      },
      active: {
        type: Sequelize.STRING,
        require: true,
        defaultValue: "N",
      },
      verified: {
        type: Sequelize.STRING,
        require: true,
        defaultValue: "N",
      },
      marketingConsent: {
        type: Sequelize.STRING,
        require: true,
        defaultValue: "N",
      },
      privacyConsent: {
        type: Sequelize.STRING,
        require: true,
        defaultValue: "N",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["loginType", "email"],
        },
      ],
    }
  );

  return user;
};
