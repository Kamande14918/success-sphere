import sequelize from '../config/db.js';

(async () => {
  try {
    // Drop unnecessary indexes on the `email` column
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_2`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_3`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_4`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_5`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_6`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_7`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_8`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_9`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_10`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_11`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_12`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_13`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_14`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_15`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_16`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_17`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_18`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_19`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_20`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_21`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_22`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_23`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_24`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_25`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_26`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_27`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_28`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_29`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_30`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_31`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_32`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_33`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_34`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_35`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_36`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_37`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_38`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_39`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_40`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_41`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_42`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_43`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_44`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_45`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_46`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_47`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_48`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_49`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_50`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_51`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_52`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_53`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_54`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_55`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_56`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_57`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_58`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_59`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `email_60`;');

    // Drop unnecessary indexes on the `username` column
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `username_2`;');
    await sequelize.query('ALTER TABLE `Users` DROP INDEX `username_3`;');

    console.log('Unnecessary indexes dropped successfully.');
  } catch (error) {
    console.error('Error dropping unnecessary indexes:', error);
  }
})();